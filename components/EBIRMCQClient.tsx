'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { 
  GraduationCap, Brain, CheckCircle, XCircle, ChevronRight, 
  RotateCcw, Trophy, Target, Clock, BookOpen, Shuffle,
  ChevronDown, BarChart3, Lightbulb, ArrowRight, ArrowLeft,
  Play, Pause, Settings, Check, X, AlertCircle, Sparkles
} from 'lucide-react'
import { 
  mcqQuestions, 
  MCQQuestion, 
  sectionInfo, 
  getQuestionsBySection, 
  getRandomQuestions,
  getSectionStats 
} from '@/lib/mcqData'

type QuizMode = 'menu' | 'quiz' | 'review' | 'results'
type SectionFilter = 'all' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

interface QuizState {
  questions: MCQQuestion[]
  currentIndex: number
  answers: Record<string, number[]>
  showExplanation: boolean
  isSubmitted: boolean
  startTime: number
  endTime?: number
}

interface QuizStats {
  totalAttempted: number
  totalCorrect: number
  sectionStats: Record<string, { attempted: number; correct: number }>
}

const sectionColors: Record<string, string> = {
  A: 'bg-purple-100 text-purple-800 border-purple-300',
  B: 'bg-blue-100 text-blue-800 border-blue-300',
  C: 'bg-green-100 text-green-800 border-green-300',
  D: 'bg-orange-100 text-orange-800 border-orange-300',
  E: 'bg-pink-100 text-pink-800 border-pink-300',
  F: 'bg-red-100 text-red-800 border-red-300',
}

const sectionBgColors: Record<string, string> = {
  A: 'border-purple-500 bg-purple-50',
  B: 'border-blue-500 bg-blue-50',
  C: 'border-green-500 bg-green-50',
  D: 'border-orange-500 bg-orange-50',
  E: 'border-pink-500 bg-pink-50',
  F: 'border-red-500 bg-red-50',
}

