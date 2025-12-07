'use client'

import { format } from 'date-fns'
import { Calendar, Building2, Hash, Archive, ArchiveRestore, Loader2, AlertTriangle, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface ProcedureCardProps {
  procedure: any
  onArchiveToggle?: (id: string, archived: boolean) => Promise<void>
  showArchiveButton?: boolean
  isSelectionMode?: boolean
  isSelected?: boolean
  onToggleSelect?: () => void
}

export default function ProcedureCard({ 
  procedure, 
  onArchiveToggle, 
  showArchiveButton = true,
  isSelectionMode = false,
  isSelected = false,
  onToggleSelect
}: ProcedureCardProps) {
  const [isArchiving, setIsArchiving] = useState(false)

  const getCategoryColor = (code: string) => {
    const colors: { [key: string]: string } = {
      'vascular_access': 'bg-blue-100 text-blue-800',
      'angiography_vascular': 'bg-green-100 text-green-800',
      'neurointervention': 'bg-purple-100 text-purple-800',
      'non_vascular': 'bg-orange-100 text-orange-800',
      'oncologic': 'bg-red-100 text-red-800',
      'hepatobiliary': 'bg-yellow-100 text-yellow-800',
      'genitourinary': 'bg-indigo-100 text-indigo-800',
      'gastrointestinal': 'bg-pink-100 text-pink-800',
      'thoracic': 'bg-cyan-100 text-cyan-800',
      'musculoskeletal': 'bg-teal-100 text-teal-800',
      'womens_health': 'bg-rose-100 text-rose-800',
      'pediatric': 'bg-amber-100 text-amber-800',
      'biopsy': 'bg-lime-100 text-lime-800',
      'drainage': 'bg-emerald-100 text-emerald-800',
    }
    return colors[code] || 'bg-gray-100 text-gray-800'
  }

  const getRoleBadge = (role: string) => {
    if (role === '1st Operator') return 'bg-green-100 text-green-800'
    if (role === '2nd Operator') return 'bg-blue-100 text-blue-800'
    return 'bg-gray-100 text-gray-800'
  }

  const handleArchiveClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!onArchiveToggle || isArchiving) return
    
    setIsArchiving(true)
    try {
      await onArchiveToggle(procedure.id, !procedure.archived)
    } finally {
      setIsArchiving(false)
    }
  }

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onToggleSelect?.()
  }

  const handleCardClick = (e: React.MouseEvent) => {
    if (isSelectionMode) {
      e.preventDefault()
      onToggleSelect?.()
    }
  }

  const cardContent = (
    <div className={`p-4 ${isSelectionMode ? 'cursor-pointer' : ''}`} onClick={handleCardClick}>
      <div className="flex gap-4">
        {/* Checkbox for selection mode */}
        {isSelectionMode && (
          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={handleCheckboxClick}
              className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                isSelected 
                  ? 'bg-purple-600 border-purple-600 text-white' 
                  : 'border-gray-300 hover:border-purple-400'
              }`}
            >
              {isSelected && <Check className="w-4 h-4" />}
            </button>
          </div>
        )}

        {/* Image */}
        <div className="flex-shrink-0 relative">
          {procedure.image_url ? (
            <Image
              src={procedure.image_url}
              alt={procedure.procedure_name}
              width={80}
              height={80}
              className="w-20 h-20 object-cover rounded-lg"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
              <ClipboardList className="w-8 h-8 text-gray-400" />
            </div>
          )}
          {procedure.archived && (
            <div className="absolute inset-0 bg-gray-900/20 rounded-lg flex items-center justify-center">
              <Archive className="w-6 h-6 text-gray-600" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-gray-900 truncate">
                  {procedure.procedure_name}
                </h3>
                {procedure.is_complicated && (
                  <span className="flex-shrink-0 p-1 bg-amber-100 text-amber-600 rounded" title="Complicated case">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {procedure.ebir_categories && (
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(procedure.ebir_categories.code)}`}>
                    {procedure.ebir_categories.name}
                  </span>
                )}
                {procedure.operator_role && (
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadge(procedure.operator_role)}`}>
                    {procedure.operator_role}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{format(new Date(procedure.procedure_date), 'MMM dd, yyyy')}</span>
            </div>
            {procedure.medical_centres && (
              <div className="flex items-center gap-1 min-w-0">
                <Building2 className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{procedure.medical_centres.name}</span>
              </div>
            )}
            {procedure.accession_number && (
              <div className="flex items-center gap-1" title="Case ID">
                <Hash className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{procedure.accession_number}</span>
              </div>
            )}
          </div>

          {procedure.notes && (
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {procedure.notes}
            </p>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className={`relative group ${procedure.archived ? 'opacity-75' : ''} ${isSelected ? 'bg-purple-50' : ''}`}>
      {isSelectionMode ? (
        <div className="block hover:bg-gray-50 transition-colors">
          {cardContent}
        </div>
      ) : (
        <Link
          href={`/dashboard/procedures/${procedure.id}`}
          className="block hover:bg-gray-50 transition-colors"
        >
          {cardContent}
        </Link>
      )}

      {/* Archive Button - only show when not in selection mode */}
      {showArchiveButton && onArchiveToggle && !isSelectionMode && (
        <button
          onClick={handleArchiveClick}
          disabled={isArchiving}
          className={`absolute top-4 right-4 p-2 rounded-lg transition-all ${
            procedure.archived
              ? 'bg-green-100 text-green-600 hover:bg-green-200 opacity-100'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200 opacity-0 group-hover:opacity-100'
          } disabled:opacity-50`}
          title={procedure.archived ? 'Restore from archive' : 'Archive procedure'}
        >
          {isArchiving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : procedure.archived ? (
            <ArchiveRestore className="w-4 h-4" />
          ) : (
            <Archive className="w-4 h-4" />
          )}
        </button>
      )}
    </div>
  )
}

function ClipboardList({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  )
}
