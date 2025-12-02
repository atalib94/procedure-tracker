'use client'

import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/lib/supabase-client'
import { Plus, Search, Filter, Grid, List, FileText, Loader2, ArrowUpDown, ArrowUp, ArrowDown, Eye, Link2, Trash2, RefreshCw } from 'lucide-react'
import PDFCard from './PDFCard'
import PDFViewer from './PDFViewer'
import PDFUploadForm from './PDFUploadForm'
import LinkPDFModal from './LinkPDFModal'

interface LearningMaterial {
  id: string
  title: string
  description: string | null
  file_url: string
  file_type: string
  file_size: number | null
  category: string | null
  tags: string[] | null
  is_linked_to_procedure: boolean
  created_at: string
  linked_procedures_count?: number
}

interface LibraryClientProps {
  initialMaterials: LearningMaterial[]
  environmentId: string | null
}

type SortField = 'title' | 'created_at' | 'file_size' | 'linked_procedures_count' | 'category'
type SortDirection = 'asc' | 'desc'

export default function LibraryClient({ initialMaterials, environmentId }: LibraryClientProps) {
  const supabase = createClient()
  
  const [materials, setMaterials] = useState<LearningMaterial[]>(initialMaterials)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortField, setSortField] = useState<SortField>('created_at')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  // Modal states
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [viewingPDF, setViewingPDF] = useState<LearningMaterial | null>(null)
  const [linkingMaterial, setLinkingMaterial] = useState<LearningMaterial | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Refresh function
  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchMaterials()
    setTimeout(() => setIsRefreshing(false), 300)
  }

  const categories = [
    'All Categories',
    'Anatomy',
    'Technique',
    'Case Study',
    'Guidelines',
    'Research',
    'Protocol',
    'Reference',
    'Other'
  ]

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const fetchMaterials = async () => {
    setLoading(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      // Fetch materials
      const { data: materialsData, error: materialsError } = await supabase
        .from('learning_materials')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('file_type', 'pdf')
        .order('created_at', { ascending: false })

      if (materialsError) throw materialsError

      // Fetch linked procedure counts
      const { data: linksData, error: linksError } = await supabase
        .from('procedure_learning_links')
        .select('learning_material_id')

      if (linksError) throw linksError

      // Count links per material
      const linkCounts: Record<string, number> = {}
      linksData?.forEach(link => {
        linkCounts[link.learning_material_id] = (linkCounts[link.learning_material_id] || 0) + 1
      })

      // Merge counts
      const materialsWithCounts = (materialsData || []).map(m => ({
        ...m,
        linked_procedures_count: linkCounts[m.id] || 0
      }))

      setMaterials(materialsWithCounts)
    } catch (err) {
      console.error('Error fetching materials:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      return
    }

    setDeletingId(id)
    try {
      // Get the material to find the file URL
      const material = materials.find(m => m.id === id)
      
      // Delete links first
      await supabase
        .from('procedure_learning_links')
        .delete()
        .eq('learning_material_id', id)

      // Delete the material record
      const { error } = await supabase
        .from('learning_materials')
        .delete()
        .eq('id', id)

      if (error) throw error

      // Try to delete the file from storage
      if (material?.file_url) {
        try {
          // Extract the file path from the URL
          // URL format: https://<project>.supabase.co/storage/v1/object/public/learning-materials/<user_id>/<filename>
          const urlParts = material.file_url.split('/learning-materials/')
          if (urlParts.length > 1) {
            const filePath = urlParts[1]
            await supabase.storage
              .from('learning-materials')
              .remove([filePath])
          }
        } catch (storageErr) {
          // Log but don't fail if storage deletion fails
          console.error('Error deleting file from storage:', storageErr)
        }
      }

      // Update local state
      setMaterials(prev => prev.filter(m => m.id !== id))
    } catch (err) {
      console.error('Error deleting material:', err)
      alert('Failed to delete document')
    } finally {
      setDeletingId(null)
    }
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection(field === 'title' ? 'asc' : 'desc')
    }
  }

  const sortOptions = [
    { value: 'created_at', label: 'Date Added' },
    { value: 'title', label: 'Name' },
    { value: 'file_size', label: 'File Size' },
    { value: 'linked_procedures_count', label: 'Linked Cases' },
    { value: 'category', label: 'Category' },
  ]

  const filteredAndSortedMaterials = useMemo(() => {
    const filtered = materials.filter(m => {
      const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.description?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (m.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
      
      const matchesCategory = !categoryFilter || categoryFilter === 'All Categories' || m.category === categoryFilter
      
      return matchesSearch && matchesCategory
    })

    return filtered.sort((a, b) => {
      let comparison = 0
      
      switch (sortField) {
        case 'title':
          comparison = a.title.localeCompare(b.title)
          break
        case 'created_at':
          comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          break
        case 'file_size':
          comparison = (a.file_size || 0) - (b.file_size || 0)
          break
        case 'linked_procedures_count':
          comparison = (a.linked_procedures_count || 0) - (b.linked_procedures_count || 0)
          break
        case 'category':
          comparison = (a.category || '').localeCompare(b.category || '')
          break
      }
      
      return sortDirection === 'asc' ? comparison : -comparison
    })
  }, [materials, searchQuery, categoryFilter, sortField, sortDirection])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Learning Library</h1>
          <p className="text-gray-600 mt-1">Upload and organize your medical learning materials</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center justify-center p-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setShowUploadForm(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Upload PDF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="sm:w-44">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="sm:w-44 flex gap-2">
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as SortField)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <button
              onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              title={sortDirection === 'asc' ? 'Ascending' : 'Descending'}
            >
              {sortDirection === 'asc' ? (
                <ArrowUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ArrowDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        {filteredAndSortedMaterials.length} document{filteredAndSortedMaterials.length !== 1 ? 's' : ''}
        {searchQuery || categoryFilter ? ' found' : ' in library'}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
        </div>
      ) : filteredAndSortedMaterials.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchQuery || categoryFilter ? 'No documents found' : 'No documents yet'}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || categoryFilter 
              ? 'Try adjusting your search or filters'
              : 'Upload your first PDF to get started'}
          </p>
          {!searchQuery && !categoryFilter && (
            <button
              onClick={() => setShowUploadForm(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Upload PDF
            </button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAndSortedMaterials.map(material => (
            <PDFCard
              key={material.id}
              material={material}
              onView={() => setViewingPDF(material)}
              onLink={() => setLinkingMaterial(material)}
              onDelete={() => handleDelete(material.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('title')}
                >
                  <div className="flex items-center gap-1">
                    Document
                    {sortField === 'title' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-gray-700 hidden sm:table-cell cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center gap-1">
                    Category
                    {sortField === 'category' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-gray-700 hidden md:table-cell cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('created_at')}
                >
                  <div className="flex items-center gap-1">
                    Date
                    {sortField === 'created_at' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-gray-700 hidden lg:table-cell cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('file_size')}
                >
                  <div className="flex items-center gap-1">
                    Size
                    {sortField === 'file_size' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-gray-700 hidden lg:table-cell cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('linked_procedures_count')}
                >
                  <div className="flex items-center gap-1">
                    Linked
                    {sortField === 'linked_procedures_count' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAndSortedMaterials.map(material => (
                <tr key={material.id} className="hover:bg-gray-50 group">
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setViewingPDF(material)}
                      className="flex items-center gap-3 text-left w-full"
                    >
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-200 transition-colors">
                        <FileText className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate hover:text-purple-600">{material.title}</p>
                        {material.description && (
                          <p className="text-sm text-gray-500 truncate">{material.description}</p>
                        )}
                      </div>
                    </button>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    {material.category && (
                      <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {material.category}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">
                    {new Date(material.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 hidden lg:table-cell">
                    {material.file_size ? formatFileSize(material.file_size) : '-'}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {material.is_linked_to_procedure && (
                      <span className="text-green-600 text-sm">
                        {material.linked_procedures_count} case{(material.linked_procedures_count || 0) !== 1 ? 's' : ''}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setViewingPDF(material)}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="View PDF"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setLinkingMaterial(material)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Link to case"
                      >
                        <Link2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(material.id)}
                        disabled={deletingId === material.id}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        {deletingId === material.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      {showUploadForm && (
        <PDFUploadForm
          environmentId={environmentId}
          onSuccess={() => {
            setShowUploadForm(false)
            fetchMaterials()
          }}
          onCancel={() => setShowUploadForm(false)}
        />
      )}

      {viewingPDF && (
        <PDFViewer
          url={viewingPDF.file_url}
          title={viewingPDF.title}
          onClose={() => setViewingPDF(null)}
        />
      )}

      {linkingMaterial && (
        <LinkPDFModal
          materialId={linkingMaterial.id}
          materialTitle={linkingMaterial.title}
          onClose={() => setLinkingMaterial(null)}
          onSuccess={() => {
            setLinkingMaterial(null)
            fetchMaterials()
          }}
        />
      )}
    </div>
  )
}
