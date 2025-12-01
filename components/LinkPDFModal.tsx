'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { X, Search, Link2, Check, Loader2, Calendar, FileText } from 'lucide-react'
import { format } from 'date-fns'

interface LinkPDFModalProps {
  materialId: string
  materialTitle: string
  onClose: () => void
  onSuccess: () => void
}

interface Procedure {
  id: string
  procedure_name: string
  procedure_date: string
  is_linked: boolean
}

export default function LinkPDFModal({ materialId, materialTitle, onClose, onSuccess }: LinkPDFModalProps) {
  const supabase = createClient()
  
  const [procedures, setProcedures] = useState<Procedure[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [selectedProcedures, setSelectedProcedures] = useState<Set<string>>(new Set())
  const [initialLinked, setInitialLinked] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchProcedures()
  }, [])

  const fetchProcedures = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      // Fetch all procedures
      const { data: proceduresData, error: proceduresError } = await supabase
        .from('procedures')
        .select('id, procedure_name, procedure_date')
        .eq('user_id', session.user.id)
        .order('procedure_date', { ascending: false })

      if (proceduresError) throw proceduresError

      // Fetch existing links for this material
      const { data: linksData, error: linksError } = await supabase
        .from('procedure_documents')
        .select('procedure_id')
        .eq('learning_material_id', materialId)

      if (linksError) throw linksError

      const linkedIds = new Set(linksData?.map(l => l.procedure_id) || [])
      setInitialLinked(linkedIds)
      setSelectedProcedures(linkedIds)

      const proceduresWithLinks = (proceduresData || []).map(p => ({
        ...p,
        is_linked: linkedIds.has(p.id)
      }))

      setProcedures(proceduresWithLinks)
    } catch (err: any) {
      console.error('Error fetching procedures:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const toggleProcedure = (procedureId: string) => {
    setSelectedProcedures(prev => {
      const newSet = new Set(prev)
      if (newSet.has(procedureId)) {
        newSet.delete(procedureId)
      } else {
        newSet.add(procedureId)
      }
      return newSet
    })
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)

    try {
      // Determine which links to add and remove
      const toAdd = [...selectedProcedures].filter(id => !initialLinked.has(id))
      const toRemove = [...initialLinked].filter(id => !selectedProcedures.has(id))

      // Remove unlinked procedures
      if (toRemove.length > 0) {
        const { error: deleteError } = await supabase
          .from('procedure_documents')
          .delete()
          .eq('learning_material_id', materialId)
          .in('procedure_id', toRemove)

        if (deleteError) throw deleteError
      }

      // Add new links
      if (toAdd.length > 0) {
        const newLinks = toAdd.map(procedureId => ({
          procedure_id: procedureId,
          learning_material_id: materialId
        }))

        const { error: insertError } = await supabase
          .from('procedure_documents')
          .insert(newLinks)

        if (insertError) throw insertError
      }

      // Update the learning material's is_linked_to_procedure flag
      const { error: updateError } = await supabase
        .from('learning_materials')
        .update({ is_linked_to_procedure: selectedProcedures.size > 0 })
        .eq('id', materialId)

      if (updateError) throw updateError

      onSuccess()
    } catch (err: any) {
      console.error('Error saving links:', err)
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const filteredProcedures = procedures.filter(p => 
    p.procedure_name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const hasChanges = () => {
    if (selectedProcedures.size !== initialLinked.size) return true
    for (const id of selectedProcedures) {
      if (!initialLinked.has(id)) return true
    }
    return false
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">Link to Cases</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <FileText className="w-4 h-4 text-red-500" />
            <span className="truncate">{materialTitle}</span>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search procedures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Procedure List */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
            </div>
          ) : filteredProcedures.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              {searchQuery ? 'No procedures match your search' : 'No procedures found'}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredProcedures.map((procedure) => {
                const isSelected = selectedProcedures.has(procedure.id)
                return (
                  <button
                    key={procedure.id}
                    onClick={() => toggleProcedure(procedure.id)}
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
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{procedure.procedure_name}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {format(new Date(procedure.procedure_date), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      {procedure.is_linked && !isSelected && (
                        <span className="text-xs text-gray-400">(was linked)</span>
                      )}
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
              {selectedProcedures.size} case{selectedProcedures.size !== 1 ? 's' : ''} selected
            </span>
            {hasChanges() && (
              <span className="text-xs text-amber-600 font-medium">Unsaved changes</span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={saving}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !hasChanges()}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Link2 className="w-4 h-4" />
                  Save Links
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
