'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { X, Search, Link2, Check, Loader2, Calendar, Activity } from 'lucide-react'
import { format } from 'date-fns'

interface LinkToolModalProps {
  toolId: string
  toolName: string
  onClose: () => void
  onSuccess: () => void
}

interface Procedure {
  id: string
  procedure_name: string
  procedure_date: string
  is_linked: boolean
}

export default function LinkToolModal({ toolId, toolName, onClose, onSuccess }: LinkToolModalProps) {
  const supabase = createClient()
  
  const [procedures, setProcedures] = useState<Procedure[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProcedures, setSelectedProcedures] = useState<Set<string>>(new Set())
  const [initialLinked, setInitialLinked] = useState<Set<string>>(new Set())

  useEffect(() => {
    loadProcedures()
  }, [])

  const loadProcedures = async () => {
    try {
      // Get user's procedures
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: proceduresData } = await supabase
        .from('procedures')
        .select('id, procedure_name, procedure_date')
        .eq('user_id', user.id)
        .order('procedure_date', { ascending: false })
        .limit(100)

      // Get existing links
      const { data: linksData } = await supabase
        .from('procedure_tools')
        .select('procedure_id')
        .eq('tool_id', toolId)

      const linkedIds = new Set((linksData || []).map(l => l.procedure_id))
      setInitialLinked(linkedIds)
      setSelectedProcedures(linkedIds)

      const proceduresWithLinkStatus = (proceduresData || []).map(proc => ({
        ...proc,
        is_linked: linkedIds.has(proc.id)
      }))

      setProcedures(proceduresWithLinkStatus)
    } catch (err) {
      console.error('Failed to load procedures:', err)
    } finally {
      setLoading(false)
    }
  }

  const toggleProcedure = (procId: string) => {
    setSelectedProcedures(prev => {
      const newSet = new Set(prev)
      if (newSet.has(procId)) {
        newSet.delete(procId)
      } else {
        newSet.add(procId)
      }
      return newSet
    })
  }

  const handleSave = async () => {
    setSaving(true)
    
    try {
      // Find procedures to add and remove
      const toAdd = [...selectedProcedures].filter(id => !initialLinked.has(id))
      const toRemove = [...initialLinked].filter(id => !selectedProcedures.has(id))

      // Remove unlinked
      if (toRemove.length > 0) {
        await supabase
          .from('procedure_tools')
          .delete()
          .eq('tool_id', toolId)
          .in('procedure_id', toRemove)
      }

      // Add new links
      if (toAdd.length > 0) {
        const newLinks = toAdd.map(procId => ({
          procedure_id: procId,
          tool_id: toolId
        }))
        
        await supabase
          .from('procedure_tools')
          .insert(newLinks)
      }

      onSuccess()
    } catch (err) {
      console.error('Failed to save links:', err)
    } finally {
      setSaving(false)
    }
  }

  const filteredProcedures = procedures.filter(proc =>
    proc.procedure_name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const hasChanges = () => {
    if (selectedProcedures.size !== initialLinked.size) return true
    for (const id of selectedProcedures) {
      if (!initialLinked.has(id)) return true
    }
    return false
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Link Tool to Procedures</h2>
            <p className="text-sm text-gray-500">{toolName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search procedures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Procedures List */}
        <div className="flex-1 overflow-y-auto p-2">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          ) : filteredProcedures.length > 0 ? (
            <div className="space-y-1">
              {filteredProcedures.map(proc => (
                <button
                  key={proc.id}
                  onClick={() => toggleProcedure(proc.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    selectedProcedures.has(proc.id)
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                    selectedProcedures.has(proc.id)
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-300'
                  }`}>
                    {selectedProcedures.has(proc.id) && (
                      <Check className="w-3.5 h-3.5 text-white" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{proc.procedure_name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {format(new Date(proc.procedure_date), 'dd MMM yyyy')}
                    </div>
                  </div>
                  {initialLinked.has(proc.id) && selectedProcedures.has(proc.id) && (
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                      Linked
                    </span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              {searchQuery ? 'No procedures match your search' : 'No procedures found'}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
          <div className="text-sm text-gray-500">
            {selectedProcedures.size} procedure{selectedProcedures.size !== 1 ? 's' : ''} selected
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !hasChanges()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Links
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
