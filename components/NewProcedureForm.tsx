'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import { Upload } from 'lucide-react'

interface NewProcedureFormProps {
  environments: any[]
  categories: any[]
  medicalCentres: any[]
}

export default function NewProcedureForm({ environments, categories, medicalCentres }: NewProcedureFormProps) {
  const router = useRouter()
  const supabase = createClient()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    procedure_name: '',
    procedure_date: new Date().toISOString().split('T')[0],
    ebir_category_id: '',
    medical_centre_id: medicalCentres[0]?.id || '',
    accession_number: '',
    operator_role: '1st Operator',
    notes: '',
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validation
    if (!formData.procedure_name.trim()) {
      setError('Please enter a procedure name')
      setLoading(false)
      return
    }

    if (!formData.medical_centre_id) {
      setError('Please select a medical centre')
      setLoading(false)
      return
    }

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setError('You must be logged in to create a procedure')
        setLoading(false)
        return
      }

      let imageUrl = null

      // Upload image if present
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

      // Insert procedure
      const { error: insertError } = await supabase
        .from('procedures')
        .insert({
          ...formData,
          user_id: session.user.id,
          image_url: imageUrl,
          environment_id: environments[0]?.id,
          // Convert empty strings to null for optional UUID fields
          ebir_category_id: formData.ebir_category_id || null,
        })

      if (insertError) {
        throw new Error(`Failed to save procedure: ${insertError.message}`)
      }

      router.push('/dashboard')
      router.refresh()
    } catch (err: any) {
      console.error('Error:', err)
      setError(err.message || 'An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            required
            value={formData.procedure_date}
            onChange={(e) => setFormData({ ...formData, procedure_date: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Medical Centre */}
        <div>
          <label htmlFor="centre" className="block text-sm font-medium text-gray-700 mb-2">
            Medical Centre <span className="text-red-500">*</span>
          </label>
          <select
            id="centre"
            required
            value={formData.medical_centre_id}
            onChange={(e) => setFormData({ ...formData, medical_centre_id: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {medicalCentres.length === 0 ? (
              <option value="">No centres available</option>
            ) : (
              <>
                <option value="">Select centre</option>
                {medicalCentres.map((centre) => (
                  <option key={centre.id} value={centre.id}>
                    {centre.name}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
      </div>

      {/* EBIR Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          EBIR Category <span className="text-gray-400">(optional)</span>
        </label>
        <select
          id="category"
          value={formData.ebir_category_id}
          onChange={(e) => setFormData({ ...formData, ebir_category_id: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
          Operator Role <span className="text-red-500">*</span>
        </label>
        <select
          id="role"
          required
          value={formData.operator_role}
          onChange={(e) => setFormData({ ...formData, operator_role: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="1st Operator">1st Operator</option>
          <option value="2nd Operator">2nd Operator</option>
          <option value="Observer">Observer</option>
        </select>
      </div>

      {/* Procedure Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Procedure Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          required
          placeholder="e.g., TACE, PTA, Nephrostomy"
          value={formData.procedure_name}
          onChange={(e) => setFormData({ ...formData, procedure_name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Accession Number */}
      <div>
        <label htmlFor="accession" className="block text-sm font-medium text-gray-700 mb-2">
          Accession Number <span className="text-gray-400">(optional)</span>
        </label>
        <input
          type="text"
          id="accession"
          placeholder="e.g., ACC-12345"
          value={formData.accession_number}
          onChange={(e) => setFormData({ ...formData, accession_number: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
          Procedure Notes <span className="text-gray-400">(optional)</span>
        </label>
        <textarea
          id="notes"
          rows={4}
          placeholder="Add any relevant details, complications, or observations..."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Procedure Image <span className="text-gray-400">(optional)</span>
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          {imagePreview ? (
            <div className="space-y-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-64 mx-auto rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  setImageFile(null)
                  setImagePreview(null)
                }}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Remove image
              </button>
            </div>
          ) : (
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-600">
                Click to upload image
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG up to 10MB
              </p>
            </label>
          )}
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save Procedure'}
        </button>
      </div>
    </form>
  )
}
