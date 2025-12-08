'use client'

import { useState, useEffect, useMemo } from 'react'
import { 
  BookOpen, CheckCircle, XCircle, ChevronRight, ChevronLeft, 
  RotateCcw, Flag, FlagOff, Filter, Brain, Target, Clock,
  Zap, TrendingUp, AlertCircle, Star, Shuffle, List,
  BarChart3, Calendar, Flame, Award
} from 'lucide-react'
import { mcqQuestions, sectionInfo, MCQQuestion, getQuestionsBySection } from '@/lib/mcqData'
import { useSpacedRepetition, QuestionProgress } from '@/lib/useSpacedRepetition'

type Section = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
type QuizMode = 'all' | 'section' | 'due' | 'new' | 'marked' | 'struggling' | 'custom'
type FilterMode = 'all' | 'hideCorrect' | 'onlyIncorrect' | 'onlyNew' | 'onlyDue' | 'onlyMarked'

interface QuizSettings {
  mode: QuizMode
  section: Section | null
  filterMode: FilterMode
  questionCount: number
  shuffleQuestions: boolean
  shuffleOptions: boolean
  showExplanationImmediately: boolean
}

const DEFAULT_SETTINGS: QuizSettings = {
  mode: 'all',
  section: null,
  filterMode: 'all',
  questionCount: 20,
  shuffleQuestions: true,
  shuffleOptions: false,
  showExplanationImmediately: true
}

