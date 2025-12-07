'use client'

import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { 
  Search, BookOpen, ChevronDown, ChevronRight, GraduationCap, ExternalLink, 
  Save, Loader2, CheckCircle2, Expand, Shrink, Bold, Italic, Underline,
  Type, Palette, Image as ImageIcon, X, AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered, Undo, Redo, Trash2
} from 'lucide-react'
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

const FONT_SIZES = [
  { label: 'Small', value: '1' },
  { label: 'Normal', value: '3' },
  { label: 'Large', value: '5' },
  { label: 'Huge', value: '7' },
]

const TEXT_COLORS = [
  { label: 'Black', value: '#000000' },
  { label: 'Gray', value: '#6b7280' },
  { label: 'Red', value: '#dc2626' },
  { label: 'Orange', value: '#ea580c' },
  { label: 'Yellow', value: '#ca8a04' },
  { label: 'Green', value: '#16a34a' },
  { label: 'Blue', value: '#2563eb' },
  { label: 'Purple', value: '#9333ea' },
  { label: 'Pink', value: '#db2777' },
]

const HIGHLIGHT_COLORS = [
  { label: 'None', value: 'transparent' },
  { label: 'Yellow', value: '#fef08a' },
  { label: 'Green', value: '#bbf7d0' },
  { label: 'Blue', value: '#bfdbfe' },
  { label: 'Pink', value: '#fbcfe8' },
  { label: 'Orange', value: '#fed7aa' },
]

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  onSave: () => void
  isSaving: boolean
  isSaved: boolean
  endpointId: string
}

