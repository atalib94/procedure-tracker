'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import { X, Loader2, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react'

interface Procedure {
  id: string
  procedure_name: string
  procedure_date: string
  ebir_category_id: string | null
  medical_centre_id: string | null
  accession_number: string | null
  operator_role: string | null
  notes: string | null
  image_url: string | null
  is_complicated?: boolean
  complication_type?: string | null
  complication_severity?: string | null
  complication_timing?: string | null
  complication_description?: string | null
  complication_management?: string | null
  complication_outcome?: string | null
  lessons_learned?: string | null
  ebir_categories: { name: string; code: string } | null
  medical_centres: { name: string; city: string | null; country: string } | null
}

interface EditProcedureModalProps {
  procedure: Procedure
  categories: { id: string; name: string }[]
  medicalCentres: { id: string; name: string }[]
  onClose: () => void
  onSuccess: (updatedProcedure: Procedure) => void
}

const COMPLICATION_TYPES = [
  'Bleeding / Hemorrhage',
  'Infection',
  'Access site complication',
  'Vessel injury / Dissection',
  'Thrombosis / Embolism',
  'Organ injury',
  'Contrast reaction',
  'Radiation injury',
  'Device malfunction',
  'Non-target embolization',
  'Pneumothorax',
  'Nerve injury',
  'Pain / Discomfort',
  'Other'
]

const COMPLICATION_SEVERITY = [
  { value: 'minor', label: 'Minor', description: 'No therapy required, no consequence' },
  { value: 'moderate', label: 'Moderate', description: 'Requires therapy, minor hospitalization (<48h)' },
  { value: 'major', label: 'Major', description: 'Requires major therapy, extended hospitalization, permanent sequelae' },
  { value: 'life-threatening', label: 'Life-threatening', description: 'Life-threatening, required ICU admission' },
  { value: 'death', label: 'Death', description: 'Procedure-related death' }
]

const COMPLICATION_TIMING = [
  { value: 'intraprocedural', label: 'Intraprocedural', description: 'During the procedure' },
  { value: 'early', label: 'Early post-procedure', description: 'Within 24-48 hours' },
  { value: 'delayed', label: 'Delayed', description: 'After 48 hours' }
]

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
  const [showComplicationDetails, setShowComplicationDetails] = useState(procedure.is_complicated || false)
  
  const [formData, setFormData] = useState({
    procedure_name: procedure.procedure_name,
    procedure_date: procedure.procedure_date,
    ebir_category_id: procedure.ebir_category_id || '',
    medical_centre_id: procedure.medical_centre_id || '',
    accession_number: procedure.accession_number || '',
    operator_role: procedure.operator_role || '1st Operator',
    notes: procedure.notes || '',
    // Complication fields
    is_complicated: procedure.is_complicated || false,
    complication_type: procedure.complication_type || '',
    complication_severity: procedure.complication_severity || '',
    complication_timing: procedure.complication_timing || '',
    complication_description: procedure.complication_description || '',
    complication_management: procedure.complication_management || '',
    complication_outcome: procedure.complication_outcome || '',
    lessons_learned: procedure.lessons_learned || '',
  })

  const handleComplicationToggle = (checked: boolean) => {
    setFormData(prev => ({ 
      ...prev, 
      is_complicated: checked,
      ...(checked ? {} : {
        complication_type: '',
        complication_severity: '',
        complication_timing: '',
        complication_description: '',
        complication_management: '',
        complication_outcome: '',
        lessons_learned: '',
      })
    }))
    if (checked) {
      setShowComplicationDetails(true)
    }
  }

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
          // Complication fields
          is_complicated: formData.is_complicated,
          complication_type: formData.is_complicated ? formData.complication_type || null : null,
          complication_severity: formData.is_complicated ? formData.complication_severity || null : null,
          complication_timing: formData.is_complicated ? formData.complication_timing || null : null,
          complication_description: formData.is_complicated ? formData.complication_description || null : null,
          complication_management: formData.is_complicated ? formData.complication_management || null : null,
          complication_outcome: formData.is_complicated ? formData.complication_outcome || null : null,
          lessons_learned: formData.is_complicated ? formData.lessons_learned || null : null,
        })
        .eq('id', procedure.id)
        .eq('user_id', session.user.id)

      if (updateError) throw updateError

      // Fetch updated procedure with relations
      const { data: updatedProcedure } = await supabase
        .from('procedures')
        .select(`
          *,
          ebir_categories (name, code),
          medical_centres (name, city, country)
        `)
        .eq('id', procedure.id)
        .single()

      onSuccess(updatedProcedure || procedure)
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

          {/* Complication Section */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div 
              className={`p-3 flex items-center justify-between cursor-pointer transition-colors ${
                formData.is_complicated ? 'bg-amber-50 border-b border-amber-200' : 'bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => formData.is_complicated && setShowComplicationDetails(!showComplicationDetails)}
            >
              <label className="flex items-center gap-3 cursor-pointer" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={formData.is_complicated}
                  onChange={(e) => handleComplicationToggle(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                />
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-5 h-5 ${formData.is_complicated ? 'text-amber-600' : 'text-gray-400'}`} />
                  <span className={`font-medium ${formData.is_complicated ? 'text-amber-800' : 'text-gray-700'}`}>
                    Complicated Case
                  </span>
                </div>
              </label>
              {formData.is_complicated && (
                <button
                  type="button"
                  onClick={() => setShowComplicationDetails(!showComplicationDetails)}
                  className="p-1 text-amber-600 hover:bg-amber-100 rounded"
                >
                  {showComplicationDetails ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              )}
            </div>

            {formData.is_complicated && showComplicationDetails && (
              <div className="p-4 bg-amber-50/50 space-y-3">
                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={formData.complication_type}
                    onChange={(e) => setFormData({ ...formData, complication_type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Select type...</option>
                    {COMPLICATION_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Severity & Timing */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                    <select
                      value={formData.complication_severity}
                      onChange={(e) => setFormData({ ...formData, complication_severity: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">Select...</option>
                      {COMPLICATION_SEVERITY.map(sev => (
                        <option key={sev.value} value={sev.value}>{sev.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Timing</label>
                    <select
                      value={formData.complication_timing}
                      onChange={(e) => setFormData({ ...formData, complication_timing: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">Select...</option>
                      {COMPLICATION_TIMING.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">What Happened?</label>
                  <textarea
                    rows={2}
                    value={formData.complication_description}
                    onChange={(e) => setFormData({ ...formData, complication_description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Management */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Management</label>
                  <textarea
                    rows={2}
                    value={formData.complication_management}
                    onChange={(e) => setFormData({ ...formData, complication_management: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Outcome */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Outcome</label>
                  <textarea
                    rows={2}
                    value={formData.complication_outcome}
                    onChange={(e) => setFormData({ ...formData, complication_outcome: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Lessons Learned */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lessons Learned</label>
                  <textarea
                    rows={2}
                    value={formData.lessons_learned}
                    onChange={(e) => setFormData({ ...formData, lessons_learned: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            )}
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
