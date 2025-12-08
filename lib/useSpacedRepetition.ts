'use client'

import { useState, useEffect, useCallback } from 'react'

// SM-2 Algorithm intervals (in days)
const INTERVALS = [0, 1, 3, 7, 14, 30, 60, 120, 240]

export interface QuestionProgress {
  questionId: string
  // Spaced repetition data
  easeFactor: number      // 1.3 to 2.5, affects interval growth
  interval: number        // Current interval in days
  repetitions: number     // Number of successful reviews
  nextReviewDate: string  // ISO date string
  lastReviewDate: string  // ISO date string
  // Performance data
  timesAnswered: number
  timesCorrect: number
  timesIncorrect: number
  streak: number          // Current correct streak
  // Flags
  isMarkedForReview: boolean
  isMastered: boolean     // Answered correctly 3+ times with no recent errors
  // Review notes (for flagged questions)
  reviewNote: string | null
  reviewImage: string | null  // Base64 encoded image
}

export interface StudySession {
  date: string
  questionsStudied: number
  correctAnswers: number
  incorrectAnswers: number
  timeSpentSeconds: number
}

export interface SpacedRepetitionData {
  progress: Record<string, QuestionProgress>  // questionId -> progress
  sessions: StudySession[]
  lastStudyDate: string | null
  totalQuestionsAnswered: number
  totalCorrect: number
  totalIncorrect: number
}

const DEFAULT_PROGRESS: QuestionProgress = {
  questionId: '',
  easeFactor: 2.5,
  interval: 0,
  repetitions: 0,
  nextReviewDate: new Date().toISOString(),
  lastReviewDate: '',
  timesAnswered: 0,
  timesCorrect: 0,
  timesIncorrect: 0,
  streak: 0,
  isMarkedForReview: false,
  isMastered: false,
  reviewNote: null,
  reviewImage: null
}

const STORAGE_KEY = 'ebir-mcq-spaced-repetition'

