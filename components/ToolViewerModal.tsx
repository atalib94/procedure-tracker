'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import { 
  X, Edit, Trash2, Link2, Star, Package, 
  Building2, Hash, FileText, Settings, StickyNote, Loader2 
} from 'lucide-react'
import Image from 'next/image'

interface ToolCategory {
  id: string
  name: string
  code: string
  icon: string
}

interface Tool {
  id: string
  name: string
  manufacturer: string | null
  model_number: string | null
  description: string | null
  specifications: string | null
  notes: string | null
  image_url: string | null
  is_favorite: boolean
  category: ToolCategory | null
  linked_count: number
  created_at: string
}

interface ToolViewerModalProps {
  tool: Tool
  categories: ToolCategory[]
  onClose: () => void
  onEdit: () => void
  onDelete: () => void
  onLink: () => void
}

export default function ToolViewerModal({ 
  tool, 
  categories,
  onClose, 
  onEdit, 
  onDelete,
  onLink 
}: ToolViewerModalProps) {
  const supabase = createClient()
  
  const [deleting, setDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    
    try {
      // Delete image from storage if exists
      if (tool.image_url) {
        const path = tool.image_url.split('/tool-images/')[1]
        if (path) {
          await supabase.storage.from('tool-images').remove([path])
        }
      }

      // Delete tool from database
      const { error } = await supabase
        .from('tools')
        .delete()
        .eq('id', tool.id)

      if (error) throw error

      onDelete()
    } catch (err) {
      console.error('Failed to delete tool:', err)
      setDeleting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-900">{tool.name}</h2>
            {tool.is_favorite && (
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Image */}
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
              {tool.image_url && !imageError ? (
                <Image
                  src={tool.image_url}
                  alt={tool.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-contain"
                  onError={() => setImageError(true)}
                />
              ) : (
                <Package className="w-24 h-24 text-gray-300" />
              )}
            </div>

            {/* Details */}
            <div className="space-y-4">
              {/* Category */}
              {tool.category && (
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {tool.category.name}
                  </span>
                </div>
              )}

              {/* Manufacturer & Model */}
              {(tool.manufacturer || tool.model_number) && (
                <div className="space-y-2">
                  {tool.manufacturer && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">Manufacturer:</span>
                      <span>{tool.manufacturer}</span>
                    </div>
                  )}
                  {tool.model_number && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Hash className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">Model:</span>
                      <span>{tool.model_number}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Linked count */}
              <div className="flex items-center gap-2 text-gray-600">
                <Link2 className="w-4 h-4 text-gray-400" />
                <span className="font-medium">Linked to:</span>
                <span>{tool.linked_count} procedure{tool.linked_count !== 1 ? 's' : ''}</span>
              </div>

              {/* Description */}
              {tool.description && (
                <div>
                  <div className="flex items-center gap-2 text-gray-700 font-medium mb-1">
                    <FileText className="w-4 h-4 text-gray-400" />
                    Description
                  </div>
                  <p className="text-gray-600 whitespace-pre-wrap">{tool.description}</p>
                </div>
              )}

              {/* Specifications */}
              {tool.specifications && (
                <div>
                  <div className="flex items-center gap-2 text-gray-700 font-medium mb-1">
                    <Settings className="w-4 h-4 text-gray-400" />
                    Specifications
                  </div>
                  <p className="text-gray-600 whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded-lg">
                    {tool.specifications}
                  </p>
                </div>
              )}

              {/* Notes */}
              {tool.notes && (
                <div>
                  <div className="flex items-center gap-2 text-gray-700 font-medium mb-1">
                    <StickyNote className="w-4 h-4 text-gray-400" />
                    Personal Notes
                  </div>
                  <p className="text-gray-600 whitespace-pre-wrap text-sm bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    {tool.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onLink}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Link2 className="w-4 h-4" />
              Link to Procedure
            </button>
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit Tool
            </button>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 max-w-md mx-4 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Tool?</h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete "{tool.name}"? This will also remove all links to procedures. This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {deleting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
