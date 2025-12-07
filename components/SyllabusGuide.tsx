'use client'

import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { 
  Search, BookOpen, ChevronDown, ChevronRight, GraduationCap, ExternalLink, 
  Save, Loader2, CheckCircle2, Expand, Shrink, Bold, Italic, Underline,
  Type, Palette, Image as ImageIcon, X, AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered, Undo, Redo, Trash2, Filter, CheckCircle, Circle,
  BarChart3, FileText, PenLine, ChevronLeft, BookOpenCheck, Edit3, Menu, ChevronUp
} from 'lucide-react'
import { syllabusData, ExamFrequency, Section } from '@/lib/syllabusData'
import { createClient } from '@/lib/supabase-client'

type ViewMode = 'editor' | 'reader'
type ReaderFilter = 'all' | 'filled'

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

type FilterMode = 'all' | 'completed' | 'incomplete'

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
  }, [endpointId])

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
      {isExpanded && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsExpanded(false)} />
      )}

      <div className={editorClasses}>
        {/* Toolbar */}
        <div className="flex items-center gap-1 p-2 bg-gray-50 border-b border-gray-200 flex-wrap">
          <ToolbarButton onClick={() => execCommand('undo')} title="Undo">
            <Undo className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('redo')} title="Redo">
            <Redo className="w-4 h-4" />
          </ToolbarButton>

          <div className="w-px h-6 bg-gray-300 mx-1" />

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

          <ToolbarButton onClick={() => execCommand('insertUnorderedList')} title="Bullet List">
            <List className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('insertOrderedList')} title="Numbered List">
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>

          <div className="w-px h-6 bg-gray-300 mx-1" />

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

          <ToolbarButton onClick={() => execCommand('removeFormat')} title="Clear Formatting">
            <Trash2 className="w-4 h-4" />
          </ToolbarButton>

          <div className="flex-1" />

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
  const [selectedSection, setSelectedSection] = useState<Section | null>(null)
  const [userNotes, setUserNotes] = useState<Record<string, string>>({})
  const [savingNotes, setSavingNotes] = useState<Set<string>>(new Set())
  const [savedNotes, setSavedNotes] = useState<Set<string>>(new Set())
  const [userId, setUserId] = useState<string | null>(null)
  const [filterMode, setFilterMode] = useState<FilterMode>('all')
  const [isLoading, setIsLoading] = useState(true)
  
  // Reader mode state
  const [viewMode, setViewMode] = useState<ViewMode>('editor')
  const [readerFilter, setReaderFilter] = useState<ReaderFilter>('filled')
  const [currentEndpointIndex, setCurrentEndpointIndex] = useState(0)
  const [showReaderNav, setShowReaderNav] = useState(false)
  const [statsCollapsed, setStatsCollapsed] = useState(false)
  const [expandedReaderChapters, setExpandedReaderChapters] = useState<Set<string>>(new Set())
  const [expandedReaderSections, setExpandedReaderSections] = useState<Set<string>>(new Set())
  
  // Swipe handling with animation
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchCurrent, setTouchCurrent] = useState<{ x: number; y: number } | null>(null)
  const [swipeOffset, setSwipeOffset] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)
  const [isHorizontalSwipe, setIsHorizontalSwipe] = useState<boolean | null>(null)
  const minSwipeDistance = 80
  const swipeThreshold = 0.3 // 30% of screen width triggers swipe

  const supabase = createClient()

  // Get current user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
        await loadUserNotes(user.id)
      }
      setIsLoading(false)
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

  // Check if a note has content (not empty or just whitespace/empty HTML)
  const hasNoteContent = useCallback((endpointId: string) => {
    const note = userNotes[endpointId]
    if (!note) return false
    // Strip HTML tags and check if there's actual content
    const textContent = note.replace(/<[^>]*>/g, '').trim()
    return textContent.length > 0
  }, [userNotes])

  // Get all endpoint IDs
  const allEndpointIds = useMemo(() => {
    const ids: string[] = []
    syllabusData.forEach(chapter => {
      chapter.sections.forEach(section => {
        section.knowledgeEndpoints?.forEach(endpoint => {
          ids.push(endpoint.id)
        })
      })
    })
    return ids
  }, [])

  // Calculate statistics
  const stats = useMemo(() => {
    const total = allEndpointIds.length
    const completed = allEndpointIds.filter(id => hasNoteContent(id)).length
    const incomplete = total - completed
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0
    return { total, completed, incomplete, percentage }
  }, [allEndpointIds, hasNoteContent])

  // Filter sections based on filter mode and search
  const filteredData = useMemo(() => {
    let data = syllabusData

    // First apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      data = data.map(chapter => ({
        ...chapter,
        sections: chapter.sections.filter(section => {
          const titleMatch = section.title.toLowerCase().includes(query)
          const endpointMatch = section.knowledgeEndpoints?.some(endpoint => 
            endpoint.text.toLowerCase().includes(query)
          )
          return titleMatch || endpointMatch
        })
      })).filter(chapter => chapter.sections.length > 0)
    }

    // Then apply completion filter
    if (filterMode !== 'all') {
      data = data.map(chapter => ({
        ...chapter,
        sections: chapter.sections.map(section => ({
          ...section,
          knowledgeEndpoints: section.knowledgeEndpoints?.filter(endpoint => {
            const hasContent = hasNoteContent(endpoint.id)
            return filterMode === 'completed' ? hasContent : !hasContent
          })
        })).filter(section => section.knowledgeEndpoints && section.knowledgeEndpoints.length > 0)
      })).filter(chapter => chapter.sections.length > 0)
    }

    return data
  }, [searchQuery, filterMode, hasNoteContent])

  // Filter endpoints in selected section
  const filteredEndpoints = useMemo(() => {
    if (!selectedSection?.knowledgeEndpoints) return []
    
    if (filterMode === 'all') {
      return selectedSection.knowledgeEndpoints
    }
    
    return selectedSection.knowledgeEndpoints.filter(endpoint => {
      const hasContent = hasNoteContent(endpoint.id)
      return filterMode === 'completed' ? hasContent : !hasContent
    })
  }, [selectedSection, filterMode, hasNoteContent])

  // Count completed in current section
  const sectionStats = useMemo(() => {
    if (!selectedSection?.knowledgeEndpoints) return { total: 0, completed: 0 }
    const total = selectedSection.knowledgeEndpoints.length
    const completed = selectedSection.knowledgeEndpoints.filter(ep => hasNoteContent(ep.id)).length
    return { total, completed }
  }, [selectedSection, hasNoteContent])

  // Build flat list of all endpoints for reader navigation
  const readerEndpoints = useMemo(() => {
    const endpoints: { id: string; text: string; sectionTitle: string; sectionId: string; chapterTitle: string; chapterId: string; note: string }[] = []
    syllabusData.forEach(chapter => {
      chapter.sections.forEach(section => {
        section.knowledgeEndpoints?.forEach(endpoint => {
          const note = userNotes[endpoint.id] || ''
          const hasContent = note.replace(/<[^>]*>/g, '').trim().length > 0
          if (readerFilter === 'all' || hasContent) {
            endpoints.push({
              id: endpoint.id,
              text: endpoint.text,
              sectionTitle: section.title,
              sectionId: section.id,
              chapterTitle: chapter.title,
              chapterId: chapter.id,
              note
            })
          }
        })
      })
    })
    return endpoints
  }, [userNotes, readerFilter])

  // Build hierarchical structure for reader navigation
  const readerNavHierarchy = useMemo(() => {
    const hierarchy: { 
      chapter: { id: string; title: string; letter: string }; 
      sections: { 
        section: { id: string; title: string; number: string }; 
        endpoints: { id: string; text: string; globalIndex: number }[] 
      }[] 
    }[] = []
    
    let globalIndex = 0
    syllabusData.forEach(chapter => {
      const chapterSections: { section: { id: string; title: string; number: string }; endpoints: { id: string; text: string; globalIndex: number }[] }[] = []
      
      chapter.sections.forEach(section => {
        const sectionEndpoints: { id: string; text: string; globalIndex: number }[] = []
        
        section.knowledgeEndpoints?.forEach(endpoint => {
          const note = userNotes[endpoint.id] || ''
          const hasContent = note.replace(/<[^>]*>/g, '').trim().length > 0
          if (readerFilter === 'all' || hasContent) {
            sectionEndpoints.push({
              id: endpoint.id,
              text: endpoint.text,
              globalIndex
            })
            globalIndex++
          }
        })
        
        if (sectionEndpoints.length > 0) {
          chapterSections.push({
            section: { id: section.id, title: section.title, number: section.number },
            endpoints: sectionEndpoints
          })
        }
      })
      
      if (chapterSections.length > 0) {
        hierarchy.push({
          chapter: { id: chapter.id, title: chapter.title, letter: chapter.letter },
          sections: chapterSections
        })
      }
    })
    
    return hierarchy
  }, [userNotes, readerFilter])

  // Toggle reader nav chapter
  const toggleReaderChapter = (chapterId: string) => {
    setExpandedReaderChapters(prev => {
      const newSet = new Set(prev)
      if (newSet.has(chapterId)) {
        newSet.delete(chapterId)
      } else {
        newSet.add(chapterId)
      }
      return newSet
    })
  }

  // Toggle reader nav section
  const toggleReaderSection = (sectionId: string) => {
    setExpandedReaderSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId)
      } else {
        newSet.add(sectionId)
      }
      return newSet
    })
  }

  // Navigate reader
  const goToNextEndpoint = () => {
    if (currentEndpointIndex < readerEndpoints.length - 1) {
      setCurrentEndpointIndex(currentEndpointIndex + 1)
    }
  }

  const goToPrevEndpoint = () => {
    if (currentEndpointIndex > 0) {
      setCurrentEndpointIndex(currentEndpointIndex - 1)
    }
  }

  // Switch to editor for current endpoint
  const editCurrentEndpoint = () => {
    const currentEndpoint = readerEndpoints[currentEndpointIndex]
    if (!currentEndpoint) return
    
    // Find the section containing this endpoint
    for (const chapter of syllabusData) {
      for (const section of chapter.sections) {
        if (section.knowledgeEndpoints?.some(ep => ep.id === currentEndpoint.id)) {
          setSelectedSection(section)
          setExpandedChapters(prev => new Set(prev).add(chapter.id))
          setViewMode('editor')
          return
        }
      }
    }
  }

  // Swipe handlers - Instagram style
  // Key insight: use touch-action CSS and detect direction very early
  const onTouchStart = (e: React.TouchEvent) => {
    if (isAnimating) return
    const touch = e.targetTouches[0]
    setTouchStart({ x: touch.clientX, y: touch.clientY })
    setTouchCurrent({ x: touch.clientX, y: touch.clientY })
    setIsHorizontalSwipe(null)
    setSwipeOffset(0)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart || isAnimating) return
    
    const touch = e.targetTouches[0]
    const deltaX = touch.clientX - touchStart.x
    const deltaY = touch.clientY - touchStart.y
    
    // Determine direction on first move (very low threshold)
    if (isHorizontalSwipe === null) {
      // Need at least some movement to decide
      if (Math.abs(deltaX) < 5 && Math.abs(deltaY) < 5) return
      
      // Instagram trick: if horizontal movement is greater, lock to horizontal
      // Use a ratio - if moving more horizontal than vertical, it's a swipe
      const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY) * 1.2
      setIsHorizontalSwipe(isHorizontal)
      
      if (!isHorizontal) {
        // Let the page scroll naturally
        setTouchStart(null)
        return
      }
    }
    
    // We've locked to horizontal - prevent ALL default behavior
    if (isHorizontalSwipe === true) {
      e.preventDefault()
      e.stopPropagation()
      
      setTouchCurrent({ x: touch.clientX, y: touch.clientY })
      
      // Apply swipe offset with boundary resistance
      const canSwipeLeft = currentEndpointIndex < readerEndpoints.length - 1
      const canSwipeRight = currentEndpointIndex > 0
      
      if ((deltaX < 0 && canSwipeLeft) || (deltaX > 0 && canSwipeRight)) {
        setSwipeOffset(deltaX)
      } else {
        // Rubber band at boundaries
        setSwipeOffset(deltaX * 0.15)
      }
    }
  }

  const onTouchEnd = () => {
    if (!touchStart || isAnimating) {
      resetSwipeState()
      return
    }
    
    if (!isHorizontalSwipe || !touchCurrent) {
      resetSwipeState()
      return
    }
    
    const deltaX = touchCurrent.x - touchStart.x
    const screenWidth = window.innerWidth
    const velocity = Math.abs(deltaX) / screenWidth
    
    // Trigger swipe if moved enough OR moved fast enough
    const shouldSwipe = velocity > 0.25 || Math.abs(deltaX) > 60
    
    if (shouldSwipe) {
      if (deltaX < 0 && currentEndpointIndex < readerEndpoints.length - 1) {
        // Swipe left - go next
        animateSwipe('left')
      } else if (deltaX > 0 && currentEndpointIndex > 0) {
        // Swipe right - go previous  
        animateSwipe('right')
      } else {
        snapBack()
      }
    } else {
      snapBack()
    }
  }

  const animateSwipe = (direction: 'left' | 'right') => {
    const screenWidth = window.innerWidth
    setSwipeDirection(direction)
    setIsAnimating(true)
    setSwipeOffset(direction === 'left' ? -screenWidth : screenWidth)
    
    setTimeout(() => {
      setCurrentEndpointIndex(prev => direction === 'left' ? prev + 1 : prev - 1)
      resetSwipeState()
    }, 250)
  }

  const snapBack = () => {
    setIsAnimating(true)
    setSwipeOffset(0)
    setTimeout(resetSwipeState, 200)
  }

  const resetSwipeState = () => {
    setTouchStart(null)
    setTouchCurrent(null)
    setSwipeOffset(0)
    setIsAnimating(false)
    setSwipeDirection(null)
    setIsHorizontalSwipe(null)
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
          European Curriculum and Syllabus for Interventional Radiology (2023)
        </p>
      </div>

      {/* Statistics Section - Collapsible */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <button
          onClick={() => setStatsCollapsed(!statsCollapsed)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            <span className="font-semibold text-gray-900">Progress Statistics</span>
            <span className="text-sm text-gray-500">({stats.percentage}% complete)</span>
          </div>
          {statsCollapsed ? (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          )}
        </button>
        
        {!statsCollapsed && (
          <div className="px-4 pb-4 border-t border-gray-100">
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    <p className="text-xs text-gray-500">Total Topics</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <PenLine className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.incomplete}</p>
                    <p className="text-xs text-gray-500">Remaining</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.percentage}%</p>
                    <p className="text-xs text-gray-500">Progress</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                <span className="text-sm text-gray-500">{stats.completed} / {stats.total} topics</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${stats.percentage}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          {/* Filter Buttons and View Mode Toggle */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={() => setFilterMode('all')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    filterMode === 'all' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterMode('completed')}
                  className={`px-3 py-2 text-sm font-medium transition-colors border-l border-gray-300 ${
                    filterMode === 'completed' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="hidden sm:inline">Completed</span>
                  <span className="sm:hidden">Done</span>
                </button>
                <button
                  onClick={() => setFilterMode('incomplete')}
                  className={`px-3 py-2 text-sm font-medium transition-colors border-l border-gray-300 ${
                    filterMode === 'incomplete' 
                      ? 'bg-orange-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="hidden sm:inline">Incomplete</span>
                  <span className="sm:hidden">Todo</span>
                </button>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
              <button
                onClick={() => setViewMode('editor')}
                className={`px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  viewMode === 'editor' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <PenLine className="w-4 h-4" />
                <span className="hidden sm:inline">Editor</span>
              </button>
              <button
                onClick={() => { setViewMode('reader'); setCurrentEndpointIndex(0); }}
                className={`px-3 py-2 text-sm font-medium transition-colors border-l border-gray-300 flex items-center gap-1.5 ${
                  viewMode === 'reader' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <BookOpenCheck className="w-4 h-4" />
                <span className="hidden sm:inline">Reader</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reader Mode */}
      {viewMode === 'reader' ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
          {/* Reader Header */}
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowReaderNav(!showReaderNav)}
                  className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                  title="Toggle navigator"
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                </button>
                <h2 className="font-semibold text-gray-900">Reader Mode</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 hidden sm:inline">Show:</span>
                <select
                  value={readerFilter}
                  onChange={(e) => { setReaderFilter(e.target.value as ReaderFilter); setCurrentEndpointIndex(0); }}
                  className="text-sm border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-purple-500"
                >
                  <option value="filled">With notes only</option>
                  <option value="all">All topics</option>
                </select>
              </div>
            </div>
          </div>

          {/* Navigator Sidebar */}
          {showReaderNav && (
            <>
              <div 
                className="fixed inset-0 bg-black/30 z-40"
                onClick={() => setShowReaderNav(false)}
              />
              <div className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-xl z-50 flex flex-col">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Navigator</h3>
                  <button
                    onClick={() => setShowReaderNav(false)}
                    className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {readerNavHierarchy.map(({ chapter, sections }) => (
                    <div key={chapter.id} className="border-b border-gray-100">
                      {/* Chapter Header */}
                      <button
                        onClick={() => toggleReaderChapter(chapter.id)}
                        className="w-full px-4 py-3 flex items-center gap-2 hover:bg-gray-50 text-left"
                      >
                        {expandedReaderChapters.has(chapter.id) ? (
                          <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        )}
                        <span className="font-medium text-purple-600">Section {chapter.letter}</span>
                        <span className="text-gray-700 text-sm truncate flex-1">{chapter.title}</span>
                        <span className="text-xs text-gray-400">
                          {sections.reduce((acc, s) => acc + s.endpoints.length, 0)}
                        </span>
                      </button>

                      {/* Sections */}
                      {expandedReaderChapters.has(chapter.id) && (
                        <div className="bg-gray-50">
                          {sections.map(({ section, endpoints }) => (
                            <div key={section.id}>
                              {/* Section Header */}
                              <button
                                onClick={() => toggleReaderSection(section.id)}
                                className="w-full pl-8 pr-4 py-2 flex items-center gap-2 hover:bg-gray-100 text-left"
                              >
                                {expandedReaderSections.has(section.id) ? (
                                  <ChevronDown className="w-3 h-3 text-gray-400 flex-shrink-0" />
                                ) : (
                                  <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                                )}
                                <span className="text-xs text-gray-500 font-mono">{section.number}</span>
                                <span className="text-sm text-gray-700 truncate flex-1">{section.title}</span>
                                <span className="text-xs text-gray-400">{endpoints.length}</span>
                              </button>

                              {/* Endpoints */}
                              {expandedReaderSections.has(section.id) && (
                                <div className="bg-white">
                                  {endpoints.map((endpoint) => (
                                    <button
                                      key={endpoint.id}
                                      onClick={() => { 
                                        setCurrentEndpointIndex(endpoint.globalIndex); 
                                        setShowReaderNav(false); 
                                      }}
                                      className={`w-full pl-12 pr-4 py-2 text-left hover:bg-purple-50 transition-colors ${
                                        endpoint.globalIndex === currentEndpointIndex 
                                          ? 'bg-purple-100 border-l-4 border-purple-600' 
                                          : ''
                                      }`}
                                    >
                                      <p className={`text-sm line-clamp-2 ${
                                        endpoint.globalIndex === currentEndpointIndex 
                                          ? 'text-purple-700 font-medium' 
                                          : 'text-gray-600'
                                      }`}>
                                        {endpoint.text}
                                      </p>
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
            </>
          )}

          {readerEndpoints.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="font-medium">No notes yet</p>
              <p className="text-sm mt-1">Switch to Editor mode to add notes, or show all topics.</p>
            </div>
          ) : (
            <>
              {/* Reader Content with Swipe Animation */}
              <div 
                className="overflow-hidden touch-pan-y"
                style={{ touchAction: 'pan-y pinch-zoom' }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <div 
                  className="p-6 sm:p-8 min-h-[60vh]"
                  style={{
                    transform: `translateX(${swipeOffset}px)`,
                    transition: isAnimating ? 'transform 0.25s ease-out, opacity 0.25s ease-out' : 'none',
                    opacity: 1 - Math.abs(swipeOffset) * 0.0015,
                    willChange: isAnimating ? 'transform, opacity' : 'auto',
                  }}
                >
                  {/* Breadcrumb */}
                  <div className="text-sm text-gray-500 mb-4">
                    {readerEndpoints[currentEndpointIndex]?.chapterTitle} › {readerEndpoints[currentEndpointIndex]?.sectionTitle}
                  </div>

                  {/* Question */}
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 sm:p-6 mb-6">
                    <p className="text-gray-900 font-medium text-lg leading-relaxed">
                      {readerEndpoints[currentEndpointIndex]?.text}
                    </p>
                  </div>

                  {/* Notes Content */}
                  <div className="prose prose-gray max-w-none">
                    {readerEndpoints[currentEndpointIndex]?.note ? (
                      <div 
                        dangerouslySetInnerHTML={{ __html: readerEndpoints[currentEndpointIndex].note }}
                        className="text-gray-700 leading-relaxed"
                      />
                    ) : (
                      <p className="text-gray-400 italic">No notes for this topic yet.</p>
                    )}
                  </div>

                  {/* Swipe hint */}
                  <div className="mt-8 text-center text-xs text-gray-400 sm:hidden">
                    ← Swipe to navigate →
                  </div>
                </div>
              </div>

              {/* Reader Navigation Footer */}
              <div className="px-4 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <button
                    onClick={goToPrevEndpoint}
                    disabled={currentEndpointIndex === 0}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <div className="text-sm text-gray-500">
                    {currentEndpointIndex + 1} / {readerEndpoints.length}
                  </div>

                  <button
                    onClick={goToNextEndpoint}
                    disabled={currentEndpointIndex === readerEndpoints.length - 1}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Floating Edit Button */}
              <button
                onClick={editCurrentEndpoint}
                className="fixed bottom-24 right-4 sm:bottom-8 sm:right-8 p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors z-30"
                title="Edit this topic"
              >
                <Edit3 className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          {/* Reference Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex gap-3">
              <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">Official CIRSE Knowledge Endpoints</p>
                <p className="mt-1">
                  Knowledge endpoints from the European Curriculum and Syllabus for IR (2023). 
                  Write your own notes with formatting, images, and more.
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Navigation */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">Contents</h2>
              </div>
              <div className="max-h-[600px] overflow-y-auto divide-y divide-gray-100">
                {filteredData.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    <p>No topics match your filter</p>
                  </div>
                ) : (
                  filteredData.map(chapter => (
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
                      {chapter.sections.map(section => {
                        const sectionCompleted = section.knowledgeEndpoints?.filter(ep => hasNoteContent(ep.id)).length || 0
                        const sectionTotal = section.knowledgeEndpoints?.length || 0
                        
                        return (
                          <button
                            key={section.id}
                            onClick={() => setSelectedSection(section)}
                            className={`w-full px-6 py-2 flex items-center gap-2 hover:bg-gray-100 text-left ${
                              selectedSection?.id === section.id ? 'bg-purple-50' : ''
                            }`}
                          >
                            {sectionCompleted === sectionTotal && sectionTotal > 0 ? (
                              <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                            ) : (
                              <Circle className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                            )}
                            <span className="text-xs text-gray-500 font-mono">{section.number}</span>
                            <span className={`text-sm flex-1 truncate ${
                              selectedSection?.id === section.id ? 'text-purple-700 font-medium' : 'text-gray-800'
                            }`}>{section.title}</span>
                            <span className="text-xs text-gray-400">{sectionCompleted}/{sectionTotal}</span>
                            {section.frequency && (
                              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                section.frequency === 'green' ? 'bg-green-500' :
                                section.frequency === 'yellow' ? 'bg-yellow-500' :
                                section.frequency === 'red' ? 'bg-red-500' : 'bg-purple-500'
                              }`} />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">
                {selectedSection ? selectedSection.title : 'Select a Topic'}
              </h2>
              {selectedSection && (
                <p className="text-xs text-gray-500 mt-0.5">
                  {sectionStats.completed}/{sectionStats.total} completed
                </p>
              )}
            </div>
            {selectedSection?.frequency && (
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${frequencyColors[selectedSection.frequency]}`}>
                {frequencyLabels[selectedSection.frequency]}
              </span>
            )}
          </div>
          
          {selectedSection ? (
            <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
              {filteredEndpoints.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <p>No topics match your filter in this section</p>
                  <button
                    onClick={() => setFilterMode('all')}
                    className="mt-2 text-purple-600 hover:text-purple-700 text-sm font-medium"
                  >
                    Show all topics
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {filteredEndpoints.map((endpoint, index) => (
                    <div key={endpoint.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      {/* Knowledge Endpoint Header */}
                      <div className={`px-4 py-3 border-b border-gray-200 ${hasNoteContent(endpoint.id) ? 'bg-green-50' : 'bg-purple-50'}`}>
                        <div className="flex items-start gap-3">
                          <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            hasNoteContent(endpoint.id) 
                              ? 'bg-green-600 text-white' 
                              : 'bg-purple-600 text-white'
                          }`}>
                            {hasNoteContent(endpoint.id) ? <CheckCircle className="w-4 h-4" /> : index + 1}
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
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p>Select a topic from the contents to view knowledge endpoints</p>
              <p className="text-sm mt-2">
                {stats.total} official CIRSE knowledge endpoints across {syllabusData.length} sections
              </p>
            </div>
          )}
        </div>
      </div>
        </>
      )}
    </div>
  )
}
