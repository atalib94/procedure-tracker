'use client'

import { useState, useMemo } from 'react'
import { Search, BookOpen, ChevronDown, ChevronRight, GraduationCap, ExternalLink, CheckCircle } from 'lucide-react'
import { syllabusData, ExamFrequency, KnowledgeItem } from '@/lib/syllabusData'

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

export default function SyllabusGuide() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set(['section-a']))
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null)

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
        const itemMatch = section.knowledgeItems?.some(item => 
          item.title.toLowerCase().includes(query) || 
          item.explanation.toLowerCase().includes(query)
        )
        return titleMatch || itemMatch
      })
    })).filter(chapter => chapter.sections.length > 0)
  }, [searchQuery])

  // Count total topics
  const totalTopics = useMemo(() => {
    return syllabusData.reduce((acc, chapter) => {
      return acc + chapter.sections.reduce((sAcc, section) => {
        return sAcc + (section.knowledgeItems?.length || 0)
      }, 0)
    }, 0)
  }, [])

  const renderExplanation = (text: string) => {
    const lines = text.split('\n')
    return lines.map((line, idx) => {
      // Headers (bold text on its own line)
      if (line.startsWith('**') && line.endsWith('**')) {
        return <h3 key={idx} className="font-bold text-gray-900 mt-4 mb-2 text-base">{line.replace(/\*\*/g, '')}</h3>
      }
      // Inline bold with content after
      if (line.startsWith('**') && line.includes(':**')) {
        const match = line.match(/^\*\*([^*]+):\*\*(.*)/)
        if (match) {
          return (
            <p key={idx} className="mb-2">
              <strong className="text-gray-900">{match[1]}:</strong>
              {match[2]}
            </p>
          )
        }
      }
      // Italic terms with colon
      if (line.startsWith('*') && !line.startsWith('**') && line.includes(':*')) {
        const parts = line.split(':*')
        const term = parts[0].replace(/^\*/, '')
        const rest = parts.slice(1).join(':*').replace(/\*$/, '')
        return (
          <p key={idx} className="mb-1 ml-4">
            <em className="text-gray-800 font-medium">{term}:</em>
            {rest}
          </p>
        )
      }
      // Bullet points
      if (line.startsWith('- ')) {
        return <li key={idx} className="ml-6 text-gray-700 mb-1">{line.substring(2)}</li>
      }
      // Numbered lists
      if (/^\d+\.\s/.test(line)) {
        return <li key={idx} className="ml-6 text-gray-700 mb-1 list-decimal">{line.replace(/^\d+\.\s/, '')}</li>
      }
      // Empty lines
      if (line.trim() === '') {
        return <div key={idx} className="h-2" />
      }
      // Horizontal rules / section dividers
      if (line.trim() === '---') {
        return <hr key={idx} className="my-4 border-gray-200" />
      }
      // Regular paragraph
      return <p key={idx} className="text-gray-700 mb-2">{line}</p>
    })
  }

  return (
    <div className="max-w-6xl mx-auto pb-20 lg:pb-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <GraduationCap className="w-7 h-7 text-purple-600" />
          EBIR Syllabus Study Guide
        </h1>
        <p className="text-gray-600 mt-1">
          European Curriculum and Syllabus for Interventional Radiology (2023) • {totalTopics} topics
        </p>
      </div>

      {/* Reference Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex gap-3">
          <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium">Reference</p>
            <p className="mt-1">
              Based on the European Curriculum and Syllabus for Interventional Radiology, Third Edition (2023), 
              published by CIRSE and the UEMS Division of Interventional Radiology.
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
                      <div key={section.id}>
                        <button
                          onClick={() => toggleSection(section.id)}
                          className="w-full px-6 py-2 flex items-center gap-2 hover:bg-gray-100 text-left"
                        >
                          {expandedSections.has(section.id) ? (
                            <ChevronDown className="w-3 h-3 text-gray-400 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                          )}
                          <span className="text-xs text-gray-500 font-mono">{section.number}</span>
                          <span className="text-sm text-gray-800 truncate flex-1">{section.title}</span>
                          {section.frequency && (
                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                              section.frequency === 'green' ? 'bg-green-500' :
                              section.frequency === 'yellow' ? 'bg-yellow-500' :
                              section.frequency === 'red' ? 'bg-red-500' : 'bg-purple-500'
                            }`} />
                          )}
                        </button>

                        {expandedSections.has(section.id) && section.knowledgeItems && (
                          <div className="bg-white border-t border-gray-100">
                            {section.knowledgeItems.map(item => (
                              <button
                                key={item.id}
                                onClick={() => setSelectedItem(item)}
                                className={`w-full px-8 py-2 text-left text-sm hover:bg-purple-50 flex items-center gap-2 ${
                                  selectedItem?.id === item.id ? 'bg-purple-50 text-purple-700' : 'text-gray-600'
                                }`}
                              >
                                <CheckCircle className={`w-3 h-3 flex-shrink-0 ${
                                  selectedItem?.id === item.id ? 'text-purple-500' : 'text-gray-300'
                                }`} />
                                <span className="line-clamp-2">{item.title}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">
              {selectedItem ? selectedItem.title : 'Select a Topic'}
            </h2>
          </div>
          
          {selectedItem ? (
            <div className="p-6 max-h-[600px] overflow-y-auto">
              <div className="prose prose-sm max-w-none">
                {renderExplanation(selectedItem.explanation)}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p>Select a topic from the contents to view study material</p>
              <p className="text-sm mt-2">
                {totalTopics} exam-relevant topics across {syllabusData.length} sections
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
