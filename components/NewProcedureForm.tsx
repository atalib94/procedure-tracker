'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import { Upload, FileText, X, Plus, Loader2, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react'

interface PDFFile {
  file: File
  title: string
  category: string
}

interface NewProcedureFormProps {
  environments: any[]
  categories: any[]
  medicalCentres: any[]
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

export default function NewProcedureForm({ environments, categories, medicalCentres }: NewProcedureFormProps) {
  const router = useRouter()
  const supabase = createClient()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  // PDF Upload State
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([])
  const [pdfDragActive, setPdfDragActive] = useState(false)

  // Complication State
  const [showComplicationDetails, setShowComplicationDetails] = useState(false)

  const pdfCategories = [
    'Anatomy',
    'Technique',
    'Case Study',
    'Guidelines',
    'Research',
    'Protocol',
    'Reference',
    'Other'
  ]

  const [formData, setFormData] = useState({
    procedure_name: '',
    procedure_date: new Date().toISOString().split('T')[0],
    ebir_category_id: '',
    medical_centre_id: medicalCentres[0]?.id || '',
    accession_number: '',
    operator_role: '1st Operator',
    notes: '',
    // Complication fields
    is_complicated: false,
    complication_type: '',
    complication_severity: '',
    complication_timing: '',
    complication_description: '',
    complication_management: '',
    complication_outcome: '',
    lessons_learned: '',
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

  // PDF Handlers
  const handlePdfDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setPdfDragActive(true)
    } else if (e.type === 'dragleave') {
      setPdfDragActive(false)
    }
  }, [])

