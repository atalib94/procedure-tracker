'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import { X, Loader2 } from 'lucide-react'

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
  
  const [formData, setFormData] = useState({
    procedure_name: procedure.procedure_name,
    procedure_date: procedure.procedure_date,
    ebir_category_id: procedure.ebir_category_id || '',
    medical_centre_id: procedure.medical_centre_id || '',
    accession_number: procedure.accession_number || '',
    operator_role: procedure.operator_role || '1st Operator',
    notes: procedure.notes || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setError('You must be logged in')
        setLoading(false)
        return
      }

      const { error: updateError } = await supabase
        .from('procedures')
        .update({
          procedure_name: formData.procedure_name,
          procedure_date: formData.procedure_date,
          ebir_category_id: formData.ebir_category_id || null,
          medical_centre_id: formData.medical_centre_id || null,
          accession_number: formData.accession_number || null,
          operator_role: formData.operator_role,
          notes: formData.notes || null,
        })
        .eq('id', procedure.id)
        .eq('user_id', session.user.id)

      if (updateError) throw updateError

      onSuccess()
    } catch (err: any) {
      setError(err.message || 'Failed to update procedure')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900">Edit Procedure</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Procedure Name */}
          <div>
            <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-2">
              Procedure Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="edit-name"
              required
              value={formData.procedure_name}
              onChange={(e) => setFormData({ ...formData, procedure_name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Procedure Date */}
          <div>
            <label htmlFor="edit-date" className="block text-sm font-medium text-gray-700 mb-2">
              Procedure Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="edit-date"
              required
              value={formData.procedure_date}
              onChange={(e) => setFormData({ ...formData, procedure_date: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700 mb-2">
              EBIR Category
            </label>
            <select
              id="edit-category"
              value={formData.ebir_category_id}
              onChange={(e) => setFormData({ ...formData, ebir_category_id: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Medical Centre */}
          <div>
            <label htmlFor="edit-centre" className="block text-sm font-medium text-gray-700 mb-2">
              Medical Centre
            </label>
            <select
              id="edit-centre"
              value={formData.medical_centre_id}
              onChange={(e) => setFormData({ ...formData, medical_centre_id: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select centre</option>
              {medicalCentres.map((centre) => (
                <option key={centre.id} value={centre.id}>
                  {centre.name}
                </option>
              ))}
            </select>
          </div>

          {/* Operator Role */}
          <div>
            <label htmlFor="edit-role" className="block text-sm font-medium text-gray-700 mb-2">
              Operator Role
            </label>
            <select
              id="edit-role"
              value={formData.operator_role}
              onChange={(e) => setFormData({ ...formData, operator_role: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="1st Operator">1st Operator</option>
              <option value="2nd Operator">2nd Operator</option>
              <option value="Observer">Observer</option>
            </select>
          </div>

          {/* Case ID */}
          <div>
            <label htmlFor="edit-caseid" className="block text-sm font-medium text-gray-700 mb-2">
              Case ID
            </label>
            <input
              type="text"
              id="edit-caseid"
              placeholder="e.g., IR-2024-0042"
              value={formData.accession_number}
              onChange={(e) => setFormData({ ...formData, accession_number: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <p className="mt-1 text-xs text-gray-500">
              Your own reference code (not PACS accession number)
            </p>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="edit-notes" className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              id="edit-notes"
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
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
        </form>
      </div>
    </div>
  )
}
