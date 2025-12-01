'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { FileText, Eye, Download, ExternalLink, Link2, Plus, X, Loader2, Search, Check } from 'lucide-react'
import { format } from 'date-fns'
import PDFViewer from './PDFViewer'

interface LearningMaterial {
  id: string
  title: string
  description: string | null
  file_url: string
  file_size: number | null
  category: string | null
  created_at: string
}

interface ProcedureDocumentsProps {
  procedureId: string
  initialDocuments: LearningMaterial[]
}

export default function ProcedureDocuments({ procedureId, initialDocuments }: ProcedureDocumentsProps) {
  const supabase = createClient()
  
  const [documents, setDocuments] = useState<LearningMaterial[]>(initialDocuments)
  const [viewingPDF, setViewingPDF] = useState<LearningMaterial | null>(null)
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [availableMaterials, setAvailableMaterials] = useState<LearningMaterial[]>([])
  const [loadingMaterials, setLoadingMaterials] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [saving, setSaving] = useState(false)
  const [unlinkingId, setUnlinkingId] = useState<string | null>(null)

  const formatFileSize = (bytes: number | null): string => {
    if (!bytes) return ''
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const fetchAvailableMaterials = async () => {
    setLoadingMaterials(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      // Get all materials not currently linked to this procedure
      const linkedIds = documents.map(d => d.id)
      
      const { data, error } = await supabase
        .from('learning_materials')
        .select('id, title, description, file_url, file_size, category, created_at')
        .eq('user_id', session.user.id)
        .eq('file_type', 'pdf')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Filter out already linked materials
      const available = (data || []).filter(m => !linkedIds.includes(m.id))
      setAvailableMaterials(available)
    } catch (err) {
      console.error('Error fetching materials:', err)
    } finally {
      setLoadingMaterials(false)
    }
  }

  const handleOpenLinkModal = () => {
    setShowLinkModal(true)
    setSelectedIds(new Set())
    setSearchQuery('')
    fetchAvailableMaterials()
  }

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleLinkSelected = async () => {
    if (selectedIds.size === 0) return
    
    setSaving(true)
    try {
      const newLinks = [...selectedIds].map(materialId => ({
        procedure_id: procedureId,
        learning_material_id: materialId
      }))

      const { error: insertError } = await supabase
        .from('procedure_documents')
        .insert(newLinks)

      if (insertError) throw insertError

      // Update is_linked_to_procedure flag
      await supabase
        .from('learning_materials')
        .update({ is_linked_to_procedure: true })
        .in('id', [...selectedIds])

      // Refresh documents list
      const { data: linkedDocs } = await supabase
        .from('procedure_documents')
        .select(`
          learning_material_id,
          learning_materials (
            id, title, description, file_url, file_size, category, created_at
          )
        `)
        .eq('procedure_id', procedureId)

      const newDocuments = linkedDocs?.map(link => link.learning_materials as unknown as LearningMaterial) || []
      setDocuments(newDocuments)
      setShowLinkModal(false)
    } catch (err) {
      console.error('Error linking documents:', err)
      alert('Failed to link documents')
    } finally {
      setSaving(false)
    }
  }

  const handleUnlink = async (materialId: string) => {
    if (!confirm('Remove this document from this case?')) return
    
    setUnlinkingId(materialId)
    try {
      const { error } = await supabase
        .from('procedure_documents')
        .delete()
        .eq('procedure_id', procedureId)
        .eq('learning_material_id', materialId)

      if (error) throw error

      // Check if material is still linked to any procedure
      const { count } = await supabase
        .from('procedure_documents')
        .select('*', { count: 'exact', head: true })
        .eq('learning_material_id', materialId)

      // Update is_linked flag if no more links
      if (count === 0) {
        await supabase
          .from('learning_materials')
          .update({ is_linked_to_procedure: false })
          .eq('id', materialId)
      }

      // Update local state
      setDocuments(prev => prev.filter(d => d.id !== materialId))
    } catch (err) {
      console.error('Error unlinking document:', err)
      alert('Failed to unlink document')
    } finally {
      setUnlinkingId(null)
    }
  }

  const filteredMaterials = availableMaterials.filter(m =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (m.description?.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Linked Documents</h2>
        <button
          onClick={handleOpenLinkModal}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Link PDF
        </button>
      </div>

      {documents.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No documents linked to this case</p>
          <button
            onClick={handleOpenLinkModal}
            className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Link your first document
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map(doc => (
            <div
              key={doc.id}
              className="bg-gray-50 rounded-lg p-4 flex items-center gap-4 hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-red-600" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{doc.title}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                  {doc.category && <span>{doc.category}</span>}
                  {doc.file_size && <span>{formatFileSize(doc.file_size)}</span>}
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setViewingPDF(doc)}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="View PDF"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <a
                  href={doc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => handleUnlink(doc.id)}
                  disabled={unlinkingId === doc.id}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  title="Unlink document"
                >
                  {unlinkingId === doc.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <X className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900">Link Documents</h3>
                <button
                  onClick={() => setShowLinkModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {loadingMaterials ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                </div>
              ) : filteredMaterials.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  {availableMaterials.length === 0 
                    ? 'No documents available. Upload PDFs in the Library first.'
                    : 'No documents match your search'}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredMaterials.map(material => {
                    const isSelected = selectedIds.has(material.id)
                    return (
                      <button
                        key={material.id}
                        onClick={() => toggleSelection(material.id)}
                        className={`w-full p-3 rounded-lg border text-left transition-all ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                            isSelected ? 'bg-blue-600' : 'border-2 border-gray-300'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center flex-shrink-0">
                            <FileText className="w-4 h-4 text-red-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">{material.title}</p>
                            <p className="text-xs text-gray-500">
                              {material.category && `${material.category} • `}
                              {format(new Date(material.created_at), 'MMM dd, yyyy')}
                            </p>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">
                  {selectedIds.size} document{selectedIds.size !== 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLinkModal(false)}
                  disabled={saving}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLinkSelected}
                  disabled={saving || selectedIds.size === 0}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Linking...
                    </>
                  ) : (
                    <>
                      <Link2 className="w-4 h-4" />
                      Link Selected
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PDF Viewer */}
      {viewingPDF && (
        <PDFViewer
          url={viewingPDF.file_url}
          title={viewingPDF.title}
          onClose={() => setViewingPDF(null)}
        />
      )}
    </div>
  )
}