export function useSpacedRepetition() {
  const [data, setData] = useState<SpacedRepetitionData>({
    progress: {},
    sessions: [],
    lastStudyDate: null,
    totalQuestionsAnswered: 0,
    totalCorrect: 0,
    totalIncorrect: 0
  })
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Handle legacy data structure
        if (parsed.progress) {
          setData(parsed)
        }
      }
    } catch (e) {
      console.error('Failed to load spaced repetition data:', e)
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      } catch (e) {
        console.error('Failed to save spaced repetition data:', e)
      }
    }
  }, [data, isLoaded])

  // Get progress for a specific question
  const getProgress = useCallback((questionId: string): QuestionProgress => {
    return data.progress[questionId] || { ...DEFAULT_PROGRESS, questionId }
  }, [data.progress])

  // Calculate next review date using SM-2 algorithm
  const calculateNextReview = (progress: QuestionProgress, wasCorrect: boolean): QuestionProgress => {
    const now = new Date()
    let { easeFactor, interval, repetitions, streak } = progress
    
    if (wasCorrect) {
      // Correct answer - increase interval
      repetitions += 1
      streak += 1
      
      if (repetitions === 1) {
        interval = 1
      } else if (repetitions === 2) {
        interval = 3
      } else {
        interval = Math.round(interval * easeFactor)
      }
      
      // Adjust ease factor (minimum 1.3)
      easeFactor = Math.max(1.3, easeFactor + 0.1)
    } else {
      // Incorrect answer - reset
      repetitions = 0
      interval = 0
      streak = 0
      
      // Decrease ease factor
      easeFactor = Math.max(1.3, easeFactor - 0.2)
    }

    const nextReviewDate = new Date(now)
    nextReviewDate.setDate(nextReviewDate.getDate() + interval)

    const isMastered = progress.timesCorrect >= 3 && streak >= 2 && easeFactor >= 2.3

    return {
      ...progress,
      easeFactor,
      interval,
      repetitions,
      nextReviewDate: nextReviewDate.toISOString(),
      lastReviewDate: now.toISOString(),
      timesAnswered: progress.timesAnswered + 1,
      timesCorrect: progress.timesCorrect + (wasCorrect ? 1 : 0),
      timesIncorrect: progress.timesIncorrect + (wasCorrect ? 0 : 1),
      streak,
      isMastered
    }
  }

  // Record an answer
  const recordAnswer = useCallback((questionId: string, wasCorrect: boolean) => {
    setData(prev => {
      const currentProgress = prev.progress[questionId] || { ...DEFAULT_PROGRESS, questionId }
      const newProgress = calculateNextReview(currentProgress, wasCorrect)
      
      return {
        ...prev,
        progress: {
          ...prev.progress,
          [questionId]: newProgress
        },
        totalQuestionsAnswered: prev.totalQuestionsAnswered + 1,
        totalCorrect: prev.totalCorrect + (wasCorrect ? 1 : 0),
        totalIncorrect: prev.totalIncorrect + (wasCorrect ? 0 : 1),
        lastStudyDate: new Date().toISOString()
      }
    })
  }, [])

  // Toggle mark for review
  const toggleMarkForReview = useCallback((questionId: string) => {
    setData(prev => {
      const currentProgress = prev.progress[questionId] || { ...DEFAULT_PROGRESS, questionId }
      return {
        ...prev,
        progress: {
          ...prev.progress,
          [questionId]: {
            ...currentProgress,
            isMarkedForReview: !currentProgress.isMarkedForReview,
            // Clear note and image when unmarking
            ...(currentProgress.isMarkedForReview ? { reviewNote: null, reviewImage: null } : {})
          }
        }
      }
    })
  }, [])

  // Set review note for a flagged question
  const setReviewNote = useCallback((questionId: string, note: string | null, image: string | null) => {
    setData(prev => {
      const currentProgress = prev.progress[questionId] || { ...DEFAULT_PROGRESS, questionId }
      return {
        ...prev,
        progress: {
          ...prev.progress,
          [questionId]: {
            ...currentProgress,
            reviewNote: note,
            reviewImage: image
          }
        }
      }
    })
  }, [])

  // Get questions due for review
  const getDueQuestions = useCallback((questionIds: string[]): string[] => {
    const now = new Date()
    return questionIds.filter(id => {
      const progress = data.progress[id]
      if (!progress) return true // Never seen = due
      return new Date(progress.nextReviewDate) <= now
    })
  }, [data.progress])

  // Get questions marked for review
  const getMarkedQuestions = useCallback((questionIds: string[]): string[] => {
    return questionIds.filter(id => {
      const progress = data.progress[id]
      return progress?.isMarkedForReview
    })
  }, [data.progress])

  // Get questions answered correctly (for filtering)
  const getCorrectlyAnswered = useCallback((questionIds: string[]): string[] => {
    return questionIds.filter(id => {
      const progress = data.progress[id]
      return progress && progress.timesCorrect > 0 && progress.streak > 0
    })
  }, [data.progress])

  // Get questions never seen
  const getNewQuestions = useCallback((questionIds: string[]): string[] => {
    return questionIds.filter(id => !data.progress[id])
  }, [data.progress])

  // Get mastered questions
  const getMasteredQuestions = useCallback((questionIds: string[]): string[] => {
    return questionIds.filter(id => {
      const progress = data.progress[id]
      return progress?.isMastered
    })
  }, [data.progress])

  // Get struggling questions (answered incorrectly multiple times)
  const getStrugglingQuestions = useCallback((questionIds: string[]): string[] => {
    return questionIds.filter(id => {
      const progress = data.progress[id]
      return progress && progress.timesIncorrect >= 2 && progress.streak === 0
    })
  }, [data.progress])

  // Get statistics
  const getStats = useCallback(() => {
    const allProgress = Object.values(data.progress)
    const totalQuestions = allProgress.length
    const mastered = allProgress.filter(p => p.isMastered).length
    const struggling = allProgress.filter(p => p.timesIncorrect >= 2 && p.streak === 0).length
    const markedForReview = allProgress.filter(p => p.isMarkedForReview).length
    const accuracy = data.totalQuestionsAnswered > 0 
      ? Math.round((data.totalCorrect / data.totalQuestionsAnswered) * 100) 
      : 0

    return {
      totalAnswered: data.totalQuestionsAnswered,
      totalCorrect: data.totalCorrect,
      totalIncorrect: data.totalIncorrect,
      accuracy,
      questionsWithProgress: totalQuestions,
      mastered,
      struggling,
      markedForReview,
      lastStudyDate: data.lastStudyDate
    }
  }, [data])

  // Reset all progress
  const resetAllProgress = useCallback(() => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setData({
        progress: {},
        sessions: [],
        lastStudyDate: null,
        totalQuestionsAnswered: 0,
        totalCorrect: 0,
        totalIncorrect: 0
      })
    }
  }, [])

  // Reset progress for a specific question
  const resetQuestionProgress = useCallback((questionId: string) => {
    setData(prev => {
      const newProgress = { ...prev.progress }
      delete newProgress[questionId]
      return {
        ...prev,
        progress: newProgress
      }
    })
  }, [])

  return {
    isLoaded,
    getProgress,
    recordAnswer,
    toggleMarkForReview,
    setReviewNote,
    getDueQuestions,
    getMarkedQuestions,
    getCorrectlyAnswered,
    getNewQuestions,
    getMasteredQuestions,
    getStrugglingQuestions,
    getStats,
    resetAllProgress,
    resetQuestionProgress
  }
}