export default function EBIRMCQClient() {
  const [mode, setMode] = useState<QuizMode>('menu')
  const [selectedSection, setSelectedSection] = useState<SectionFilter>('all')
  const [questionCount, setQuestionCount] = useState(10)
  const [quizState, setQuizState] = useState<QuizState | null>(null)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [stats, setStats] = useState<QuizStats>({
    totalAttempted: 0,
    totalCorrect: 0,
    sectionStats: {}
  })

  useEffect(() => {
    const savedStats = localStorage.getItem('ebir-mcq-stats')
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats))
      } catch (e) {
        console.error('Failed to load stats:', e)
      }
    }
  }, [])

  const saveStats = useCallback((newStats: QuizStats) => {
    localStorage.setItem('ebir-mcq-stats', JSON.stringify(newStats))
    setStats(newStats)
  }, [])

  const sectionStatsData = useMemo(() => getSectionStats(), [])
  const totalQuestions = mcqQuestions.length
  const availableQuestions = selectedSection === 'all' 
    ? totalQuestions 
    : sectionStatsData[selectedSection] || 0

  const startQuiz = useCallback(() => {
    const questions = selectedSection === 'all'
      ? getRandomQuestions(questionCount)
      : getRandomQuestions(questionCount, selectedSection)
    
    setQuizState({
      questions,
      currentIndex: 0,
      answers: {},
      showExplanation: false,
      isSubmitted: false,
      startTime: Date.now()
    })
    setSelectedAnswers([])
    setMode('quiz')
  }, [selectedSection, questionCount])

  const currentQuestion = quizState?.questions[quizState.currentIndex]
  const isMultipleChoice = currentQuestion && currentQuestion.correctAnswers.length > 1

  const handleAnswerSelect = useCallback((index: number) => {
    if (quizState?.isSubmitted) return
    
    if (isMultipleChoice) {
      setSelectedAnswers(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      )
    } else {
      setSelectedAnswers([index])
    }
  }, [quizState?.isSubmitted, isMultipleChoice])

  const submitAnswer = useCallback(() => {
    if (!quizState || !currentQuestion) return
    
    setQuizState(prev => {
      if (!prev) return prev
      return {
        ...prev,
        answers: { ...prev.answers, [currentQuestion.id]: selectedAnswers },
        isSubmitted: true,
        showExplanation: true
      }
    })
  }, [quizState, currentQuestion, selectedAnswers])

  const arraysEqual = (a: number[], b: number[]) => {
    if (a.length !== b.length) return false
    const sortedA = [...a].sort()
    const sortedB = [...b].sort()
    return sortedA.every((val, idx) => val === sortedB[idx])
  }

  const nextQuestion = useCallback(() => {
    if (!quizState || !currentQuestion) return
    
    if (quizState.currentIndex < quizState.questions.length - 1) {
      setQuizState(prev => {
        if (!prev) return prev
        return {
          ...prev,
          currentIndex: prev.currentIndex + 1,
          isSubmitted: false,
          showExplanation: false
        }
      })
      setSelectedAnswers([])
    } else {
      const endTime = Date.now()
      
      let correct = 0
      const newSectionStats = { ...stats.sectionStats }
      
      quizState.questions.forEach(q => {
        const userAnswer = q.id === currentQuestion.id ? selectedAnswers : (quizState.answers[q.id] || [])
        const isCorrect = arraysEqual(userAnswer, q.correctAnswers)
        
        if (isCorrect) correct++
        
        if (!newSectionStats[q.section]) {
          newSectionStats[q.section] = { attempted: 0, correct: 0 }
        }
        newSectionStats[q.section].attempted++
        if (isCorrect) newSectionStats[q.section].correct++
      })
      
      saveStats({
        totalAttempted: stats.totalAttempted + quizState.questions.length,
        totalCorrect: stats.totalCorrect + correct,
        sectionStats: newSectionStats
      })
      
      setQuizState(prev => prev ? { 
        ...prev, 
        endTime,
        answers: { ...prev.answers, [currentQuestion.id]: selectedAnswers }
      } : prev)
      setMode('results')
    }
  }, [quizState, currentQuestion, selectedAnswers, stats, saveStats])

  const goBack = useCallback(() => {
    if (!quizState || quizState.currentIndex === 0) return
    
    const prevIndex = quizState.currentIndex - 1
    const prevQuestion = quizState.questions[prevIndex]
    const prevAnswers = quizState.answers[prevQuestion.id] || []
    
    setQuizState(prev => {
      if (!prev) return prev
      return {
        ...prev,
        currentIndex: prevIndex,
        isSubmitted: true,
        showExplanation: true
      }
    })
    setSelectedAnswers(prevAnswers)
  }, [quizState])

  const resetQuiz = useCallback(() => {
    setQuizState(null)
    setSelectedAnswers([])
    setMode('menu')
  }, [])

  const resetStats = useCallback(() => {
    if (confirm('Are you sure you want to reset all your statistics?')) {
      saveStats({
        totalAttempted: 0,
        totalCorrect: 0,
        sectionStats: {}
      })
    }
  }, [saveStats])

  const getQuizScore = () => {
    if (!quizState) return { correct: 0, total: 0, percentage: 0 }
    
    let correct = 0
    quizState.questions.forEach(q => {
      const userAnswer = quizState.answers[q.id] || []
      if (arraysEqual(userAnswer, q.correctAnswers)) {
        correct++
      }
    })
    
    return {
      correct,
      total: quizState.questions.length,
      percentage: Math.round((correct / quizState.questions.length) * 100)
    }
  }

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // MENU SCREEN
  if (mode === 'menu') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-lg">
              <Brain className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold">EBIR MCQ Practice</h1>
          </div>
          <p className="text-purple-100">
            Test your knowledge across all EBIR syllabus sections with exam-style questions
          </p>
        </div>

        {stats.totalAttempted > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                Your Progress
              </h2>
              <button
                onClick={resetStats}
                className="text-xs text-gray-500 hover:text-red-600 transition-colors"
              >
                Reset Stats
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stats.totalAttempted}</div>
                <div className="text-xs text-gray-500">Questions Attempted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.totalCorrect}</div>
                <div className="text-xs text-gray-500">Correct Answers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {stats.totalAttempted > 0 
                    ? Math.round((stats.totalCorrect / stats.totalAttempted) * 100) 
                    : 0}%
                </div>
                <div className="text-xs text-gray-500">Accuracy</div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-600" />
            Select Practice Mode
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => setSelectedSection('all')}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                selectedSection === 'all'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  selectedSection === 'all' ? 'bg-purple-100' : 'bg-gray-100'
                }`}>
                  <Shuffle className={`w-5 h-5 ${
                    selectedSection === 'all' ? 'text-purple-600' : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Random Mix</div>
                  <div className="text-sm text-gray-500">{totalQuestions} questions from all sections</div>
                </div>
              </div>
            </button>

            {(Object.keys(sectionInfo) as Array<keyof typeof sectionInfo>).map(section => {
              const info = sectionInfo[section]
              const count = sectionStatsData[section] || 0
              const sectionStat = stats.sectionStats[section]
              const accuracy = sectionStat && sectionStat.attempted > 0
                ? Math.round((sectionStat.correct / sectionStat.attempted) * 100)
                : null
              
              return (
                <button
                  key={section}
                  onClick={() => setSelectedSection(section)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedSection === section
                      ? sectionBgColors[section]
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg ${sectionColors[section]}`}>
                        {section}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm leading-tight">{info.title}</div>
                        <div className="text-xs text-gray-500">{count} questions</div>
                      </div>
                    </div>
                    {accuracy !== null && (
                      <div className={`text-sm font-medium ${
                        accuracy >= 70 ? 'text-green-600' : accuracy >= 50 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {accuracy}%
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            Number of Questions
          </h2>
          <div className="flex flex-wrap gap-2">
            {[5, 10, 15, 20, 25, 30].map(count => (
              <button
                key={count}
                onClick={() => setQuestionCount(Math.min(count, availableQuestions))}
                disabled={count > availableQuestions}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  questionCount === count
                    ? 'bg-purple-600 text-white'
                    : count > availableQuestions
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
          {availableQuestions < 30 && (
            <p className="text-xs text-gray-500 mt-2">
              {availableQuestions} questions available in selected section
            </p>
          )}
        </div>

        <button
          onClick={startQuiz}
          disabled={availableQuestions === 0}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-5 h-5" />
          Start Quiz ({questionCount} questions)
        </button>
      </div>
    )
  }

  // QUIZ SCREEN
  if (mode === 'quiz' && quizState && currentQuestion) {
    const progress = ((quizState.currentIndex + 1) / quizState.questions.length) * 100
    const isCorrect = quizState.isSubmitted && arraysEqual(selectedAnswers, currentQuestion.correctAnswers)
    
    return (
      <div className="max-w-3xl mx-auto">
        {/* Progress Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${sectionColors[currentQuestion.section]}`}>
                Section {currentQuestion.section}
              </span>
              <span className="text-sm text-gray-500">{currentQuestion.subsection}</span>
            </div>
            <span className="text-sm font-medium text-gray-600">
              {quizState.currentIndex + 1} / {quizState.questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4">
          <div className="p-6">
            <div className="flex items-start gap-3 mb-6">
              {isMultipleChoice && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                  Select {currentQuestion.correctAnswers.length} answers
                </span>
              )}
            </div>
            
            <h2 className="text-lg font-medium text-gray-900 mb-6 leading-relaxed">
              {currentQuestion.question}
            </h2>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswers.includes(index)
                const isCorrectAnswer = currentQuestion.correctAnswers.includes(index)
                const showResult = quizState.isSubmitted
                
                let buttonClass = 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                let iconClass = 'border-gray-300'
                
                if (showResult) {
                  if (isCorrectAnswer) {
                    buttonClass = 'border-green-500 bg-green-50'
                    iconClass = 'border-green-500 bg-green-500 text-white'
                  } else if (isSelected && !isCorrectAnswer) {
                    buttonClass = 'border-red-500 bg-red-50'
                    iconClass = 'border-red-500 bg-red-500 text-white'
                  }
                } else if (isSelected) {
                  buttonClass = 'border-purple-500 bg-purple-50'
                  iconClass = 'border-purple-500 bg-purple-500 text-white'
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={quizState.isSubmitted}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3 ${buttonClass} ${
                      quizState.isSubmitted ? 'cursor-default' : 'cursor-pointer'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${iconClass}`}>
                      {showResult && isCorrectAnswer && <Check className="w-4 h-4" />}
                      {showResult && isSelected && !isCorrectAnswer && <X className="w-4 h-4" />}
                      {!showResult && isSelected && <Check className="w-4 h-4" />}
                    </div>
                    <span className="text-gray-800">{option}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Explanation */}
          {quizState.showExplanation && (
            <div className={`p-6 border-t ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-amber-100'}`}>
                  <Lightbulb className={`w-5 h-5 ${isCorrect ? 'text-green-600' : 'text-amber-600'}`} />
                </div>
                <div>
                  <h3 className={`font-semibold mb-1 ${isCorrect ? 'text-green-800' : 'text-amber-800'}`}>
                    {isCorrect ? 'Correct!' : 'Explanation'}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={goBack}
            disabled={quizState.currentIndex === 0}
            className="px-4 py-3 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          <button
            onClick={resetQuiz}
            className="px-4 py-3 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Exit
          </button>

          {!quizState.isSubmitted ? (
            <button
              onClick={submitAnswer}
              disabled={selectedAnswers.length === 0}
              className="px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Check Answer
              <Check className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              {quizState.currentIndex === quizState.questions.length - 1 ? 'Finish' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    )
  }

  // RESULTS SCREEN
  if (mode === 'results' && quizState) {
    const score = getQuizScore()
    const timeTaken = quizState.endTime ? quizState.endTime - quizState.startTime : 0
    
    return (
      <div className="max-w-3xl mx-auto">
        {/* Score Card */}
        <div className={`rounded-2xl p-8 mb-6 text-center ${
          score.percentage >= 70 
            ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
            : score.percentage >= 50 
            ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
            : 'bg-gradient-to-r from-red-500 to-pink-600'
        } text-white`}>
          <div className="mb-4">
            {score.percentage >= 70 ? (
              <Trophy className="w-16 h-16 mx-auto" />
            ) : score.percentage >= 50 ? (
              <Target className="w-16 h-16 mx-auto" />
            ) : (
              <RotateCcw className="w-16 h-16 mx-auto" />
            )}
          </div>
          <h1 className="text-4xl font-bold mb-2">{score.percentage}%</h1>
          <p className="text-xl opacity-90">
            {score.correct} out of {score.total} correct
          </p>
          {timeTaken > 0 && (
            <p className="text-sm opacity-75 mt-2 flex items-center justify-center gap-1">
              <Clock className="w-4 h-4" />
              Completed in {formatTime(timeTaken)}
            </p>
          )}
        </div>

        {/* Performance Message */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-2">
            {score.percentage >= 80 ? 'Excellent work!' :
             score.percentage >= 70 ? 'Good job!' :
             score.percentage >= 50 ? 'Keep practicing!' :
             'Review the material and try again'}
          </h2>
          <p className="text-gray-600 text-sm">
            {score.percentage >= 70 
              ? 'You\'re showing strong knowledge of interventional radiology concepts.'
              : 'Focus on the explanations for incorrect answers to improve your understanding.'}
          </p>
        </div>

        {/* Question Review */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Question Review</h2>
          </div>
          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
            {quizState.questions.map((q, idx) => {
              const userAnswer = quizState.answers[q.id] || []
              const isCorrect = arraysEqual(userAnswer, q.correctAnswers)
              
              return (
                <div key={q.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${
                      isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${sectionColors[q.section]}`}>
                          {q.section}
                        </span>
                        <span className="text-xs text-gray-500">Q{idx + 1}</span>
                      </div>
                      <p className="text-sm text-gray-800 line-clamp-2">{q.question}</p>
                      {!isCorrect && (
                        <p className="text-xs text-gray-500 mt-1">
                          Correct: {q.correctAnswers.map(i => q.options[i]).join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={startQuiz}
            className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
          <button
            onClick={resetQuiz}
            className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Menu
          </button>
        </div>
      </div>
    )
  }

  return null
}
