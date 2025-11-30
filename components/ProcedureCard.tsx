import { format } from 'date-fns'
import { Calendar, Building2, Hash, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ProcedureCardProps {
  procedure: any
}

export default function ProcedureCard({ procedure }: ProcedureCardProps) {
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

  return (
    <Link
      href={`/dashboard/procedures/${procedure.id}`}
      className="block hover:bg-gray-50 transition-colors"
    >
      <div className="p-4">
        <div className="flex gap-4">
          {/* Image */}
          <div className="flex-shrink-0">
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
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 mb-1 truncate">
                  {procedure.procedure_name}
                </h3>
                {procedure.ebir_categories && (
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(procedure.ebir_categories.code)} truncate max-w-full`}>
                    {procedure.ebir_categories.name}
                  </span>
                )}
              </div>
              {procedure.operator_role && (
                <span className={`flex-shrink-0 px-2 py-1 rounded-full text-xs font-medium ${getRoleBadge(procedure.operator_role)}`}>
                  {procedure.operator_role}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
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
                <div className="flex items-center gap-1">
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
    </Link>
  )
}

function ClipboardList({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  )
}
