'use client'

import { FileText, Eye, Link2, Trash2, Calendar, HardDrive, Tag } from 'lucide-react'
import { format } from 'date-fns'

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

interface PDFCardProps {
  material: LearningMaterial
  onView: () => void
  onLink: () => void
  onDelete: () => void
}

function formatFileSize(bytes: number | null): string {
  if (!bytes) return 'Unknown size'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function getCategoryColor(category: string | null): string {
  const colors: Record<string, string> = {
    'Anatomy': 'bg-blue-100 text-blue-700',
    'Technique': 'bg-green-100 text-green-700',
    'Case Study': 'bg-purple-100 text-purple-700',
    'Guidelines': 'bg-orange-100 text-orange-700',
    'Research': 'bg-pink-100 text-pink-700',
    'Protocol': 'bg-cyan-100 text-cyan-700',
    'Reference': 'bg-yellow-100 text-yellow-700',
    'Other': 'bg-gray-100 text-gray-700',
  }
  return colors[category || ''] || 'bg-gray-100 text-gray-700'
}

export default function PDFCard({ material, onView, onLink, onDelete }: PDFCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header with icon */}
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate" title={material.title}>
              {material.title}
            </h3>
            {material.category && (
              <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mt-1 ${getCategoryColor(material.category)}`}>
                {material.category}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {material.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{material.description}</p>
        )}

        {/* Meta info */}
        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {format(new Date(material.created_at), 'MMM d, yyyy')}
          </div>
          <div className="flex items-center gap-1">
            <HardDrive className="w-3.5 h-3.5" />
            {formatFileSize(material.file_size)}
          </div>
          {material.linked_procedures_count !== undefined && material.linked_procedures_count > 0 && (
            <div className="flex items-center gap-1 text-blue-600">
              <Link2 className="w-3.5 h-3.5" />
              {material.linked_procedures_count} linked
            </div>
          )}
        </div>

        {/* Tags */}
        {material.tags && material.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {material.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
            {material.tags.length > 3 && (
              <span className="text-xs text-gray-400">+{material.tags.length - 3} more</span>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-2">
        <button
          onClick={onView}
          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="View PDF"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          onClick={onLink}
          className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          title="Link to procedure"
        >
          <Link2 className="w-4 h-4" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