export default function EBIRMCQClient() {
  // Core state
  const [view, setView] = useState<'menu' | 'quiz' | 'stats' | 'settings'>('menu')
  const [settings, setSettings] = useState<QuizSettings>(DEFAULT_SETTINGS)
  const [questions, setQuestions] = useState<MCQQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0, startTime: Date.now() })
  
  // Spaced repetition
  const sr = useSpacedRepetition()
  
  // Get current question
  const currentQuestion = questions[currentIndex]
  
  // Calculate all question IDs for filtering
  const allQuestionIds = useMemo(() => mcqQuestions.map(q => q.id), [])
  
  // Get section counts with progress
  const sectionStats = useMemo(() => {
    const stats: Record<Section, { total: number; mastered: number; due: number; new: number }> = {
      A: { total: 0, mastered: 0, due: 0, new: 0 },
      B: { total: 0, mastered: 0, due: 0, new: 0 },
      C: { total: 0, mastered: 0, due: 0, new: 0 },
      D: { total: 0, mastered: 0, due: 0, new: 0 },
      E: { total: 0, mastered: 0, due: 0, new: 0 },
      F: { total: 0, mastered: 0, due: 0, new: 0 }
    }
    
    if (!sr.isLoaded) return stats
    
    mcqQuestions.forEach(q => {
      const section = q.section as Section
      stats[section].total++
      
      const progress = sr.getProgress(q.id)
      if (progress.isMastered) {
        stats[section].mastered++
      }
      if (!progress.timesAnswered) {
        stats[section].new++
      } else if (new Date(progress.nextReviewDate) <= new Date()) {
        stats[section].due++
      }
    })
    
    return stats
  }, [sr.isLoaded, sr.getProgress])

  // Start quiz with current settings
  const startQuiz = (overrideSettings?: Partial<QuizSettings>) => {
    const activeSettings = { ...settings, ...overrideSettings }
    let pool: MCQQuestion[] = []
    
    // Get base pool based on mode/section
    if (activeSettings.section) {
      pool = getQuestionsBySection(activeSettings.section)
    } else {
      pool = [...mcqQuestions]
    }
    
    // Apply filter mode
    const poolIds = pool.map(q => q.id)
    let filteredIds: string[] = poolIds
    
    switch (activeSettings.filterMode) {
      case 'hideCorrect':
        const correctIds = sr.getCorrectlyAnswered(poolIds)
        filteredIds = poolIds.filter(id => !correctIds.includes(id))
        break
      case 'onlyIncorrect':
        filteredIds = sr.getStrugglingQuestions(poolIds)
        break
      case 'onlyNew':
        filteredIds = sr.getNewQuestions(poolIds)
        break
      case 'onlyDue':
        filteredIds = sr.getDueQuestions(poolIds)
        break
      case 'onlyMarked':
        filteredIds = sr.getMarkedQuestions(poolIds)
        break
    }
    
    // Apply mode-specific filtering
    switch (activeSettings.mode) {
      case 'due':
        filteredIds = sr.getDueQuestions(filteredIds)
        break
      case 'new':
        filteredIds = sr.getNewQuestions(filteredIds)
        break
      case 'marked':
        filteredIds = sr.getMarkedQuestions(filteredIds)
        break
      case 'struggling':
        filteredIds = sr.getStrugglingQuestions(filteredIds)
        break
    }
    
    // Filter pool to matching IDs
    pool = pool.filter(q => filteredIds.includes(q.id))
    
    // Shuffle if enabled
    if (activeSettings.shuffleQuestions) {
      pool = [...pool].sort(() => Math.random() - 0.5)
    }
    
    // Limit to question count
    pool = pool.slice(0, activeSettings.questionCount)
    
    if (pool.length === 0) {
      alert('No questions match your current filters. Try adjusting your settings.')
      return
    }
    
    setQuestions(pool)
    setCurrentIndex(0)
    setSelectedAnswers([])
    setShowResult(false)
    setSessionStats({ correct: 0, incorrect: 0, startTime: Date.now() })
    setView('quiz')
  }

  // Handle answer selection
  const handleAnswerSelect = (index: number) => {
    if (showResult) return
    
    if (currentQuestion.correctAnswers.length === 1) {
      setSelectedAnswers([index])
    } else {
      setSelectedAnswers(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      )
    }
  }

  // Submit answer
  const submitAnswer = () => {
    if (selectedAnswers.length === 0) return
    
    const isCorrect = 
      selectedAnswers.length === currentQuestion.correctAnswers.length &&
      selectedAnswers.every(a => currentQuestion.correctAnswers.includes(a))
    
    // Record in spaced repetition system
    sr.recordAnswer(currentQuestion.id, isCorrect)
    
    // Update session stats
    setSessionStats(prev => ({
      ...prev,
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1)
    }))
    
    setShowResult(true)
  }

  // Navigate to next question
  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedAnswers([])
      setShowResult(false)
    } else {
      // Quiz complete - show results
      setView('stats')
    }
  }

  // Get progress indicator for a question
  const getProgressIndicator = (questionId: string) => {
    const progress = sr.getProgress(questionId)
    if (progress.isMastered) return { icon: Star, color: 'text-yellow-500', label: 'Mastered' }
    if (progress.isMarkedForReview) return { icon: Flag, color: 'text-orange-500', label: 'Marked' }
    if (progress.timesIncorrect >= 2 && progress.streak === 0) return { icon: AlertCircle, color: 'text-red-500', label: 'Struggling' }
    if (progress.timesAnswered > 0) return { icon: CheckCircle, color: 'text-green-500', label: 'Seen' }
    return { icon: Brain, color: 'text-gray-400', label: 'New' }
  }

  // Render menu view
  const renderMenu = () => {
    const globalStats = sr.getStats()
    const dueCount = sr.getDueQuestions(allQuestionIds).length
    const markedCount = sr.getMarkedQuestions(allQuestionIds).length
    const newCount = sr.getNewQuestions(allQuestionIds).length
    const strugglingCount = sr.getStrugglingQuestions(allQuestionIds).length
    
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">EBIR MCQ Practice</h1>
          <p className="text-gray-600 mt-1">Spaced repetition learning system</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <Target className="w-4 h-4" />
              <span className="text-sm font-medium">Accuracy</span>
            </div>
            <p className="text-2xl font-bold">{globalStats.accuracy}%</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-green-600 mb-1">
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium">Mastered</span>
            </div>
            <p className="text-2xl font-bold">{globalStats.mastered}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-orange-600 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Due</span>
            </div>
            <p className="text-2xl font-bold">{dueCount}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-purple-600 mb-1">
              <Flame className="w-4 h-4" />
              <span className="text-sm font-medium">Answered</span>
            </div>
            <p className="text-2xl font-bold">{globalStats.totalAnswered}</p>
          </div>
        </div>

        {/* Quick Start Options */}
        <div className="space-y-3">
          <h2 className="font-semibold text-gray-900">Quick Start</h2>
          
          {/* Due for Review */}
          {dueCount > 0 && (
            <button
              onClick={() => startQuiz({ mode: 'due', filterMode: 'all' })}
              className="w-full bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-xl p-4 text-left transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Review Due Questions</p>
                    <p className="text-sm text-gray-600">{dueCount} questions ready for review</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          )}
          
          {/* New Questions */}
          {newCount > 0 && (
            <button
              onClick={() => startQuiz({ mode: 'new', filterMode: 'all' })}
              className="w-full bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl p-4 text-left transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Learn New Questions</p>
                    <p className="text-sm text-gray-600">{newCount} questions to discover</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          )}
          
          {/* Marked for Review */}
          {markedCount > 0 && (
            <button
              onClick={() => startQuiz({ mode: 'marked', filterMode: 'all' })}
              className="w-full bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl p-4 text-left transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Flag className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Marked Questions</p>
                    <p className="text-sm text-gray-600">{markedCount} flagged for later</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          )}
          
          {/* Struggling Questions */}
          {strugglingCount > 0 && (
            <button
              onClick={() => startQuiz({ mode: 'struggling', filterMode: 'all' })}
              className="w-full bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl p-4 text-left transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Practice Weak Areas</p>
                    <p className="text-sm text-gray-600">{strugglingCount} questions need work</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          )}
          
          {/* Random Mix */}
          <button
            onClick={() => startQuiz({ mode: 'all', filterMode: 'all' })}
            className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-4 text-left transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-500 rounded-lg flex items-center justify-center">
                  <Shuffle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Random Practice</p>
                  <p className="text-sm text-gray-600">Mix of all {mcqQuestions.length} questions</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </button>
        </div>

        {/* Section Practice */}
        <div className="space-y-3">
          <h2 className="font-semibold text-gray-900">Practice by Section</h2>
          <div className="grid gap-2">
            {(Object.keys(sectionInfo) as Section[]).map(section => {
              const info = sectionInfo[section]
              const stats = sectionStats[section]
              const progressPercent = stats.total > 0 
                ? Math.round((stats.mastered / stats.total) * 100) 
                : 0
              
              return (
                <button
                  key={section}
                  onClick={() => {
                    setSettings(prev => ({ ...prev, section }))
                    startQuiz({ section, mode: 'section' })
                  }}
                  className="w-full bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-4 text-left transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-lg bg-${info.color}-100 text-${info.color}-600 flex items-center justify-center font-bold text-sm`}>
                        {section}
                      </span>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{info.title}</p>
                        <p className="text-xs text-gray-500">{stats.total} questions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{progressPercent}%</p>
                      {stats.due > 0 && (
                        <p className="text-xs text-orange-600">{stats.due} due</p>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`bg-${info.color}-500 h-1.5 rounded-full transition-all`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Settings & Stats Links */}
        <div className="flex gap-3">
          <button
            onClick={() => setView('settings')}
            className="flex-1 bg-white border border-gray-200 rounded-xl p-3 text-center hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-5 h-5 mx-auto mb-1 text-gray-600" />
            <span className="text-sm text-gray-700">Settings</span>
          </button>
          <button
            onClick={() => setView('stats')}
            className="flex-1 bg-white border border-gray-200 rounded-xl p-3 text-center hover:bg-gray-50 transition-colors"
          >
            <BarChart3 className="w-5 h-5 mx-auto mb-1 text-gray-600" />
            <span className="text-sm text-gray-700">Statistics</span>
          </button>
        </div>
      </div>
    )
  }

  // Render quiz view
  const renderQuiz = () => {
    if (!currentQuestion) return null
    
    const progress = sr.getProgress(currentQuestion.id)
    const progressIndicator = getProgressIndicator(currentQuestion.id)
    const isCorrect = showResult && 
      selectedAnswers.length === currentQuestion.correctAnswers.length &&
      selectedAnswers.every(a => currentQuestion.correctAnswers.includes(a))
    
    return (
      <div className="space-y-4">
        {/* Quiz Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setView('menu')}
            className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Exit</span>
          </button>
          
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-600">
              {currentIndex + 1} / {questions.length}
            </span>
            <span className="text-green-600">{sessionStats.correct} ✓</span>
            <span className="text-red-600">{sessionStats.incorrect} ✗</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Question Header */}
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs font-medium bg-${sectionInfo[currentQuestion.section].color}-100 text-${sectionInfo[currentQuestion.section].color}-700`}>
                Section {currentQuestion.section}
              </span>
              <span className="text-xs text-gray-500">{currentQuestion.subsection}</span>
            </div>
            <div className="flex items-center gap-2">
              {/* Mark for Review Button */}
              <button
                onClick={() => sr.toggleMarkForReview(currentQuestion.id)}
                className={`p-1.5 rounded-lg transition-colors ${
                  progress.isMarkedForReview 
                    ? 'bg-orange-100 text-orange-600' 
                    : 'hover:bg-gray-200 text-gray-400'
                }`}
                title={progress.isMarkedForReview ? 'Remove flag' : 'Flag for later review'}
              >
                {progress.isMarkedForReview ? <Flag className="w-4 h-4" /> : <FlagOff className="w-4 h-4" />}
              </button>
              {/* Progress Indicator */}
              <div className={`flex items-center gap-1 ${progressIndicator.color}`} title={progressIndicator.label}>
                <progressIndicator.icon className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Question Text */}
          <div className="p-4">
            <p className="text-gray-900 font-medium leading-relaxed">
              {currentQuestion.question}
            </p>
            {currentQuestion.correctAnswers.length > 1 && (
              <p className="text-sm text-purple-600 mt-2">
                Select all that apply ({currentQuestion.correctAnswers.length} correct answers)
              </p>
            )}
          </div>

          {/* Answer Options */}
          <div className="px-4 pb-4 space-y-2">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswers.includes(index)
              const isCorrectAnswer = currentQuestion.correctAnswers.includes(index)
              
              let optionClass = 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
              if (showResult) {
                if (isCorrectAnswer) {
                  optionClass = 'border-green-500 bg-green-50'
                } else if (isSelected && !isCorrectAnswer) {
                  optionClass = 'border-red-500 bg-red-50'
                }
              } else if (isSelected) {
                optionClass = 'border-purple-500 bg-purple-50'
              }
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-3 rounded-lg border-2 text-left transition-all ${optionClass} ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5 ${
                      showResult && isCorrectAnswer 
                        ? 'border-green-500 bg-green-500 text-white' 
                        : showResult && isSelected && !isCorrectAnswer
                          ? 'border-red-500 bg-red-500 text-white'
                          : isSelected 
                            ? 'border-purple-500 bg-purple-500 text-white' 
                            : 'border-gray-300'
                    }`}>
                      {showResult && isCorrectAnswer ? '✓' : showResult && isSelected && !isCorrectAnswer ? '✗' : String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-gray-700">{option}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Explanation (shown after answering) */}
          {showResult && (
            <div className={`mx-4 mb-4 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                <span className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
              <p className="text-gray-700 text-sm">{currentQuestion.explanation}</p>
              
              {/* Show spaced repetition info */}
              <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
                <p>Next review: {new Date(sr.getProgress(currentQuestion.id).nextReviewDate).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {!showResult ? (
            <button
              onClick={submitAnswer}
              disabled={selectedAnswers.length === 0}
              className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              {currentIndex < questions.length - 1 ? (
                <>Next Question <ChevronRight className="w-5 h-5" /></>
              ) : (
                <>View Results <BarChart3 className="w-5 h-5" /></>
              )}
            </button>
          )}
        </div>
      </div>
    )
  }

  // Render stats view
  const renderStats = () => {
    const globalStats = sr.getStats()
    const sessionDuration = Math.round((Date.now() - sessionStats.startTime) / 1000 / 60)
    const sessionAccuracy = sessionStats.correct + sessionStats.incorrect > 0
      ? Math.round((sessionStats.correct / (sessionStats.correct + sessionStats.incorrect)) * 100)
      : 0
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Statistics</h2>
          <button
            onClick={() => setView('menu')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Session Stats (if just finished quiz) */}
        {sessionStats.correct + sessionStats.incorrect > 0 && (
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-4">Session Complete!</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold">{sessionStats.correct}</p>
                <p className="text-purple-200 text-sm">Correct</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{sessionAccuracy}%</p>
                <p className="text-purple-200 text-sm">Accuracy</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{sessionDuration}</p>
                <p className="text-purple-200 text-sm">Minutes</p>
              </div>
            </div>
          </div>
        )}

        {/* Overall Stats */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Overall Progress</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{globalStats.totalAnswered}</p>
              <p className="text-sm text-gray-600">Total Answered</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{globalStats.accuracy}%</p>
              <p className="text-sm text-gray-600">Accuracy</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{globalStats.mastered}</p>
              <p className="text-sm text-gray-600">Mastered</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">{globalStats.struggling}</p>
              <p className="text-sm text-gray-600">Need Practice</p>
            </div>
          </div>
        </div>

        {/* Section Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Progress by Section</h3>
          <div className="space-y-3">
            {(Object.keys(sectionInfo) as Section[]).map(section => {
              const stats = sectionStats[section]
              const progressPercent = stats.total > 0 
                ? Math.round((stats.mastered / stats.total) * 100) 
                : 0
              
              return (
                <div key={section} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Section {section}</span>
                    <span className="text-gray-500">{stats.mastered}/{stats.total} mastered</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-${sectionInfo[section].color}-500 h-2 rounded-full`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => startQuiz()}
            className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors"
          >
            Practice Again
          </button>
          <button
            onClick={() => setView('menu')}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            Back to Menu
          </button>
        </div>

        {/* Reset Button */}
        <button
          onClick={sr.resetAllProgress}
          className="w-full text-red-600 text-sm hover:text-red-700"
        >
          Reset All Progress
        </button>
      </div>
    )
  }

  // Render settings view
  const renderSettings = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Quiz Settings</h2>
          <button
            onClick={() => setView('menu')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
          {/* Question Count */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Questions per Quiz
            </label>
            <select
              value={settings.questionCount}
              onChange={(e) => setSettings(prev => ({ ...prev, questionCount: parseInt(e.target.value) }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value={10}>10 questions</option>
              <option value={20}>20 questions</option>
              <option value={30}>30 questions</option>
              <option value={50}>50 questions</option>
              <option value={100}>100 questions</option>
            </select>
          </div>

          {/* Filter Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Filter
            </label>
            <select
              value={settings.filterMode}
              onChange={(e) => setSettings(prev => ({ ...prev, filterMode: e.target.value as FilterMode }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="all">Show all questions</option>
              <option value="hideCorrect">Hide recently correct</option>
              <option value="onlyIncorrect">Only struggling questions</option>
              <option value="onlyNew">Only new questions</option>
              <option value="onlyDue">Only due for review</option>
              <option value="onlyMarked">Only flagged questions</option>
            </select>
          </div>

          {/* Shuffle Questions */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Shuffle Questions</span>
            <button
              onClick={() => setSettings(prev => ({ ...prev, shuffleQuestions: !prev.shuffleQuestions }))}
              className={`w-12 h-6 rounded-full transition-colors ${settings.shuffleQuestions ? 'bg-purple-600' : 'bg-gray-300'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${settings.shuffleQuestions ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>

          {/* Shuffle Options */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Shuffle Answer Options</span>
            <button
              onClick={() => setSettings(prev => ({ ...prev, shuffleOptions: !prev.shuffleOptions }))}
              className={`w-12 h-6 rounded-full transition-colors ${settings.shuffleOptions ? 'bg-purple-600' : 'bg-gray-300'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${settings.shuffleOptions ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            setView('menu')
          }}
          className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors"
        >
          Save Settings
        </button>
      </div>
    )
  }

  // Main render
  if (!sr.isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {view === 'menu' && renderMenu()}
      {view === 'quiz' && renderQuiz()}
      {view === 'stats' && renderStats()}
      {view === 'settings' && renderSettings()}
    </div>
  )
}
