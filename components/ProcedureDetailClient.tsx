'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import { format } from 'date-fns'
import { Calendar, Building2, Hash, User, ArrowLeft, Edit3, Trash2, Loader2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import ProcedureDocuments from './ProcedureDocuments'
import EditProcedureModal from './EditProcedureModal'

interface LearningMaterial {
  id: string
  title: string
  description: string | null
  file_url: string
  file_size: number | null
  category: string | null
  created_at: string
}

interface ProcedureDetailClientProps {
  procedure: {
    id: string
    procedure_name: string
    procedure_date: string
    ebir_category_id: string | null
    medical_centre_id: string | null
    accession_number: string | null
    operator_role: string | null
    notes: string | null
    image_url: string | null
    ebir_categories: { name: string; code: string } | null
    medical_centres: { name: string; city: string | null; country: string } | null
  }
  linkedDocuments: LearningMaterial[]
  categories: { id: string; name: string }[]
  medicalCentres: { id: string; name: string }[]
}

export default function ProcedureDetailClient({ 
  procedure: initialProcedure, 
  linkedDocuments,
  categories,
  medicalCentres
}: ProcedureDetailClientProps) {
  const router = useRouter()
  const supabase = createClient()
  
  const [procedure, setProcedure] = useState(initialProcedure)
  const [showEditModal, setShowEditModal] = useState(false)
  const [deleting, setDeleting] = useState(false)

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

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this case? This action cannot be undone.')) {
      return
    }

    setDeleting(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      // Delete linked documents first
      await supabase
        .from('procedure_learning_links')
        .delete()
        .eq('procedure_id', procedure.id)

      // Delete the procedure
      const { error } = await supabase
        .from('procedures')
        .delete()
        .eq('id', procedure.id)
        .eq('user_id', session.user.id)

      if (error) throw error

      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      console.error('Error deleting procedure:', err)
      alert('Failed to delete case')
    } finally {
      setDeleting(false)
    }
  }

  const handleEditSuccess = async () => {
    // Refetch the procedure data
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    const { data } = await supabase
      .from('procedures')
      .select(`
        *,
        ebir_categories (name, code),
        medical_centres (name, city, country)
      `)
      .eq('id', procedure.id)
      .eq('user_id', session.user.id)
      .single()

    if (data) {
      setProcedure(data)
    }
    setShowEditModal(false)
    router.refresh()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 lg:pb-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to procedures
          </Link>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{procedure.procedure_name}</h1>
          <p className="text-gray-600 mt-1">
            {format(new Date(procedure.procedure_date), 'EEEE, MMMM dd, yyyy')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setShowEditModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <Edit3 className="w-4 h-4" />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 px-4 py-2 text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-medium disabled:opacity-50"
          >
            {deleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">{deleting ? 'Deleting...' : 'Delete'}</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {procedure.image_url && (
          <div className="w-full h-64 sm:h-96 relative bg-gray-100">
            <Image
              src={procedure.image_url}
              alt={procedure.procedure_name}
              fill
              className="object-contain"
            />
          </div>
        )}

        <div className="p-6 space-y-6">
          <div className="flex flex-wrap gap-2">
            {procedure.ebir_categories && (
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(procedure.ebir_categories.code)}`}>
                {procedure.ebir_categories.name}
              </span>
            )}
            {procedure.operator_role && (
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleBadge(procedure.operator_role)}`}>
                {procedure.operator_role}
              </span>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium text-gray-900">
                  {format(new Date(procedure.procedure_date), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>

            {procedure.medical_centres && (
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Medical Centre</p>
                  <p className="font-medium text-gray-900 truncate">{procedure.medical_centres.name}</p>
                  {procedure.medical_centres.city && (
                    <p className="text-sm text-gray-500">
                      {procedure.medical_centres.city}
                    </p>
                  )}
                </div>
              </div>
            )}

            {procedure.accession_number && (
              <div className="flex items-start gap-3">
                <Hash className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Accession Number</p>
                  <p className="font-medium text-gray-900">{procedure.accession_number}</p>
                </div>
              </div>
            )}

            {procedure.operator_role && (
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Your Role</p>
                  <p className="font-medium text-gray-900">{procedure.operator_role}</p>
                </div>
              </div>
            )}
          </div>

          {procedure.notes && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Notes</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{procedure.notes}</p>
              </div>
            </div>
          )}

          {/* Linked Documents Section */}
          <ProcedureDocuments 
            procedureId={procedure.id} 
            initialDocuments={linkedDocuments} 
          />
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditProcedureModal
          procedure={procedure}
          categories={categories}
          medicalCentres={medicalCentres}
          onClose={() => setShowEditModal(false)}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  )
}
