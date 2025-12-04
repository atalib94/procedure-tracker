'use client'

import { useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase-client'
import { 
  Wrench, Plus, Search, Filter, SortAsc, SortDesc, 
  Grid, List, Star, Package, X
} from 'lucide-react'
import ToolCard from './ToolCard'
import ToolUploadForm from './ToolUploadForm'
import ToolViewerModal from './ToolViewerModal'
import LinkToolModal from './LinkToolModal'

interface ToolCategory {
  id: string
  name: string
  code: string
  icon: string
  order_index?: number
}

interface Tool {
  id: string
  user_id: string
  category_id: string | null
  name: string
  manufacturer: string | null
  model_number: string | null
  description: string | null
  specifications: string | null
  notes: string | null
  image_url: string | null
  is_favorite: boolean
  is_active: boolean
  created_at: string
  updated_at: string
  category: ToolCategory | null
  linked_count: number
}

interface ToolboxClientProps {
  initialTools: Tool[]
  categories: ToolCategory[]
  userId: string
}

type SortField = 'name' | 'created_at' | 'manufacturer' | 'linked_count'
type SortOrder = 'asc' | 'desc'
type ViewMode = 'grid' | 'list'

export default function ToolboxClient({ initialTools, categories, userId }: ToolboxClientProps) {
  const supabase = createClient()
  
  const [tools, setTools] = useState<Tool[]>(initialTools)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortField, setSortField] = useState<SortField>('created_at')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [viewingTool, setViewingTool] = useState<Tool | null>(null)
  const [linkingTool, setLinkingTool] = useState<Tool | null>(null)
  const [editingTool, setEditingTool] = useState<Tool | null>(null)

  // Filter and sort tools
  const filteredTools = useMemo(() => {
    let result = [...tools]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.manufacturer?.toLowerCase().includes(query) ||
        tool.model_number?.toLowerCase().includes(query) ||
        tool.description?.toLowerCase().includes(query)
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(tool => tool.category_id === selectedCategory)
    }

    // Filter by favorites
    if (showFavoritesOnly) {
      result = result.filter(tool => tool.is_favorite)
    }

    // Sort
    result.sort((a, b) => {
      let aVal: any, bVal: any

      switch (sortField) {
        case 'name':
          aVal = a.name.toLowerCase()
          bVal = b.name.toLowerCase()
          break
        case 'manufacturer':
          aVal = (a.manufacturer || '').toLowerCase()
          bVal = (b.manufacturer || '').toLowerCase()
          break
        case 'linked_count':
          aVal = a.linked_count
          bVal = b.linked_count
          break
        case 'created_at':
        default:
          aVal = new Date(a.created_at).getTime()
          bVal = new Date(b.created_at).getTime()
      }

      if (sortOrder === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0
      }
    })

    return result
  }, [tools, searchQuery, selectedCategory, sortField, sortOrder, showFavoritesOnly])

  // Count tools per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: tools.length }
    tools.forEach(tool => {
      if (tool.category_id) {
        counts[tool.category_id] = (counts[tool.category_id] || 0) + 1
      }
    })
    return counts
  }, [tools])

  const handleToolUploaded = (newTool: Tool) => {
    setTools(prev => [newTool, ...prev])
    setShowUploadForm(false)
  }

  const handleToolUpdated = (updatedTool: Tool) => {
    setTools(prev => prev.map(t => t.id === updatedTool.id ? updatedTool : t))
    setEditingTool(null)
    setViewingTool(null)
  }

  const handleToolDeleted = (toolId: string) => {
    setTools(prev => prev.filter(t => t.id !== toolId))
    setViewingTool(null)
  }

  const handleToggleFavorite = async (toolId: string) => {
    const tool = tools.find(t => t.id === toolId)
    if (!tool) return

    const { error } = await supabase
      .from('tools')
      .update({ is_favorite: !tool.is_favorite })
      .eq('id', toolId)

    if (!error) {
      setTools(prev => prev.map(t => 
        t.id === toolId ? { ...t, is_favorite: !t.is_favorite } : t
      ))
    }
  }

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Wrench className="w-7 h-7 text-blue-600" />
            Toolbox
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your IR tools and devices
          </p>
        </div>
        <button
          onClick={() => setShowUploadForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Tool
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tools by name, manufacturer, model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories ({categoryCounts.all || 0})</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({categoryCounts[cat.id] || 0})
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as SortField)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="created_at">Date Added</option>
              <option value="name">Name</option>
              <option value="manufacturer">Manufacturer</option>
              <option value="linked_count">Most Used</option>
            </select>
            <button
              onClick={toggleSortOrder}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            >
              {sortOrder === 'asc' ? (
                <SortAsc className="w-5 h-5 text-gray-600" />
              ) : (
                <SortDesc className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>

          {/* View Mode & Favorites Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`p-2 border rounded-lg transition-colors ${
                showFavoritesOnly 
                  ? 'bg-yellow-50 border-yellow-300 text-yellow-600' 
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
              title="Show favorites only"
            >
              <Star className={`w-5 h-5 ${showFavoritesOnly ? 'fill-current' : ''}`} />
            </button>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              >
                <Grid className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              >
                <List className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid/List */}
      {filteredTools.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
            : 'space-y-3'
        }>
          {filteredTools.map(tool => (
            <ToolCard
              key={tool.id}
              tool={tool}
              viewMode={viewMode}
              onView={() => setViewingTool(tool)}
              onLink={() => setLinkingTool(tool)}
              onEdit={() => setEditingTool(tool)}
              onToggleFavorite={() => handleToggleFavorite(tool.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchQuery || selectedCategory !== 'all' || showFavoritesOnly
              ? 'No tools match your filters'
              : 'No tools yet'}
          </h3>
          <p className="text-gray-500 mb-4">
            {searchQuery || selectedCategory !== 'all' || showFavoritesOnly
              ? 'Try adjusting your search or filters'
              : 'Add your first IR tool to get started'}
          </p>
          {!searchQuery && selectedCategory === 'all' && !showFavoritesOnly && (
            <button
              onClick={() => setShowUploadForm(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5" />
              Add Tool
            </button>
          )}
        </div>
      )}

      {/* Results count */}
      {filteredTools.length > 0 && (
        <p className="text-sm text-gray-500 text-center">
          Showing {filteredTools.length} of {tools.length} tools
        </p>
      )}

      {/* Modals */}
      {showUploadForm && (
        <ToolUploadForm
          categories={categories}
          userId={userId}
          onClose={() => setShowUploadForm(false)}
          onSuccess={handleToolUploaded}
        />
      )}

      {viewingTool && (
        <ToolViewerModal
          tool={viewingTool}
          categories={categories}
          onClose={() => setViewingTool(null)}
          onEdit={() => {
            setEditingTool(viewingTool)
            setViewingTool(null)
          }}
          onDelete={() => handleToolDeleted(viewingTool.id)}
          onLink={() => {
            setLinkingTool(viewingTool)
            setViewingTool(null)
          }}
        />
      )}

      {editingTool && (
        <ToolUploadForm
          categories={categories}
          userId={userId}
          existingTool={editingTool}
          onClose={() => setEditingTool(null)}
          onSuccess={handleToolUpdated}
        />
      )}

      {linkingTool && (
        <LinkToolModal
          toolId={linkingTool.id}
          toolName={linkingTool.name}
          onClose={() => setLinkingTool(null)}
          onSuccess={() => {
            // Update linked count
            setTools(prev => prev.map(t => 
              t.id === linkingTool.id 
                ? { ...t, linked_count: t.linked_count + 1 } 
                : t
            ))
            setLinkingTool(null)
          }}
        />
      )}
    </div>
  )
}
