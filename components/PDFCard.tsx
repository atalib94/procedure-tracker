'use client'

import { useState, useEffect, useRef } from 'react'
import { FileText, Eye, Download, ExternalLink, Link2, Trash2, MoreVertical, Calendar, Tag, Loader2 } from 'lucide-react'
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
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)
  const [thumbnailLoading, setThumbnailLoading] = useState(true)
  const [thumbnailError, setThumbnailError] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let cancelled = false
    
    const generateThumbnail = async () => {
      try {
        setThumbnailLoading(true)
        setThumbnailError(false)
        
        // Dynamically import pdf.js
        const pdfjsLib = await import('pdfjs-dist')
        
        // Set worker source
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
        
        // Load the PDF
        const loadingTask = pdfjsLib.getDocument(material.file_url)
        const pdf = await loadingTask.promise
        
        if (cancelled) return
        
        // Get first page
        const page = await pdf.getPage(1)
        
        if (cancelled) return
        
        // Set up canvas for thumbnail
        const scale = 0.5
        const viewport = page.getViewport({ scale })
        
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        
        if (!context) {
          throw new Error('Could not get canvas context')
        }
        
        canvas.height = viewport.height
        canvas.width = viewport.width
        
        // Render page to canvas
        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise
        
        if (cancelled) return
        
        // Convert to data URL
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
        setThumbnailUrl(dataUrl)
        setThumbnailLoading(false)
      } catch (err) {
        console.error('Error generating PDF thumbnail:', err)
        if (!cancelled) {
          setThumbnailError(true)
          setThumbnailLoading(false)
        }
      }
    }
    
    generateThumbnail()
    
    return () => {
      cancelled = true
    }
  }, [material.file_url])

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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden">
      {/* Preview Area */}
      <div 
        className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center cursor-pointer relative group overflow-hidden"
        onClick={onView}
      >
        {thumbnailLoading ? (
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-2" />
            <span className="text-xs text-gray-500">Loading preview...</span>
          </div>
        ) : thumbnailUrl && !thumbnailError ? (
          <img 
            src={thumbnailUrl} 
            alt={material.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center mx-auto mb-2">
              <FileText className="w-8 h-8 text-red-500" />
            </div>
            <span className="text-xs font-medium text-red-600 bg-white/80 px-2 py-1 rounded">
              PDF Document
            </span>
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white font-medium flex items-center gap-2">
            <Eye className="w-5 h-5" />
            View PDF
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">{material.title}</h3>
          
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

        {material.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{material.description}</p>
        )}

        {/* Meta Info */}
        <div className="space-y-2 text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
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
              <Tag className="w-3.5 h-3.5 text-gray-400" />
              {material.tags.slice(0, 3).map((tag, i) => (
                <span key={i} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
              {material.tags.length > 3 && (
                <span className="text-gray-500">+{material.tags.length - 3}</span>
              )}
            </div>
          )}
        </div>

        {/* Linked Indicator */}
        {material.is_linked_to_procedure && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs text-green-600 flex items-center gap-1">
              <Link2 className="w-3.5 h-3.5" />
              Linked to {material.linked_procedures_count || 0} case{(material.linked_procedures_count || 0) !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-4 flex gap-2">
        <button
          onClick={onView}
          className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5"
        >
          <Eye className="w-4 h-4" />
          View
        </button>
        <button
          onClick={onLink}
          className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
        >
          <Link2 className="w-4 h-4" />
          Link
        </button>
      </div>
    </div>
  )
}
