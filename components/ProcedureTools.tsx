'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { Wrench, Plus, X, Loader2, Package, Search, Check } from 'lucide-react'
import Image from 'next/image'

interface Tool {
  id: string
  name: string
  manufacturer: string | null
  model_number: string | null
  image_url: string | null
  category: {
    id: string
    name: string
  } | null
}

interface ProcedureTool {
  id: string
  tool_id: string
  quantity: number
  notes: string | null
  tool: Tool
}

interface ProcedureToolsProps {
  procedureId: string
}

export default function ProcedureTools({ procedureId }: ProcedureToolsProps) {
  const supabase = createClient()
  
  const [procedureTools, setProcedureTools] = useState<ProcedureTool[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    loadProcedureTools()
  }, [procedureId])

  const loadProcedureTools = async () => {
    try {
      const { data, error } = await supabase
        .from('procedure_tools')
        .select(`
          id,
          tool_id,
          quantity,
          notes,
          tool:tools(
            id,
            name,
            manufacturer,
            model_number,
            image_url,
            category:tool_categories(id, name)
          )
        `)
        .eq('procedure_id', procedureId)

      if (error) throw error
      
      // Type cast the data properly
      const typedData = (data || []).map(item => ({
        ...item,
        tool: item.tool as unknown as Tool
      }))
      
      setProcedureTools(typedData)
    } catch (err) {
      console.error('Failed to load procedure tools:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleUnlink = async (procedureToolId: string) => {
    try {
      await supabase
        .from('procedure_tools')
        .delete()
        .eq('id', procedureToolId)

      setProcedureTools(prev => prev.filter(pt => pt.id !== procedureToolId))
    } catch (err) {
      console.error('Failed to unlink tool:', err)
    }
  }

  const handleToolLinked = () => {
    loadProcedureTools()
    setShowAddModal(false)
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
        <div className="flex items-center gap-2">
          <Wrench className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Tools Used</h3>
          <span className="text-sm text-gray-500">({procedureTools.length})</span>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Tool
        </button>
      </div>

      {/* Tools List */}
      {procedureTools.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {procedureTools.map(pt => (
            <div key={pt.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50">
              {/* Tool Image */}
              <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                {pt.tool.image_url ? (
                  <Image
                    src={pt.tool.image_url}
                    alt={pt.tool.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Package className="w-6 h-6 text-gray-400" />
                )}
              </div>

              {/* Tool Info */}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900">{pt.tool.name}</div>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  {pt.tool.manufacturer && <span>{pt.tool.manufacturer}</span>}
                  {pt.tool.model_number && <span>• {pt.tool.model_number}</span>}
                  {pt.tool.category && (
                    <span className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">
                      {pt.tool.category.name}
                    </span>
                  )}
                </div>
                {pt.notes && (
                  <p className="text-sm text-gray-500 mt-1">{pt.notes}</p>
                )}
              </div>

              {/* Quantity if > 1 */}
              {pt.quantity > 1 && (
                <div className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                  x{pt.quantity}
                </div>
              )}

              {/* Remove button */}
              <button
                onClick={() => handleUnlink(pt.id)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove tool"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Package className="w-10 h-10 text-gray-300 mx-auto mb-2" />
          <p>No tools linked to this procedure</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-2 text-sm text-blue-600 hover:text-blue-700"
          >
            Add a tool
          </button>
        </div>
      )}

      {/* Add Tool Modal */}
      {showAddModal && (
        <AddToolToProcedureModal
          procedureId={procedureId}
          existingToolIds={procedureTools.map(pt => pt.tool_id)}
          onClose={() => setShowAddModal(false)}
          onSuccess={handleToolLinked}
        />
      )}
    </div>
  )
}

// Sub-component: Add Tool to Procedure Modal
interface AddToolToProcedureModalProps {
  procedureId: string
  existingToolIds: string[]
  onClose: () => void
  onSuccess: () => void
}

function AddToolToProcedureModal({ 
  procedureId, 
  existingToolIds, 
  onClose, 
  onSuccess 
}: AddToolToProcedureModalProps) {
  const supabase = createClient()
  
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null)

  useEffect(() => {
    loadTools()
  }, [])

  const loadTools = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('tools')
        .select(`
          id,
          name,
          manufacturer,
          model_number,
          image_url,
          category:tool_categories(id, name)
        `)
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('name')

      // Filter out already linked tools
      const availableTools = (data || []).filter(
        tool => !existingToolIds.includes(tool.id)
      )
      
      setTools(availableTools as unknown as Tool[])
    } catch (err) {
      console.error('Failed to load tools:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async () => {
    if (!selectedToolId) return
    
    setSaving(true)
    try {
      await supabase
        .from('procedure_tools')
        .insert({
          procedure_id: procedureId,
          tool_id: selectedToolId
        })

      onSuccess()
    } catch (err) {
      console.error('Failed to link tool:', err)
    } finally {
      setSaving(false)
    }
  }

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.manufacturer?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[70vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Add Tool</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
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
              placeholder="Search your tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Tools List */}
        <div className="flex-1 overflow-y-auto p-2">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
            </div>
          ) : filteredTools.length > 0 ? (
            <div className="space-y-1">
              {filteredTools.map(tool => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedToolId(tool.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    selectedToolId === tool.id
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    {tool.image_url ? (
                      <Image
                        src={tool.image_url}
                        alt={tool.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Package className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900">{tool.name}</div>
                    {tool.manufacturer && (
                      <div className="text-sm text-gray-500">{tool.manufacturer}</div>
                    )}
                  </div>
                  {selectedToolId === tool.id && (
                    <Check className="w-5 h-5 text-blue-600" />
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              {searchQuery ? 'No tools match your search' : 'No tools available'}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!selectedToolId || saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Add Tool
          </button>
        </div>
      </div>
    </div>
  )
}
