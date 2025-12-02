'use client'

import { useState } from 'react'
import { FileText, Eye, Download, ExternalLink, Link2, Trash2, MoreVertical, Calendar, Tag } from 'lucide-react'
import { format } from 'date-fns'

interface PDFCardProps {
  material: {
    id: string
    title: string
    description: string | null
    file_url: string
    file_size: number | null
    category: string | null
    tags: string[] | null
    created_at: string
    is_linked_to_procedure: boolean
    linked_procedures_count?: number
  }
  onView: () => void
  onLink: () => void
  onDelete: () => void
}

export default function PDFCard({ material, onView, onLink, onDelete }: PDFCardProps) {
  const [showMenu, setShowMenu] = useState(false)

  const formatFileSize = (bytes: number | null): string => {
    if (!bytes) return 'Unknown size'
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = material.file_url
    link.download = material.title + '.pdf'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setShowMenu(false)
  }

  const handleOpenExternal = () => {
    window.open(material.file_url, '_blank')
    setShowMenu(false)
  }

  // Generate a color based on the title for visual variety
  const getCardColor = () => {
    const colors = [
      'from-red-50 to-red-100',
      'from-purple-50 to-purple-100', 
      'from-green-50 to-green-100',
      'from-purple-50 to-purple-100',
      'from-amber-50 to-amber-100',
      'from-cyan-50 to-cyan-100',
      'from-pink-50 to-pink-100',
      'from-indigo-50 to-indigo-100',
    ]
    const iconColors = [
      'text-red-500',
      'text-purple-500',
      'text-green-500', 
      'text-purple-500',
      'text-amber-500',
      'text-cyan-500',
      'text-pink-500',
      'text-indigo-500',
    ]
    const hash = material.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const index = hash % colors.length
    return { bg: colors[index], icon: iconColors[index] }
  }

  const cardColor = getCardColor()

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden">
      {/* Preview Area */}
      <div 
        className={`h-36 bg-gradient-to-br ${cardColor.bg} flex items-center justify-center cursor-pointer relative group`}
        onClick={onView}
      >
        <div className="text-center">
          <div className="w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center mx-auto mb-2">
            <FileText className={`w-7 h-7 ${cardColor.icon}`} />
          </div>
          <span className={`text-xs font-medium ${cardColor.icon} bg-white/80 px-2 py-1 rounded`}>
            PDF
          </span>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white font-medium flex items-center gap-2">
            <Eye className="w-5 h-5" />
            View PDF
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1 text-sm">{material.title}</h3>
          
          {/* Menu Button */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowMenu(false)} 
                />
                <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 min-w-[160px]">
                  <button
                    onClick={() => { onView(); setShowMenu(false); }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View PDF
                  </button>
                  <button
                    onClick={handleDownload}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={handleOpenExternal}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open in new tab
                  </button>
                  <button
                    onClick={() => { onLink(); setShowMenu(false); }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Link2 className="w-4 h-4" />
                    Link to case
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={() => { onDelete(); setShowMenu(false); }}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Meta Info */}
        <div className="space-y-1.5 text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {format(new Date(material.created_at), 'MMM dd, yyyy')}
            </span>
            <span>{formatFileSize(material.file_size)}</span>
          </div>

          {material.category && (
            <span className="inline-block bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
              {material.category}
            </span>
          )}

          {material.tags && material.tags.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap">
              <Tag className="w-3 h-3 text-gray-400" />
              {material.tags.slice(0, 2).map((tag, i) => (
                <span key={i} className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded-full text-xs">
                  {tag}
                </span>
              ))}
              {material.tags.length > 2 && (
                <span className="text-gray-500">+{material.tags.length - 2}</span>
              )}
            </div>
          )}
        </div>

        {/* Linked Indicator */}
        {material.is_linked_to_procedure && (
          <div className="mt-2 pt-2 border-t border-gray-100">
            <span className="text-xs text-green-600 flex items-center gap-1">
              <Link2 className="w-3 h-3" />
              Linked to {material.linked_procedures_count || 0} case{(material.linked_procedures_count || 0) !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="px-3 pb-3 flex gap-2">
        <button
          onClick={onView}
          className="flex-1 px-3 py-1.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-1.5"
        >
          <Eye className="w-4 h-4" />
          View
        </button>
        <button
          onClick={onLink}
          className="flex-1 px-3 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
        >
          <Link2 className="w-4 h-4" />
          Link
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1.5 border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center"
          title="Delete PDF"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
