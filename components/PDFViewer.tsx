'use client'

import { useState } from 'react'
import { X, ZoomIn, ZoomOut, Download, ExternalLink, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

interface PDFViewerProps {
  url: string
  title: string
  onClose: () => void
}

export default function PDFViewer({ url, title, onClose }: PDFViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = url
    link.download = title + '.pdf'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleOpenExternal = () => {
    window.open(url, '_blank')
  }

  return (
    <div className={`fixed inset-0 z-50 bg-black/80 flex items-center justify-center ${isFullscreen ? '' : 'p-4'}`}>
      <div className={`bg-white rounded-xl shadow-2xl flex flex-col ${isFullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-5xl h-[90vh]'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
              </svg>
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-gray-900 truncate">{title}</h2>
              <p className="text-sm text-gray-500">PDF Document</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
              title="Download PDF"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={handleOpenExternal}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
              title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Content */}
        <div className="flex-1 overflow-hidden bg-gray-100">
          <iframe
            src={`${url}#toolbar=1&navpanes=1&scrollbar=1`}
            className="w-full h-full"
            title={title}
          />
        </div>
      </div>
    </div>
  )
}
