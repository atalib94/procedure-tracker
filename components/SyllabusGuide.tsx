'use client'

import { useState, useMemo, useEffect } from 'react'
import { Search, BookOpen, ChevronDown, ChevronRight, GraduationCap, ExternalLink, Save, Loader2, CheckCircle2 } from 'lucide-react'
import { syllabusData, ExamFrequency, Section } from '@/lib/syllabusData'
import { createClient } from '@/lib/supabase-client'

const frequencyLabels = {
  green: 'Frequently Tested',
  yellow: 'Most Examinations',
  red: 'Rarely Tested',
  purple: 'Competency Checklist'
}

const frequencyColors = {
  green: 'bg-green-100 text-green-800 border-green-300',
  yellow: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  red: 'bg-red-100 text-red-800 border-red-300',
  purple: 'bg-purple-100 text-purple-800 border-purple-300'
}

interface UserNote {
  id?: string
  endpoint_id: string
  note_text: string
  updated_at?: string
}

export default function SyllabusGuide() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set(['section-a']))
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [selectedSection, setSelectedSection] = useState<Section | null>(null)
  const [userNotes, setUserNotes] = useState<Record<string, string>>({})
  const [savingNotes, setSavingNotes] = useState<Set<string>>(new Set())
  const [savedNotes, setSavedNotes] = useState<Set<string>>(new Set())
  const [userId, setUserId] = useState<string | null>(null)

  const supabase = createClient()

  // Get current user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
        loadUserNotes(user.id)
      }
    }
    getUser()
  }, [])

  // Load user notes from database
  const loadUserNotes = async (uid: string) => {
    const { data, error } = await supabase
      .from('syllabus_notes')
      .select('*')
      .eq('user_id', uid)
    
    if (data && !error) {
      const notesMap: Record<string, string> = {}
      data.forEach((note: UserNote) => {
        notesMap[note.endpoint_id] = note.note_text
      })
      setUserNotes(notesMap)
    }
  }

  // Save note to database
  const saveNote = async (endpointId: string, noteText: string) => {
    if (!userId) return

    setSavingNotes(prev => new Set(prev).add(endpointId))
    setSavedNotes(prev => {
      const newSet = new Set(prev)
      newSet.delete(endpointId)
      return newSet
    })

    const { error } = await supabase
      .from('syllabus_notes')
      .upsert({
        user_id: userId,
        endpoint_id: endpointId,
        note_text: noteText,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,endpoint_id'
      })

    setSavingNotes(prev => {
      const newSet = new Set(prev)
      newSet.delete(endpointId)
      return newSet
    })

    if (!error) {
      setSavedNotes(prev => new Set(prev).add(endpointId))
      setTimeout(() => {
        setSavedNotes(prev => {
          const newSet = new Set(prev)
          newSet.delete(endpointId)
          return newSet
        })
      }, 2000)
    }
  }

  // Handle note change
  const handleNoteChange = (endpointId: string, value: string) => {
    setUserNotes(prev => ({
      ...prev,
      [endpointId]: value
    }))
  }

  const toggleChapter = (id: string) => {
    const newExpanded = new Set(expandedChapters)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedChapters(newExpanded)
  }

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedSections(newExpanded)
  }

  // Search functionality
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return syllabusData

    const query = searchQuery.toLowerCase()
    return syllabusData.map(chapter => ({
      ...chapter,
      sections: chapter.sections.filter(section => {
        const titleMatch = section.title.toLowerCase().includes(query)
        const endpointMatch = section.knowledgeEndpoints?.some(endpoint => 
          endpoint.text.toLowerCase().includes(query)
        )
        return titleMatch || endpointMatch
      })
    })).filter(chapter => chapter.sections.length > 0)
  }, [searchQuery])

  // Count total endpoints
  const totalEndpoints = useMemo(() => {
    return syllabusData.reduce((acc, chapter) => {
      return acc + chapter.sections.reduce((sAcc, section) => {
        return sAcc + (section.knowledgeEndpoints?.length || 0)
      }, 0)
    }, 0)
  }, [])

  return (
    <div className="max-w-6xl mx-auto pb-20 lg:pb-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <GraduationCap className="w-7 h-7 text-purple-600" />
          EBIR Syllabus Study Guide
        </h1>
        <p className="text-gray-600 mt-1">
          European Curriculum and Syllabus for Interventional Radiology (2023) • {totalEndpoints} knowledge endpoints
        </p>
      </div>

      {/* Reference Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex gap-3">
          <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium">Official CIRSE Knowledge Endpoints</p>
            <p className="mt-1">
              These knowledge endpoints are taken directly from the European Curriculum and Syllabus for Interventional Radiology, Third Edition (2023). 
              Use the text fields below each endpoint to write your own notes and explanations.
            </p>
            <a 
              href="https://www.cirse.org/wp-content/uploads/2023/04/cirse_IRcurriculum_syllabus_2023_web.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 mt-2 font-medium"
            >
              View Original Document <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Frequency Legend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Examination Frequency Guide</h3>
        <div className="flex flex-wrap gap-3">
          {Object.entries(frequencyLabels).map(([key, label]) => (
            <span key={key} className={`px-3 py-1 rounded-full text-xs font-medium border ${frequencyColors[key as ExamFrequency]}`}>
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search topics (e.g., PAE, TIPS, biopsy, embolization, ABI...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Navigation */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Contents</h2>
          </div>
          <div className="max-h-[600px] overflow-y-auto divide-y divide-gray-100">
            {filteredData.map(chapter => (
              <div key={chapter.id}>
                <button
                  onClick={() => toggleChapter(chapter.id)}
                  className="w-full px-4 py-3 flex items-center gap-2 hover:bg-gray-50 text-left"
                >
                  {expandedChapters.has(chapter.id) ? (
                    <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  )}
                  <span className="font-medium text-purple-600">Section {chapter.letter}</span>
                  <span className="text-gray-700 text-sm truncate">{chapter.title}</span>
                </button>

                {expandedChapters.has(chapter.id) && (
                  <div className="bg-gray-50 border-t border-gray-100">
                    {chapter.sections.map(section => (
                      <button
                        key={section.id}
                        onClick={() => setSelectedSection(section)}
                        className={`w-full px-6 py-2 flex items-center gap-2 hover:bg-gray-100 text-left ${
                          selectedSection?.id === section.id ? 'bg-purple-50' : ''
                        }`}
                      >
                        <span className="text-xs text-gray-500 font-mono">{section.number}</span>
                        <span className={`text-sm flex-1 truncate ${
                          selectedSection?.id === section.id ? 'text-purple-700 font-medium' : 'text-gray-800'
                        }`}>{section.title}</span>
                        {section.frequency && (
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            section.frequency === 'green' ? 'bg-green-500' :
                            section.frequency === 'yellow' ? 'bg-yellow-500' :
                            section.frequency === 'red' ? 'bg-red-500' : 'bg-purple-500'
                          }`} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">
              {selectedSection ? selectedSection.title : 'Select a Topic'}
            </h2>
            {selectedSection?.frequency && (
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${frequencyColors[selectedSection.frequency]}`}>
                {frequencyLabels[selectedSection.frequency]}
              </span>
            )}
          </div>
          
          {selectedSection ? (
            <div className="p-6 max-h-[600px] overflow-y-auto">
              <p className="text-sm text-gray-600 mb-6">
                Section {selectedSection.number} • {selectedSection.knowledgeEndpoints?.length || 0} knowledge endpoints
              </p>
              
              <div className="space-y-8">
                {selectedSection.knowledgeEndpoints?.map((endpoint, index) => (
                  <div key={endpoint.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Knowledge Endpoint Header */}
                    <div className="bg-purple-50 px-4 py-3 border-b border-gray-200">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </span>
                        <p className="text-gray-900 font-medium leading-relaxed">
                          {endpoint.text}
                        </p>
                      </div>
                    </div>
                    
                    {/* User Notes Area */}
                    <div className="p-4 bg-white">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Notes
                      </label>
                      <textarea
                        value={userNotes[endpoint.id] || ''}
                        onChange={(e) => handleNoteChange(endpoint.id, e.target.value)}
                        placeholder="Write your own explanation, mnemonics, or study notes here..."
                        className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm resize-none"
                      />
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-xs text-gray-500">
                          Your notes are saved to your account
                        </p>
                        <button
                          onClick={() => saveNote(endpoint.id, userNotes[endpoint.id] || '')}
                          disabled={savingNotes.has(endpoint.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {savingNotes.has(endpoint.id) ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Saving...
                            </>
                          ) : savedNotes.has(endpoint.id) ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              Saved!
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              Save Note
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p>Select a topic from the contents to view knowledge endpoints</p>
              <p className="text-sm mt-2">
                {totalEndpoints} official CIRSE knowledge endpoints across {syllabusData.length} sections
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
