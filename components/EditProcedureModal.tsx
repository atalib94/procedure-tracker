'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { X, Upload, Loader2, Trash2 } from 'lucide-react'

interface EditProcedureModalProps {
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
  }
  categories: { id: string; name: string }[]
  medicalCentres: { id: string; name: string }[]
  onClose: () => void
  onSuccess: () => void
}

export default function EditProcedureModal({ 
  procedure, 
  categories, 
  medicalCentres, 
  onClose, 
  onSuccess 
}: EditProcedureModalProps) {
  const supabase = createClient()
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(procedure.image_url)
  const [removeImage, setRemoveImage] = useState(false)

  const [formData, setFormData] = useState({
    procedure_name: procedure.procedure_name,
    procedure_date: procedure.procedure_date,
    ebir_category_id: procedure.ebir_category_id || '',
    medical_centre_id: procedure.medical_centre_id || '',
    accession_number: procedure.accession_number || '',
    operator_role: procedure.operator_role || '1st Operator',
    notes: procedure.notes || '',
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setRemoveImage(false)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview(null)
    setRemoveImage(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!formData.procedure_name.trim()) {
      setError('Please enter a procedure name')
      setLoading(false)
      return
    }

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setError('You must be logged in to edit a procedure')
        setLoading(false)
        return
      }

      let imageUrl = removeImage ? null : procedure.image_url

      // Upload new image if present
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${session.user.id}/${Date.now()}.${fileExt}`
        
        const { error: uploadError } = await supabase.storage
          .from('procedure-images')
          .upload(fileName, imageFile)

        if (uploadError) {
          throw new Error(`Image upload failed: ${uploadError.message}`)
        }

        const { data: { publicUrl } } = supabase.storage
          .from('procedure-images')
          .getPublicUrl(fileName)

        imageUrl = publicUrl
      }

      // Update procedure
      const { error: updateError } = await supabase
        .from('procedures')
        .update({
          ...formData,
          image_url: imageUrl,
          ebir_category_id: formData.ebir_category_id || null,
          medical_centre_id: formData.medical_centre_id || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', procedure.id)
        .eq('user_id', session.user.id)

      if (updateError) {
        throw new Error(`Failed to update procedure: ${updateError.message}`)
      }

      onSuccess()
    } catch (err: any) {
      console.error('Error:', err)
      setError(err.message || 'An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Edit Case</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">
                <p className="font-medium">Error</p>
                <p>{error}</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {/* Date */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  required
                  value={formData.procedure_date}
                  onChange={(e) => setFormData({ ...formData, procedure_date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Medical Centre */}
              <div>
                <label htmlFor="centre" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Medical Centre
                </label>
                <select
                  id="centre"
                  value={formData.medical_centre_id}
                  onChange={(e) => setFormData({ ...formData, medical_centre_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select centre</option>
                  {medicalCentres.map((centre) => (
                    <option key={centre.id} value={centre.id}>
                      {centre.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* EBIR Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1.5">
                EBIR Category
              </label>
              <select
                id="category"
                value={formData.ebir_category_id}
                onChange={(e) => setFormData({ ...formData, ebir_category_id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Operator Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1.5">
                Operator Role <span className="text-red-500">*</span>
              </label>
              <select
                id="role"
                required
                value={formData.operator_role}
                onChange={(e) => setFormData({ ...formData, operator_role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1st Operator">1st Operator</option>
                <option value="2nd Operator">2nd Operator</option>
                <option value="Observer">Observer</option>
              </select>
            </div>

            {/* Procedure Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                Procedure Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                required
                placeholder="e.g., TACE, PTA, Nephrostomy"
                value={formData.procedure_name}
                onChange={(e) => setFormData({ ...formData, procedure_name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Accession Number */}
            <div>
              <label htmlFor="accession" className="block text-sm font-medium text-gray-700 mb-1.5">
                Accession Number
              </label>
              <input
                type="text"
                id="accession"
                placeholder="e.g., ACC-12345"
                value={formData.accession_number}
                onChange={(e) => setFormData({ ...formData, accession_number: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1.5">
                Procedure Notes
              </label>
              <textarea
                id="notes"
                rows={3}
                placeholder="Add any relevant details, complications, or observations..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Procedure Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                {imagePreview ? (
                  <div className="space-y-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-48 mx-auto rounded-lg"
                    />
                    <div className="flex justify-center gap-3">
                      <label className="cursor-pointer text-sm text-blue-600 hover:text-blue-700 font-medium">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        Change image
                      </label>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="cursor-pointer block text-center py-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload image</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                  </label>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
