'use client'

import { useState, useEffect, useMemo } from 'react'
import { 
  BookOpen, CheckCircle, XCircle, ChevronRight, ChevronLeft, 
  RotateCcw, Flag, FlagOff, Filter, Brain, Target, Clock,
  Zap, TrendingUp, AlertCircle, Star, Shuffle, List,
  BarChart3, Calendar, Flame, Award, Image, MessageSquare, X,
  Timer, Keyboard, CircleDot, HelpCircle, ThumbsUp, Settings, Sparkles
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
  showConfidenceRating: boolean
  timedMode: boolean
  secondsPerQuestion: number
}

type ConfidenceLevel = 'guessing' | 'unsure' | 'confident'

const DEFAULT_SETTINGS: QuizSettings = {
  mode: 'all',
  section: null,
  filterMode: 'all',
  questionCount: 20,
  shuffleQuestions: true,
  shuffleOptions: false,
  showExplanationImmediately: true,
  showConfidenceRating: true,
  timedMode: false,
  secondsPerQuestion: 90
}

const SETTINGS_STORAGE_KEY = 'ebir-mcq-quiz-settings'
const FIRST_VISIT_KEY = 'ebir-mcq-first-visit-completed'

export default function EBIRMCQClient() {
  // Core state
  const [view, setView] = useState<'menu' | 'quiz' | 'stats' | 'settings'>('menu')
  const [settings, setSettings] = useState<QuizSettings>(DEFAULT_SETTINGS)
  const [settingsLoaded, setSettingsLoaded] = useState(false)
  const [questions, setQuestions] = useState<MCQQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0, startTime: Date.now() })
  
  // First visit / setup modal state
  const [showFirstVisitModal, setShowFirstVisitModal] = useState(false)
  
  // Pre-quiz question count selector modal
  const [showQuizStartModal, setShowQuizStartModal] = useState(false)
  const [pendingQuizSettings, setPendingQuizSettings] = useState<Partial<QuizSettings> | null>(null)
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(20)
  
  // Flag note modal state
  const [showFlagNoteModal, setShowFlagNoteModal] = useState(false)
  const [flagNoteText, setFlagNoteText] = useState('')
  const [flagNoteImage, setFlagNoteImage] = useState<string | null>(null)
  
  // Confidence rating state
  const [confidence, setConfidence] = useState<ConfidenceLevel | null>(null)
  const [showConfidencePrompt, setShowConfidencePrompt] = useState(false)
  
  // Timer state
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  
  // Error note state
  const [showErrorNoteInput, setShowErrorNoteInput] = useState(false)
  const [errorNoteText, setErrorNoteText] = useState('')
  
  // Track missed questions for session summary
  const [missedQuestions, setMissedQuestions] = useState<string[]>([])
  
  // Spaced repetition
  const sr = useSpacedRepetition()
  
  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY)
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings)
        // Merge with defaults to handle any new settings fields
        setSettings(prev => ({ ...DEFAULT_SETTINGS, ...parsed }))
      }
      
      // Check if first visit
      const firstVisitCompleted = localStorage.getItem(FIRST_VISIT_KEY)
      if (!firstVisitCompleted) {
        setShowFirstVisitModal(true)
      }
    } catch (e) {
      console.error('Failed to load quiz settings:', e)
    }
    setSettingsLoaded(true)
  }, [])
  
  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (settingsLoaded) {
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
      } catch (e) {
        console.error('Failed to save quiz settings:', e)
      }
    }
  }, [settings, settingsLoaded])
  
  // Get current question
  const currentQuestion = questions[currentIndex]
  
  // Calculate all question IDs for filtering
  const allQuestionIds = useMemo(() => mcqQuestions.map(q => q.id), [])
  
  // Get section counts with progress
  // Using getMasteredQuestions as dependency to ensure recalculation when mastery changes
  const masteredIds = useMemo(() => sr.getMasteredQuestions(allQuestionIds), [sr.getMasteredQuestions, allQuestionIds])
  const dueIds = useMemo(() => sr.getDueQuestions(allQuestionIds), [sr.getDueQuestions, allQuestionIds])
  const newIds = useMemo(() => sr.getNewQuestions(allQuestionIds), [sr.getNewQuestions, allQuestionIds])
  
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
      
      if (masteredIds.includes(q.id)) {
        stats[section].mastered++
      }
      if (newIds.includes(q.id)) {
        stats[section].new++
      } else if (dueIds.includes(q.id)) {
        stats[section].due++
      }
    })
    
    return stats
  }, [sr.isLoaded, masteredIds, dueIds, newIds])

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (timerActive && timeRemaining > 0 && view === 'quiz' && !showResult) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Time's up - auto submit or skip
            setTimerActive(false)
            if (selectedAnswers.length > 0) {
              submitAnswer()
            } else {
              // Skip question if no answer selected
              nextQuestion()
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timerActive, timeRemaining, view, showResult, selectedAnswers])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only active during quiz
      if (view !== 'quiz' || !currentQuestion) return
      
      // Don't trigger if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      
      // Number keys 1-5 for answer selection (before submitting)
      if (!showResult && !showConfidencePrompt) {
        const num = parseInt(e.key)
        if (num >= 1 && num <= currentQuestion.options.length) {
          handleAnswerSelect(num - 1)
          return
        }
      }
      
      // Enter to submit or continue
      if (e.key === 'Enter') {
        e.preventDefault()
        if (showConfidencePrompt) {
          // Default to 'unsure' if enter pressed during confidence prompt
          handleConfidenceSelect('unsure')
        } else if (!showResult && selectedAnswers.length > 0) {
          submitAnswer()
        } else if (showResult) {
          nextQuestion()
        }
        return
      }
      
      // Arrow keys for navigation (when result is shown or to navigate between questions)
      if (e.key === 'ArrowLeft' && showResult) {
        prevQuestion()
        return
      }
      if (e.key === 'ArrowRight' && showResult) {
        nextQuestion()
        return
      }
      
      // F key to flag
      if (e.key === 'f' || e.key === 'F') {
        handleFlagClick()
        return
      }
      
      // Confidence shortcuts during confidence prompt
      if (showConfidencePrompt) {
        if (e.key === 'g' || e.key === 'G' || e.key === '1') {
          handleConfidenceSelect('guessing')
        } else if (e.key === 'u' || e.key === 'U' || e.key === '2') {
          handleConfidenceSelect('unsure')
        } else if (e.key === 'c' || e.key === 'C' || e.key === '3') {
          handleConfidenceSelect('confident')
        }
        return
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [view, currentQuestion, showResult, selectedAnswers, showConfidencePrompt])

  // Initiate quiz - shows question count selector modal
  const initiateQuiz = (overrideSettings?: Partial<QuizSettings>) => {
    setPendingQuizSettings(overrideSettings || null)
    // Calculate available questions for this quiz type
    let pool: MCQQuestion[] = []
    const activeSettings = { ...settings, ...overrideSettings }
    
    if (activeSettings.section) {
      pool = getQuestionsBySection(activeSettings.section)
    } else {
      pool = [...mcqQuestions]
    }
    
    // Apply filters to get available count
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
    
    // Set default to match settings or cap at available
    const available = filteredIds.length
    setSelectedQuestionCount(Math.min(settings.questionCount, available) || Math.min(20, available))
    setShowQuizStartModal(true)
  }

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
    setMissedQuestions([])
    setConfidence(null)
    setShowConfidencePrompt(false)
    setShowErrorNoteInput(false)
    setErrorNoteText('')
    
    // Initialize timer if timed mode
    if (activeSettings.timedMode) {
      setTimeRemaining(activeSettings.secondsPerQuestion)
      setTimerActive(true)
    } else {
      setTimeRemaining(0)
      setTimerActive(false)
    }
    
    setView('quiz')
  }

  // Reset timer for new question
  const resetTimerForNewQuestion = () => {
    if (settings.timedMode) {
      setTimeRemaining(settings.secondsPerQuestion)
      setTimerActive(true)
    }
  }

  // Handle answer selection
  const handleAnswerSelect = (index: number) => {
    if (showResult || showConfidencePrompt) return
    
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

  // Handle confidence selection and submit answer
  const handleConfidenceSelect = (level: ConfidenceLevel) => {
    setConfidence(level)
    setShowConfidencePrompt(false)
    
    const isCorrect = 
      selectedAnswers.length === currentQuestion.correctAnswers.length &&
      selectedAnswers.every(a => currentQuestion.correctAnswers.includes(a))
    
    // Record in spaced repetition system with confidence
    sr.recordAnswer(currentQuestion.id, isCorrect, level)
    
    // Track missed questions for session summary
    if (!isCorrect) {
      setMissedQuestions(prev => [...prev, currentQuestion.id])
    }
    
    // Update session stats
    setSessionStats(prev => ({
      ...prev,
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1)
    }))
    
    // Stop timer
    setTimerActive(false)
    
    setShowResult(true)
  }

  // Submit answer (shows confidence prompt first if enabled)
  const submitAnswer = () => {
    if (selectedAnswers.length === 0) return
    
    if (settings.showConfidenceRating) {
      setShowConfidencePrompt(true)
    } else {
      // Skip confidence prompt - submit directly with null confidence
      const isCorrect = 
        selectedAnswers.length === currentQuestion.correctAnswers.length &&
        selectedAnswers.every(a => currentQuestion.correctAnswers.includes(a))
      
      // Record in spaced repetition system without confidence
      sr.recordAnswer(currentQuestion.id, isCorrect, undefined)
      
      // Track missed questions for session summary
      if (!isCorrect) {
        setMissedQuestions(prev => [...prev, currentQuestion.id])
      }
      
      // Update session stats
      setSessionStats(prev => ({
        ...prev,
        correct: prev.correct + (isCorrect ? 1 : 0),
        incorrect: prev.incorrect + (isCorrect ? 0 : 1)
      }))
      
      // Stop timer
      setTimerActive(false)
      
      setShowResult(true)
    }
  }

  // Save error note
  const saveErrorNote = () => {
    if (errorNoteText.trim()) {
      sr.setErrorNote(currentQuestion.id, errorNoteText.trim())
    }
    setShowErrorNoteInput(false)
    setErrorNoteText('')
  }

  // Navigate to next question
  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedAnswers([])
      setShowResult(false)
      setConfidence(null)
      setShowConfidencePrompt(false)
      setShowErrorNoteInput(false)
      setErrorNoteText('')
      resetTimerForNewQuestion()
    } else {
      // Quiz complete - show results
      setTimerActive(false)
      setView('stats')
    }
  }

  // Navigate to previous question
  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
      setSelectedAnswers([])
      setShowResult(false)
      setConfidence(null)
      setShowConfidencePrompt(false)
      setShowErrorNoteInput(false)
      setErrorNoteText('')
      resetTimerForNewQuestion()
    }
  }

  // Go to specific question
  const goToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentIndex(index)
      setSelectedAnswers([])
      setShowResult(false)
      setConfidence(null)
      setShowConfidencePrompt(false)
      setShowErrorNoteInput(false)
      setErrorNoteText('')
      resetTimerForNewQuestion()
    }
  }

  // Handle flagging with note modal
  const handleFlagClick = () => {
    const progress = sr.getProgress(currentQuestion.id)
    if (progress.isMarkedForReview) {
      // Unflagging - just toggle
      sr.toggleMarkForReview(currentQuestion.id)
    } else {
      // Flagging - show modal for note
      setFlagNoteText('')
      setFlagNoteImage(null)
      setShowFlagNoteModal(true)
    }
  }

  // Save flag with note
  const saveFlagNote = () => {
    sr.toggleMarkForReview(currentQuestion.id)
    if (flagNoteText || flagNoteImage) {
      sr.setReviewNote(currentQuestion.id, flagNoteText || null, flagNoteImage)
    }
    setShowFlagNoteModal(false)
    setFlagNoteText('')
    setFlagNoteImage(null)
  }

  // Handle image upload for flag note
  const handleFlagImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image must be less than 5MB')
        return
      }
      const reader = new FileReader()
      reader.onload = (event) => {
        setFlagNoteImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
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

        {/* Daily Goal & Streak Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{globalStats.currentStreak} day{globalStats.currentStreak !== 1 ? 's' : ''}</p>
                <p className="text-orange-100 text-sm">Current streak {globalStats.longestStreak > 0 && `• Best: ${globalStats.longestStreak}`}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-orange-100">Today's progress</p>
              <p className="text-lg font-semibold">{globalStats.todayAnswered}/{globalStats.dailyGoal}</p>
            </div>
          </div>
          {/* Daily goal progress bar */}
          <div className="mt-3">
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all"
                style={{ width: `${globalStats.dailyGoalProgress}%` }}
              />
            </div>
            {globalStats.dailyGoalProgress >= 100 && (
              <p className="text-center text-sm mt-2 font-medium">🎉 Daily goal reached!</p>
            )}
          </div>
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
              onClick={() => initiateQuiz({ mode: 'due', filterMode: 'all' })}
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
              onClick={() => initiateQuiz({ mode: 'new', filterMode: 'all' })}
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
              onClick={() => initiateQuiz({ mode: 'marked', filterMode: 'all' })}
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
              onClick={() => initiateQuiz({ mode: 'struggling', filterMode: 'all' })}
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
            onClick={() => initiateQuiz({ mode: 'all', filterMode: 'all' })}
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
                    initiateQuiz({ section, mode: 'section' })
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
        {/* Flag Note Modal */}
        {showFlagNoteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Flag for Review</h3>
                <button
                  onClick={() => setShowFlagNoteModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-1" />
                  Add a note (optional)
                </label>
                <textarea
                  value={flagNoteText}
                  onChange={(e) => setFlagNoteText(e.target.value)}
                  placeholder="Why are you flagging this question? What do you need to review?"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Image className="w-4 h-4 inline mr-1" />
                  Attach image (optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFlagImageUpload}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
                {flagNoteImage && (
                  <div className="mt-2 relative">
                    <img 
                      src={flagNoteImage} 
                      alt="Flag note attachment" 
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setFlagNoteImage(null)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowFlagNoteModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={saveFlagNote}
                  className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 flex items-center justify-center gap-2"
                >
                  <Flag className="w-4 h-4" />
                  Flag Question
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confidence Prompt Modal */}
        {showConfidencePrompt && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-sm w-full p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 text-center">How confident are you?</h3>
              <p className="text-sm text-gray-600 text-center">Rate your confidence before seeing the answer</p>
              
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleConfidenceSelect('guessing')}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors"
                >
                  <HelpCircle className="w-8 h-8 text-red-500" />
                  <span className="text-sm font-medium text-gray-700">Guessing</span>
                  <span className="text-xs text-gray-400">(G)</span>
                </button>
                <button
                  onClick={() => handleConfidenceSelect('unsure')}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-gray-200 hover:border-yellow-300 hover:bg-yellow-50 transition-colors"
                >
                  <CircleDot className="w-8 h-8 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">Unsure</span>
                  <span className="text-xs text-gray-400">(U)</span>
                </button>
                <button
                  onClick={() => handleConfidenceSelect('confident')}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
                >
                  <ThumbsUp className="w-8 h-8 text-green-500" />
                  <span className="text-sm font-medium text-gray-700">Confident</span>
                  <span className="text-xs text-gray-400">(C)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setTimerActive(false)
              setView('menu')
            }}
            className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Exit</span>
          </button>
          
          <div className="flex items-center gap-4 text-sm">
            {/* Timer display */}
            {settings.timedMode && (
              <span className={`flex items-center gap-1 font-mono ${timeRemaining <= 10 ? 'text-red-600 animate-pulse' : 'text-gray-600'}`}>
                <Timer className="w-4 h-4" />
                {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
              </span>
            )}
            <span className="text-gray-600">
              {currentIndex + 1} / {questions.length}
            </span>
            <span className="text-green-600">{sessionStats.correct} ✓</span>
            <span className="text-red-600">{sessionStats.incorrect} ✗</span>
          </div>
        </div>

        {/* Progress Bar with clickable segments */}
        <div className="w-full bg-gray-200 rounded-full h-2 relative">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevQuestion}
            disabled={currentIndex === 0}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentIndex === 0 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          
          <div className="flex items-center gap-1 overflow-x-auto px-2 max-w-[200px]">
            {questions.slice(Math.max(0, currentIndex - 2), Math.min(questions.length, currentIndex + 3)).map((q, i) => {
              const actualIndex = Math.max(0, currentIndex - 2) + i
              const qProgress = sr.getProgress(q.id)
              return (
                <button
                  key={q.id}
                  onClick={() => goToQuestion(actualIndex)}
                  className={`w-6 h-6 rounded-full text-xs font-medium flex-shrink-0 transition-colors ${
                    actualIndex === currentIndex 
                      ? 'bg-purple-600 text-white' 
                      : qProgress.isMarkedForReview
                        ? 'bg-orange-100 text-orange-600 border border-orange-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {actualIndex + 1}
                </button>
              )
            })}
          </div>
          
          <button
            onClick={nextQuestion}
            disabled={currentIndex === questions.length - 1}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentIndex === questions.length - 1 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
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
                onClick={handleFlagClick}
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

          {/* Show flag note if exists */}
          {progress.isMarkedForReview && (progress.reviewNote || progress.reviewImage) && (
            <div className="mx-4 mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-start gap-2">
                <Flag className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  {progress.reviewNote && (
                    <p className="text-sm text-orange-800">{progress.reviewNote}</p>
                  )}
                  {progress.reviewImage && (
                    <img 
                      src={progress.reviewImage} 
                      alt="Review note attachment" 
                      className="max-h-32 rounded-lg object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          )}

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
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
                {/* Confidence indicator */}
                {confidence && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    confidence === 'confident' 
                      ? (isCorrect ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700') 
                      : confidence === 'guessing' 
                        ? 'bg-gray-200 text-gray-700'
                        : 'bg-yellow-200 text-yellow-700'
                  }`}>
                    {confidence === 'confident' && !isCorrect && '⚠️ '}{confidence}
                  </span>
                )}
              </div>
              <p className="text-gray-700 text-sm">{currentQuestion.explanation}</p>
              
              {/* "Why I got this wrong" note feature - only show if incorrect */}
              {!isCorrect && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  {showErrorNoteInput ? (
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-700">
                        Why did you get this wrong? (helps you remember)
                      </label>
                      <textarea
                        value={errorNoteText}
                        onChange={(e) => setErrorNoteText(e.target.value)}
                        placeholder="e.g., Confused portal vein with hepatic vein anatomy..."
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none"
                        rows={2}
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={saveErrorNote}
                          className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700"
                        >
                          Save Note
                        </button>
                        <button
                          onClick={() => {
                            setShowErrorNoteInput(false)
                            setErrorNoteText('')
                          }}
                          className="px-3 py-1 text-gray-600 text-sm hover:text-gray-800"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowErrorNoteInput(true)}
                      className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Add note: Why I got this wrong
                    </button>
                  )}
                  
                  {/* Show existing error note */}
                  {progress.errorNote && !showErrorNoteInput && (
                    <div className="mt-2 p-2 bg-purple-50 rounded-lg">
                      <p className="text-xs text-purple-700">
                        <strong>Your note:</strong> {progress.errorNote}
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Show spaced repetition info */}
              <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
                <p>Next review: {new Date(sr.getProgress(currentQuestion.id).nextReviewDate).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </div>

        {/* Keyboard shortcuts hint */}
        <div className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
          <Keyboard className="w-3 h-3" />
          <span>1-5: Select • Enter: Submit • ←→: Navigate • F: Flag</span>
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
            onClick={() => initiateQuiz()}
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

          {/* Confidence Rating */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700">Confidence Rating</span>
              <p className="text-xs text-gray-500">Rate your confidence before seeing answers</p>
            </div>
            <button
              onClick={() => setSettings(prev => ({ ...prev, showConfidenceRating: !prev.showConfidenceRating }))}
              className={`w-12 h-6 rounded-full transition-colors ${settings.showConfidenceRating ? 'bg-purple-600' : 'bg-gray-300'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${settings.showConfidenceRating ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>

        {/* Timed Mode Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
          <h3 className="font-medium text-gray-900 flex items-center gap-2">
            <Timer className="w-4 h-4" />
            Timed Mode
          </h3>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Enable Timer</span>
            <button
              onClick={() => setSettings(prev => ({ ...prev, timedMode: !prev.timedMode }))}
              className={`w-12 h-6 rounded-full transition-colors ${settings.timedMode ? 'bg-purple-600' : 'bg-gray-300'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${settings.timedMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>
          
          {settings.timedMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seconds per Question
              </label>
              <select
                value={settings.secondsPerQuestion}
                onChange={(e) => setSettings(prev => ({ ...prev, secondsPerQuestion: parseInt(e.target.value) }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value={30}>30 seconds (Hard)</option>
                <option value={60}>60 seconds (Medium)</option>
                <option value={90}>90 seconds (Standard)</option>
                <option value={120}>120 seconds (Relaxed)</option>
                <option value={180}>180 seconds (Easy)</option>
              </select>
            </div>
          )}
        </div>

        {/* Daily Goal Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
          <h3 className="font-medium text-gray-900 flex items-center gap-2">
            <Flame className="w-4 h-4" />
            Daily Goal
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Questions per Day
            </label>
            <select
              value={sr.getStats().dailyGoal}
              onChange={(e) => sr.setDailyGoal(parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value={10}>10 questions</option>
              <option value={20}>20 questions</option>
              <option value={30}>30 questions</option>
              <option value={50}>50 questions</option>
              <option value={100}>100 questions</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Complete your daily goal to maintain your streak!
            </p>
          </div>
        </div>

        {/* Auto-save notice */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-sm text-green-700">Your settings are automatically saved</p>
        </div>

        <button
          onClick={() => {
            setView('menu')
          }}
          className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors"
        >
          Back to Menu
        </button>
      </div>
    )
  }

  // Render first visit / setup modal
  const renderFirstVisitModal = () => {
    if (!showFirstVisitModal) return null
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Welcome to EBIR MCQ Practice!</h2>
            <p className="text-gray-600 mt-2">Let's set up your quiz preferences before you start.</p>
          </div>
          
          <div className="space-y-4">
            {/* Confidence Rating Toggle */}
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-gray-900">Confidence Rating</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Rate how confident you are before seeing the answer. Helps identify lucky guesses vs. true knowledge.
                  </p>
                </div>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, showConfidenceRating: !prev.showConfidenceRating }))}
                  className={`w-14 h-7 rounded-full transition-colors flex-shrink-0 ${settings.showConfidenceRating ? 'bg-purple-600' : 'bg-gray-300'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full shadow transform transition-transform ${settings.showConfidenceRating ? 'translate-x-7' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>
            
            {/* Timed Mode Toggle */}
            <div className="bg-orange-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2">
                    <Timer className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-gray-900">Timed Mode</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Add time pressure like the real exam. Auto-submits when time runs out.
                  </p>
                </div>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, timedMode: !prev.timedMode }))}
                  className={`w-14 h-7 rounded-full transition-colors flex-shrink-0 ${settings.timedMode ? 'bg-orange-600' : 'bg-gray-300'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full shadow transform transition-transform ${settings.timedMode ? 'translate-x-7' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>
            
            {/* Shuffle Options Toggle */}
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2">
                    <Shuffle className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-900">Shuffle Answer Choices</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Randomize the order of answer options to prevent pattern memorization.
                  </p>
                </div>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, shuffleOptions: !prev.shuffleOptions }))}
                  className={`w-14 h-7 rounded-full transition-colors flex-shrink-0 ${settings.shuffleOptions ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full shadow transform transition-transform ${settings.shuffleOptions ? 'translate-x-7' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>
            
            {/* Default Question Count */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <List className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Default Questions per Quiz</span>
              </div>
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
          </div>
          
          <div className="pt-2 space-y-3">
            <button
              onClick={() => {
                localStorage.setItem(FIRST_VISIT_KEY, 'true')
                setShowFirstVisitModal(false)
              }}
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors"
            >
              Start Practicing
            </button>
            <p className="text-xs text-center text-gray-500">
              You can change these settings anytime from the Settings menu
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Render quiz start modal (question count selector)
  const renderQuizStartModal = () => {
    if (!showQuizStartModal) return null
    
    // Calculate available questions for display
    let pool: MCQQuestion[] = []
    const activeSettings = { ...settings, ...pendingQuizSettings }
    
    if (activeSettings.section) {
      pool = getQuestionsBySection(activeSettings.section)
    } else {
      pool = [...mcqQuestions]
    }
    
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
    
    const availableCount = filteredIds.length
    
    // Get quiz type label
    let quizTypeLabel = 'Quiz'
    switch (activeSettings.mode) {
      case 'due': quizTypeLabel = 'Due for Review'; break
      case 'new': quizTypeLabel = 'New Questions'; break
      case 'marked': quizTypeLabel = 'Flagged Questions'; break
      case 'struggling': quizTypeLabel = 'Weak Areas'; break
      case 'section': quizTypeLabel = `Section ${activeSettings.section}`; break
      case 'all': quizTypeLabel = 'Random Practice'; break
    }
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">{quizTypeLabel}</h2>
            <button
              onClick={() => {
                setShowQuizStartModal(false)
                setPendingQuizSettings(null)
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Available Questions Info */}
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-600">Available questions</p>
              <p className="text-2xl font-bold text-gray-900">{availableCount}</p>
            </div>
            
            {/* Question Count Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How many questions?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[10, 20, 30, 50, availableCount > 50 ? 100 : null, availableCount].filter((n, i, arr) => n !== null && arr.indexOf(n) === i && n <= availableCount).map(count => (
                  <button
                    key={count}
                    onClick={() => setSelectedQuestionCount(count!)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      selectedQuestionCount === count
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {count === availableCount ? `All (${count})` : count}
                  </button>
                ))}
              </div>
              
              {/* Custom number input */}
              <div className="mt-3">
                <label className="text-xs text-gray-500">Or enter custom amount:</label>
                <input
                  type="number"
                  min={1}
                  max={availableCount}
                  value={selectedQuestionCount}
                  onChange={(e) => setSelectedQuestionCount(Math.min(Math.max(1, parseInt(e.target.value) || 1), availableCount))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                />
              </div>
            </div>
            
            {/* Quick settings toggles */}
            <div className="border-t pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Confidence prompts</span>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, showConfidenceRating: !prev.showConfidenceRating }))}
                  className={`w-10 h-5 rounded-full transition-colors ${settings.showConfidenceRating ? 'bg-purple-600' : 'bg-gray-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${settings.showConfidenceRating ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Timed mode</span>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, timedMode: !prev.timedMode }))}
                  className={`w-10 h-5 rounded-full transition-colors ${settings.timedMode ? 'bg-purple-600' : 'bg-gray-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${settings.timedMode ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => {
              setShowQuizStartModal(false)
              startQuiz({ ...pendingQuizSettings, questionCount: selectedQuestionCount })
              setPendingQuizSettings(null)
            }}
            disabled={availableCount === 0}
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {availableCount === 0 ? 'No questions available' : `Start Quiz (${selectedQuestionCount} questions)`}
          </button>
        </div>
      </div>
    )
  }

  // Main render
  if (!sr.isLoaded || !settingsLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {renderFirstVisitModal()}
      {renderQuizStartModal()}
      {view === 'menu' && renderMenu()}
      {view === 'quiz' && renderQuiz()}
      {view === 'stats' && renderStats()}
      {view === 'settings' && renderSettings()}
    </div>
  )
}
