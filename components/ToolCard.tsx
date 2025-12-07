'use client'

import { Star, Eye, Link2, Edit, Package } from 'lucide-react'
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
  image_url: string | null
  is_favorite: boolean
  category: ToolCategory | null
  linked_count: number
  created_at: string
}

interface ToolCardProps {
  tool: Tool
  viewMode: 'grid' | 'list'
  onView: () => void
  onLink: () => void
  onEdit: () => void
  onToggleFavorite: () => void
}

export default function ToolCard({ 
  tool, 
  viewMode, 
  onView, 
  onLink, 
  onEdit,
  onToggleFavorite 
}: ToolCardProps) {
  
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          {/* Image/Icon */}
          <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            {tool.image_url ? (
              <Image
                src={tool.image_url}
                alt={tool.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <Package className="w-8 h-8 text-gray-400" />
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-900 truncate">{tool.name}</h3>
              {tool.is_favorite && (
                <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
              {tool.manufacturer && (
                <span>{tool.manufacturer}</span>
              )}
              {tool.model_number && (
                <span className="text-gray-400">• {tool.model_number}</span>
              )}
              {tool.category && (
                <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                  {tool.category.name}
                </span>
              )}
            </div>
            {tool.description && (
              <p className="text-sm text-gray-500 mt-1 line-clamp-1">{tool.description}</p>
            )}
          </div>

          {/* Linked count */}
          <div className="text-center px-4">
            <div className="text-lg font-semibold text-gray-900">{tool.linked_count}</div>
            <div className="text-xs text-gray-500">linked</div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
              className={`p-2 rounded-lg transition-colors ${
                tool.is_favorite 
                  ? 'text-yellow-500 hover:bg-yellow-50' 
                  : 'text-gray-400 hover:bg-gray-100 hover:text-yellow-500'
              }`}
              title={tool.is_favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star className={`w-5 h-5 ${tool.is_favorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onView}
              className="p-2 text-gray-400 hover:bg-gray-100 hover:text-blue-600 rounded-lg transition-colors"
              title="View details"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={onLink}
              className="p-2 text-gray-400 hover:bg-gray-100 hover:text-green-600 rounded-lg transition-colors"
              title="Link to procedure"
            >
              <Link2 className="w-5 h-5" />
            </button>
            <button
              onClick={onEdit}
              className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-lg transition-colors"
              title="Edit tool"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Grid view
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
      {/* Image */}
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        {tool.image_url ? (
          <Image
            src={tool.image_url}
            alt={tool.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300" />
          </div>
        )}
        
        {/* Favorite button overlay */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
          className={`absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-1.5 sm:p-2 rounded-full transition-colors ${
            tool.is_favorite 
              ? 'bg-yellow-100 text-yellow-500' 
              : 'bg-white/80 text-gray-400 hover:text-yellow-500'
          }`}
        >
          <Star className={`w-4 h-4 sm:w-5 sm:h-5 ${tool.is_favorite ? 'fill-current' : ''}`} />
        </button>

        {/* Category badge */}
        {tool.category && (
          <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 px-1.5 py-0.5 sm:px-2 sm:py-1 bg-white/90 rounded text-[10px] sm:text-xs font-medium text-gray-700">
            {tool.category.name}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-2.5 sm:p-4">
        <h3 className="font-medium text-gray-900 truncate text-sm sm:text-base" title={tool.name}>
          {tool.name}
        </h3>
        
        {(tool.manufacturer || tool.model_number) && (
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 truncate">
            {tool.manufacturer}
            {tool.manufacturer && tool.model_number && ' • '}
            {tool.model_number}
          </p>
        )}

        {/* Linked count */}
        {tool.linked_count > 0 && (
          <div className="mt-1.5 sm:mt-2 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] sm:text-xs">
              <Link2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              {tool.linked_count} procedure{tool.linked_count !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="px-2.5 pb-2.5 sm:px-4 sm:pb-4 flex gap-1.5 sm:gap-2">
        <button
          onClick={onView}
          className="flex-1 px-2 py-1.5 sm:px-3 sm:py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
        >
          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          View
        </button>
        <button
          onClick={onLink}
          className="flex-1 px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 text-gray-700 text-xs sm:text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-1"
        >
          <Link2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Link
        </button>
      </div>
    </div>
  )
}
