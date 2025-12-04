'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import { format } from 'date-fns'
import { Calendar, Building2, Hash, User, ArrowLeft, Edit3, Trash2, Loader2, ImageIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import ProcedureDocuments from './ProcedureDocuments'
import ProcedureTools from './ProcedureTools'
import EditProcedureModal from './EditProcedureModal'
import ImageGallery from './ImageGallery'

interface LearningMaterial {
  id: string
  title: string
  description: string | null
  file_url: string
  file_size: number | null
  category: string | null
  created_at: string
}

interface LinkedTool {
  id: string
  tool_id: string
  quantity: number
  notes: string | null
  tools: {
    id: string
    name: string
    manufacturer: string | null
    model_number: string | null
    image_url: string | null
    tool_categories: { id: string; name: string } | null
  } | null
}

interface ProcedureImage {
  id: string
  image_url: string
  caption: string | null
  display_order: number
  is_primary: boolean
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
  procedureImages: ProcedureImage[]
  linkedDocuments: LearningMaterial[]
  linkedTools: LinkedTool[]
  categories: { id: string; name: string }[]
  medicalCentres: { id: string; name: string }[]
}

export default function ProcedureDetailClient({ 
  procedure: initialProcedure, 
  procedureImages: initialImages,
  linkedDocuments,
  linkedTools,
  categories,
  medicalCentres
}: ProcedureDetailClientProps) {
  const router = useRouter()
  const supabase = createClient()
  
  const [procedure, setProcedure] = useState(initialProcedure)
  const [images, setImages] = useState<ProcedureImage[]>(initialImages)
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
    if (!confirm('Are you sure you want to delete this procedure? This action cannot be undone.')) {
      return
    }

    setDeleting(true)
    
    try {
      // Delete procedure image if exists
      if (procedure.image_url) {
        const path = procedure.image_url.split('/procedure-images/')[1]
        if (path) {
          await supabase.storage.from('procedure-images').remove([path])
        }
      }

      // Delete procedure
      const { error } = await supabase
        .from('procedures')
        .delete()
        .eq('id', procedure.id)

      if (error) throw error

      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      console.error('Failed to delete procedure:', err)
      setDeleting(false)
    }
  }

  const handleProcedureUpdated = (updatedProcedure: typeof procedure) => {
    setProcedure(updatedProcedure)
    setShowEditModal(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 lg:pb-6">
      {/* Back button and header */}
      <div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to procedures
        </Link>
        
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{procedure.procedure_name}</h1>
            <p className="text-gray-600 mt-1">
              {format(new Date(procedure.procedure_date), 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowEditModal(true)}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit procedure"
            >
              <Edit3 className="w-5 h-5" />
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              title="Delete procedure"
            >
              {deleting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Trash2 className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Procedure Info Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Images Gallery */}
        {(images.length > 0 || procedure.image_url) && (
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <ImageIcon className="w-5 h-5 text-gray-500" />
              <h3 className="font-medium text-gray-900">Images</h3>
            </div>
            {images.length > 0 ? (
              <ImageGallery 
                images={images} 
                procedureId={procedure.id}
                editable={true}
                onImagesChange={setImages}
              />
            ) : procedure.image_url && (
              <div className="aspect-video bg-gray-100 relative rounded-lg overflow-hidden max-w-md">
                <Image
                  src={procedure.image_url}
                  alt={procedure.procedure_name}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>
        )}

        {/* Add images if none exist */}
        {images.length === 0 && !procedure.image_url && (
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <ImageIcon className="w-5 h-5 text-gray-500" />
              <h3 className="font-medium text-gray-900">Images</h3>
            </div>
            <ImageGallery 
              images={[]} 
              procedureId={procedure.id}
              editable={true}
              onImagesChange={setImages}
            />
          </div>
        )}

        {/* Details */}
        <div className="p-6 space-y-4">
          {/* Category & Role badges */}
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

          {/* Info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-gray-600">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-500">Date</div>
                <div className="font-medium">{format(new Date(procedure.procedure_date), 'dd MMM yyyy')}</div>
              </div>
            </div>

            {procedure.medical_centres && (
              <div className="flex items-center gap-3 text-gray-600">
                <Building2 className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Medical Centre</div>
                  <div className="font-medium">
                    {procedure.medical_centres.name}
                    {procedure.medical_centres.city && `, ${procedure.medical_centres.city}`}
                  </div>
                </div>
              </div>
            )}

            {procedure.accession_number && (
              <div className="flex items-center gap-3 text-gray-600">
                <Hash className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Accession Number</div>
                  <div className="font-medium">{procedure.accession_number}</div>
                </div>
              </div>
            )}

            {procedure.operator_role && (
              <div className="flex items-center gap-3 text-gray-600">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Role</div>
                  <div className="font-medium">{procedure.operator_role}</div>
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          {procedure.notes && (
            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Notes</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{procedure.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Linked Documents & Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Linked PDFs */}
        <ProcedureDocuments procedureId={procedure.id} initialDocuments={linkedDocuments} />
        
        {/* Linked Tools */}
        <ProcedureTools procedureId={procedure.id} />
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditProcedureModal
          procedure={procedure}
          categories={categories}
          medicalCentres={medicalCentres}
          onClose={() => setShowEditModal(false)}
          onSuccess={handleProcedureUpdated}
        />
      )}
    </div>
  )
}