  const handlePdfDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setPdfDragActive(false)

    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files)
        .filter(file => file.type === 'application/pdf')
        .map(file => ({
          file,
          title: file.name.replace('.pdf', ''),
          category: ''
        }))
      
      if (newFiles.length > 0) {
        setPdfFiles(prev => [...prev, ...newFiles])
      }
    }
  }, [])

  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
        .filter(file => file.type === 'application/pdf')
        .map(file => ({
          file,
          title: file.name.replace('.pdf', ''),
          category: ''
        }))
      
      if (newFiles.length > 0) {
        setPdfFiles(prev => [...prev, ...newFiles])
      }
    }
    e.target.value = ''
  }

  const updatePdfFile = (index: number, updates: Partial<PDFFile>) => {
    setPdfFiles(prev => prev.map((pdf, i) => 
      i === index ? { ...pdf, ...updates } : pdf
    ))
  }

  const removePdfFile = (index: number) => {
    setPdfFiles(prev => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Handle complication toggle
  const handleComplicationToggle = (checked: boolean) => {
    setFormData(prev => ({ 
      ...prev, 
      is_complicated: checked,
      // Clear complication fields if unchecked
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

      // Prepare procedure data
      const procedureData = {
        procedure_name: formData.procedure_name,
        procedure_date: formData.procedure_date,
        ebir_category_id: formData.ebir_category_id || null,
        medical_centre_id: formData.medical_centre_id,
        accession_number: formData.accession_number || null,
        operator_role: formData.operator_role,
        notes: formData.notes || null,
        user_id: session.user.id,
        image_url: imageUrl,
        environment_id: environments[0]?.id,
        // Complication fields
        is_complicated: formData.is_complicated,
        complication_type: formData.is_complicated ? formData.complication_type || null : null,
        complication_severity: formData.is_complicated ? formData.complication_severity || null : null,
        complication_timing: formData.is_complicated ? formData.complication_timing || null : null,
        complication_description: formData.is_complicated ? formData.complication_description || null : null,
        complication_management: formData.is_complicated ? formData.complication_management || null : null,
        complication_outcome: formData.is_complicated ? formData.complication_outcome || null : null,
        lessons_learned: formData.is_complicated ? formData.lessons_learned || null : null,
      }

      // Insert procedure
      const { data: insertedProcedure, error: insertError } = await supabase
        .from('procedures')
        .insert(procedureData)
        .select('id')
        .single()

      if (insertError) {
        throw new Error(`Failed to save procedure: ${insertError.message}`)
      }

      // Upload PDFs and link them to the procedure
      if (pdfFiles.length > 0 && insertedProcedure) {
        for (const pdf of pdfFiles) {
          const fileExt = pdf.file.name.split('.').pop()
          const fileName = `${session.user.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
          
          const { error: pdfUploadError } = await supabase.storage
            .from('learning-materials')
            .upload(fileName, pdf.file, {
              cacheControl: '3600',
              upsert: false
            })

          if (pdfUploadError) {
            console.error('PDF upload error:', pdfUploadError)
            continue
          }

          const { data: { publicUrl } } = supabase.storage
            .from('learning-materials')
            .getPublicUrl(fileName)

          const { data: materialData, error: materialError } = await supabase
            .from('learning_materials')
            .insert({
              user_id: session.user.id,
              environment_id: environments[0]?.id,
              title: pdf.title.trim() || pdf.file.name.replace('.pdf', ''),
              file_url: publicUrl,
              file_type: 'pdf',
              file_size: pdf.file.size,
              category: pdf.category || null,
            })
            .select('id')
            .single()

          if (materialError) {
            console.error('Material insert error:', materialError)
            continue
          }

          if (materialData) {
            await supabase
              .from('procedure_documents')
              .insert({
                procedure_id: insertedProcedure.id,
                learning_material_id: materialData.id,
              })
          }
        }
      }

      router.push('/dashboard')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Procedure Date */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
          Procedure Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="date"
          required
          value={formData.procedure_date}
          onChange={(e) => setFormData({ ...formData, procedure_date: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">Select a medical centre</option>
          {medicalCentres.map((centre) => (
            <option key={centre.id} value={centre.id}>
              {centre.name}
            </option>
          ))}
        </select>
      </div>

      {/* EBIR Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          EBIR Category
        </label>
        <select
          id="category"
          value={formData.ebir_category_id}
          onChange={(e) => setFormData({ ...formData, ebir_category_id: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Case ID */}
      <div>
        <label htmlFor="accession" className="block text-sm font-medium text-gray-700 mb-2">
          Case ID <span className="text-gray-400">(optional)</span>
        </label>
        <input
          type="text"
          id="accession"
          placeholder="e.g., IR-2024-0042"
          value={formData.accession_number}
          onChange={(e) => setFormData({ ...formData, accession_number: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <p className="mt-1 text-xs text-gray-500">
          Your own reference code. See <a href="/dashboard/privacy-guidance" className="text-purple-600 hover:underline">Privacy Guide</a> for linking to PACS.
        </p>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
          Procedure Notes <span className="text-gray-400">(optional)</span>
        </label>
        <textarea
          id="notes"
          rows={4}
          placeholder="Add any relevant details, observations, or technique notes..."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Complication Section */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        {/* Complication Toggle Header */}
        <div 
          className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${
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
                Mark as Complicated Case
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

        {/* Complication Details */}
        {formData.is_complicated && showComplicationDetails && (
          <div className="p-4 bg-amber-50/50 space-y-4">
            <p className="text-sm text-amber-700">
              Document the complication details to create a valuable learning case for future reference.
            </p>

            {/* Complication Type */}
            <div>
              <label htmlFor="comp-type" className="block text-sm font-medium text-gray-700 mb-2">
                Complication Type
              </label>
              <select
                id="comp-type"
                value={formData.complication_type}
                onChange={(e) => setFormData({ ...formData, complication_type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="">Select type...</option>
                {COMPLICATION_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Severity & Timing Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Severity */}
              <div>
                <label htmlFor="comp-severity" className="block text-sm font-medium text-gray-700 mb-2">
                  Severity (SIR Classification)
                </label>
                <select
                  id="comp-severity"
                  value={formData.complication_severity}
                  onChange={(e) => setFormData({ ...formData, complication_severity: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">Select severity...</option>
                  {COMPLICATION_SEVERITY.map(sev => (
                    <option key={sev.value} value={sev.value}>{sev.label}</option>
                  ))}
                </select>
                {formData.complication_severity && (
                  <p className="mt-1 text-xs text-gray-500">
                    {COMPLICATION_SEVERITY.find(s => s.value === formData.complication_severity)?.description}
                  </p>
                )}
              </div>

              {/* Timing */}
              <div>
                <label htmlFor="comp-timing" className="block text-sm font-medium text-gray-700 mb-2">
                  Timing
                </label>
                <select
                  id="comp-timing"
                  value={formData.complication_timing}
                  onChange={(e) => setFormData({ ...formData, complication_timing: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">Select timing...</option>
                  {COMPLICATION_TIMING.map(timing => (
                    <option key={timing.value} value={timing.value}>{timing.label}</option>
                  ))}
                </select>
                {formData.complication_timing && (
                  <p className="mt-1 text-xs text-gray-500">
                    {COMPLICATION_TIMING.find(t => t.value === formData.complication_timing)?.description}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="comp-desc" className="block text-sm font-medium text-gray-700 mb-2">
                What Happened?
              </label>
              <textarea
                id="comp-desc"
                rows={3}
                placeholder="Describe the complication in detail..."
                value={formData.complication_description}
                onChange={(e) => setFormData({ ...formData, complication_description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Management */}
            <div>
              <label htmlFor="comp-mgmt" className="block text-sm font-medium text-gray-700 mb-2">
                How Was It Managed?
              </label>
              <textarea
                id="comp-mgmt"
                rows={3}
                placeholder="Describe the management and interventions performed..."
                value={formData.complication_management}
                onChange={(e) => setFormData({ ...formData, complication_management: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Outcome */}
            <div>
              <label htmlFor="comp-outcome" className="block text-sm font-medium text-gray-700 mb-2">
                Outcome
              </label>
              <textarea
                id="comp-outcome"
                rows={2}
                placeholder="Final outcome after management..."
                value={formData.complication_outcome}
                onChange={(e) => setFormData({ ...formData, complication_outcome: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Lessons Learned */}
            <div>
              <label htmlFor="comp-lessons" className="block text-sm font-medium text-gray-700 mb-2">
                Lessons Learned
              </label>
              <textarea
                id="comp-lessons"
                rows={3}
                placeholder="What would you do differently? What key takeaways will help in future cases?"
                value={formData.lessons_learned}
                onChange={(e) => setFormData({ ...formData, lessons_learned: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
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

      {/* PDF Upload Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          PDF Documents <span className="text-gray-400">(optional)</span>
        </label>
        
        {/* Uploaded PDFs List */}
        {pdfFiles.length > 0 && (
          <div className="space-y-3 mb-4">
            {pdfFiles.map((pdf, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate">{pdf.file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(pdf.file.size)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removePdfFile(index)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Document title"
                        value={pdf.title}
                        onChange={(e) => updatePdfFile(index, { title: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <select
                        value={pdf.category}
                        onChange={(e) => updatePdfFile(index, { category: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select category</option>
                        {pdfCategories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PDF Drop Zone */}
        <div
          onDragEnter={handlePdfDrag}
          onDragLeave={handlePdfDrag}
          onDragOver={handlePdfDrag}
          onDrop={handlePdfDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            pdfDragActive
              ? 'border-purple-500 bg-purple-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <label className="cursor-pointer block">
            <input
              type="file"
              accept="application/pdf"
              multiple
              onChange={handlePdfFileChange}
              className="hidden"
            />
            <div className="flex items-center justify-center gap-2 text-gray-400 mb-2">
              <FileText className="w-8 h-8" />
              <Plus className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-gray-700">
              {pdfFiles.length > 0 ? 'Add more PDFs' : 'Drag & drop PDFs here, or click to browse'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PDF files up to 50MB each
            </p>
          </label>
        </div>
        
        {pdfFiles.length > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            {pdfFiles.length} PDF{pdfFiles.length !== 1 ? 's' : ''} will be uploaded and linked to this procedure
          </p>
        )}
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
          className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Procedure'
          )}
        </button>
      </div>
    </form>
  )
}