function RichTextEditor({ content, onChange, onSave, isSaving, isSaved, endpointId }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showFontSize, setShowFontSize] = useState(false)
  const [showTextColor, setShowTextColor] = useState(false)
  const [showHighlight, setShowHighlight] = useState(false)
  const [isEditorFocused, setIsEditorFocused] = useState(false)

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content || ''
    }
  }, [endpointId]) // Only reset when endpoint changes

  const execCommand = useCallback((command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleContentChange()
  }, [])

  const handleContentChange = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }, [onChange])

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = `<img src="${event.target?.result}" alt="Uploaded image" style="max-width: 100%; height: auto; margin: 8px 0; border-radius: 8px;" />`
      document.execCommand('insertHTML', false, img)
      handleContentChange()
    }
    reader.readAsDataURL(file)
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [handleContentChange])

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items
    if (!items) return

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        e.preventDefault()
        const blob = items[i].getAsFile()
        if (blob) {
          const reader = new FileReader()
          reader.onload = (event) => {
            const img = `<img src="${event.target?.result}" alt="Pasted image" style="max-width: 100%; height: auto; margin: 8px 0; border-radius: 8px;" />`
            document.execCommand('insertHTML', false, img)
            handleContentChange()
          }
          reader.readAsDataURL(blob)
        }
        return
      }
    }
  }, [handleContentChange])

  const ToolbarButton = ({ onClick, active, children, title }: { onClick: () => void, active?: boolean, children: React.ReactNode, title: string }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${active ? 'bg-gray-200 text-purple-600' : 'text-gray-600'}`}
    >
      {children}
    </button>
  )

  const DropdownMenu = ({ show, onClose, children }: { show: boolean, onClose: () => void, children: React.ReactNode }) => {
    if (!show) return null
    return (
      <>
        <div className="fixed inset-0 z-10" onClick={onClose} />
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1 min-w-[120px]">
          {children}
        </div>
      </>
    )
  }

  const editorClasses = isExpanded 
    ? "fixed inset-4 z-50 bg-white rounded-xl shadow-2xl flex flex-col"
    : "border border-gray-200 rounded-lg overflow-hidden"

  return (
    <>
      {/* Backdrop for expanded mode */}
      {isExpanded && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsExpanded(false)} />
      )}

      <div className={editorClasses}>
        {/* Toolbar */}
        <div className="flex items-center gap-1 p-2 bg-gray-50 border-b border-gray-200 flex-wrap">
          {/* Undo/Redo */}
          <ToolbarButton onClick={() => execCommand('undo')} title="Undo">
            <Undo className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('redo')} title="Redo">
            <Redo className="w-4 h-4" />
          </ToolbarButton>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Text formatting */}
          <ToolbarButton onClick={() => execCommand('bold')} title="Bold (Ctrl+B)">
            <Bold className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('italic')} title="Italic (Ctrl+I)">
            <Italic className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('underline')} title="Underline (Ctrl+U)">
            <Underline className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('strikeThrough')} title="Strikethrough">
            <span className="text-sm font-medium line-through">S</span>
          </ToolbarButton>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Font Size */}
          <div className="relative">
            <ToolbarButton onClick={() => { setShowFontSize(!showFontSize); setShowTextColor(false); setShowHighlight(false); }} title="Font Size">
              <Type className="w-4 h-4" />
            </ToolbarButton>
            <DropdownMenu show={showFontSize} onClose={() => setShowFontSize(false)}>
              {FONT_SIZES.map(size => (
                <button
                  key={size.value}
                  onClick={() => { execCommand('fontSize', size.value); setShowFontSize(false); }}
                  className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100"
                >
                  {size.label}
                </button>
              ))}
            </DropdownMenu>
          </div>

          {/* Text Color */}
          <div className="relative">
            <ToolbarButton onClick={() => { setShowTextColor(!showTextColor); setShowFontSize(false); setShowHighlight(false); }} title="Text Color">
              <div className="flex flex-col items-center">
                <span className="text-sm font-bold">A</span>
                <div className="w-4 h-1 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded" />
              </div>
            </ToolbarButton>
            <DropdownMenu show={showTextColor} onClose={() => setShowTextColor(false)}>
              <div className="grid grid-cols-3 gap-1 p-2">
                {TEXT_COLORS.map(color => (
                  <button
                    key={color.value}
                    onClick={() => { execCommand('foreColor', color.value); setShowTextColor(false); }}
                    className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color.value }}
                    title={color.label}
                  />
                ))}
              </div>
            </DropdownMenu>
          </div>

          {/* Highlight Color */}
          <div className="relative">
            <ToolbarButton onClick={() => { setShowHighlight(!showHighlight); setShowFontSize(false); setShowTextColor(false); }} title="Highlight">
              <Palette className="w-4 h-4" />
            </ToolbarButton>
            <DropdownMenu show={showHighlight} onClose={() => setShowHighlight(false)}>
              <div className="grid grid-cols-3 gap-1 p-2">
                {HIGHLIGHT_COLORS.map(color => (
                  <button
                    key={color.value}
                    onClick={() => { execCommand('hiliteColor', color.value); setShowHighlight(false); }}
                    className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color.value === 'transparent' ? '#fff' : color.value }}
                    title={color.label}
                  >
                    {color.value === 'transparent' && <X className="w-4 h-4 text-gray-400 mx-auto" />}
                  </button>
                ))}
              </div>
            </DropdownMenu>
          </div>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Alignment */}
          <ToolbarButton onClick={() => execCommand('justifyLeft')} title="Align Left">
            <AlignLeft className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('justifyCenter')} title="Align Center">
            <AlignCenter className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('justifyRight')} title="Align Right">
            <AlignRight className="w-4 h-4" />
          </ToolbarButton>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Lists */}
          <ToolbarButton onClick={() => execCommand('insertUnorderedList')} title="Bullet List">
            <List className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('insertOrderedList')} title="Numbered List">
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Image Upload */}
          <ToolbarButton onClick={() => fileInputRef.current?.click()} title="Insert Image">
            <ImageIcon className="w-4 h-4" />
          </ToolbarButton>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* Clear Formatting */}
          <ToolbarButton onClick={() => execCommand('removeFormat')} title="Clear Formatting">
            <Trash2 className="w-4 h-4" />
          </ToolbarButton>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Expand/Collapse */}
          <ToolbarButton onClick={() => setIsExpanded(!isExpanded)} title={isExpanded ? "Collapse" : "Expand"}>
            {isExpanded ? <Shrink className="w-4 h-4" /> : <Expand className="w-4 h-4" />}
          </ToolbarButton>
        </div>

        {/* Editor Area */}
        <div 
          ref={editorRef}
          contentEditable
          onInput={handleContentChange}
          onPaste={handlePaste}
          onFocus={() => setIsEditorFocused(true)}
          onBlur={() => setIsEditorFocused(false)}
          className={`
            ${isExpanded ? 'flex-1 overflow-y-auto' : 'min-h-[150px] max-h-[300px] overflow-y-auto'}
            p-3 focus:outline-none text-sm
            prose prose-sm max-w-none
            [&_img]:cursor-pointer [&_img]:hover:ring-2 [&_img]:hover:ring-purple-400
          `}
          style={{ 
            minHeight: isExpanded ? 'auto' : '150px',
          }}
          data-placeholder="Write your notes here... You can format text, add images, and more!"
        />

        {/* Footer with Save Button */}
        <div className="flex items-center justify-between p-2 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            {isExpanded ? 'Press Escape or click outside to close • ' : ''}
            Tip: Paste images directly from clipboard
          </p>
          <button
            onClick={onSave}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : isSaved ? (
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

      {/* Placeholder styling */}
      <style jsx global>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        [contenteditable] img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 8px 0;
        }
        [contenteditable]:focus {
          outline: none;
        }
      `}</style>
    </>
  )
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
      data.forEach((note: { endpoint_id: string; note_text: string }) => {
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
              Use the rich text editor below each endpoint to write your own notes with formatting, images, and more.
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
            <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
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
                    
                    {/* Rich Text Editor */}
                    <div className="p-4 bg-white">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Notes
                      </label>
                      <RichTextEditor
                        content={userNotes[endpoint.id] || ''}
                        onChange={(content) => handleNoteChange(endpoint.id, content)}
                        onSave={() => saveNote(endpoint.id, userNotes[endpoint.id] || '')}
                        isSaving={savingNotes.has(endpoint.id)}
                        isSaved={savedNotes.has(endpoint.id)}
                        endpointId={endpoint.id}
                      />
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
