'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase-client'
import { X, Upload, Loader2, Trash2, FileText, Plus, Eye } from 'lucide-react'

interface PDFFile {
  file: File
  title: string
  category: string
}

interface LinkedDocument {
  id: string
  title: string
  file_url: string
  file_size: number | null
  category: string | null
}

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

  // PDF Upload State
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([])
  const [pdfDragActive, setPdfDragActive] = useState(false)
  const [linkedDocuments, setLinkedDocuments] = useState<LinkedDocument[]>([])
  const [loadingDocs, setLoadingDocs] = useState(true)
  const [unlinkingId, setUnlinkingId] = useState<string | null>(null)

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
    procedure_name: procedure.procedure_name,
    procedure_date: procedure.procedure_date,
    ebir_category_id: procedure.ebir_category_id || '',
    medical_centre_id: procedure.medical_centre_id || '',
    accession_number: procedure.accession_number || '',
    operator_role: procedure.operator_role || '1st Operator',
    notes: procedure.notes || '',
  })

  // Fetch linked documents on mount
  useEffect(() => {
    const fetchLinkedDocs = async () => {
      try {
        const { data, error } = await supabase
          .from('procedure_learning_links')
          .select(`
            learning_material_id,
            learning_materials (
              id, title, file_url, file_size, category
            )
          `)
          .eq('procedure_id', procedure.id)

        if (error) throw error

        const docs = data?.map(link => link.learning_materials as unknown as LinkedDocument) || []
        setLinkedDocuments(docs)
      } catch (err) {
        console.error('Error fetching linked docs:', err)
      } finally {
        setLoadingDocs(false)
      }
    }

    fetchLinkedDocs()
  }, [procedure.id, supabase])

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

  const handleUnlinkDocument = async (materialId: string) => {
    if (!confirm('Remove this document from this case?')) return
    
    setUnlinkingId(materialId)
    try {
      const { error } = await supabase
        .from('procedure_learning_links')
        .delete()
        .eq('procedure_id', procedure.id)
        .eq('learning_material_id', materialId)

      if (error) throw error

      // Check if material is still linked to any procedure
      const { count } = await supabase
        .from('procedure_learning_links')
        .select('*', { count: 'exact', head: true })
        .eq('learning_material_id', materialId)

      if (count === 0) {
        await supabase
          .from('learning_materials')
          .update({ is_linked_to_procedure: false })
          .eq('id', materialId)
      }

      setLinkedDocuments(prev => prev.filter(d => d.id !== materialId))
    } catch (err) {
      console.error('Error unlinking document:', err)
      alert('Failed to unlink document')
    } finally {
      setUnlinkingId(null)
    }
  }

  const formatFileSize = (bytes: number | null): string => {
    if (!bytes) return ''
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
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

      // Upload new PDFs and link them to the procedure
      if (pdfFiles.length > 0) {
        // Get environment_id from procedure
        const { data: procData } = await supabase
          .from('procedures')
          .select('environment_id')
          .eq('id', procedure.id)
          .single()

        for (const pdf of pdfFiles) {
          // Upload PDF to storage
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

          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from('learning-materials')
            .getPublicUrl(fileName)

          // Insert learning material record
          const { data: materialData, error: materialError } = await supabase
            .from('learning_materials')
            .insert({
              user_id: session.user.id,
              environment_id: procData?.environment_id,
              title: pdf.title.trim() || pdf.file.name.replace('.pdf', ''),
              file_url: publicUrl,
              file_type: 'pdf',
              file_size: pdf.file.size,
              category: pdf.category || null,
              is_linked_to_procedure: true
            })
            .select('id')
            .single()

          if (materialError) {
            console.error('Material insert error:', materialError)
            continue
          }

          // Link PDF to procedure
          if (materialData) {
            await supabase
              .from('procedure_learning_links')
              .insert({
                procedure_id: procedure.id,
                learning_material_id: materialData.id
              })
          }
        }
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      <label className="cursor-pointer text-sm text-purple-600 hover:text-purple-700 font-medium">
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

            {/* Linked PDF Documents */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                PDF Documents
              </label>
              
              {/* Already Linked Documents */}
              {loadingDocs ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
                </div>
              ) : linkedDocuments.length > 0 && (
                <div className="space-y-2 mb-3">
                  <p className="text-xs text-gray-500">Linked documents:</p>
                  {linkedDocuments.map(doc => (
                    <div key={doc.id} className="bg-gray-50 rounded-lg p-3 flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{doc.title}</p>
                        <p className="text-xs text-gray-500">
                          {doc.category && `${doc.category} • `}
                          {formatFileSize(doc.file_size)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <a
                          href={doc.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors"
                          title="View PDF"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleUnlinkDocument(doc.id)}
                          disabled={unlinkingId === doc.id}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                          title="Unlink document"
                        >
                          {unlinkingId === doc.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <X className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* New PDFs to Upload */}
              {pdfFiles.length > 0 && (
                <div className="space-y-2 mb-3">
                  <p className="text-xs text-gray-500">New documents to upload:</p>
                  {pdfFiles.map((pdf, index) => (
                    <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4 text-red-600" />
                        </div>
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900 truncate">{pdf.file.name}</p>
                              <p className="text-xs text-gray-500">{formatFileSize(pdf.file.size)}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removePdfFile(index)}
                              className="p-1 text-gray-400 hover:text-red-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="Title"
                              value={pdf.title}
                              onChange={(e) => updatePdfFile(index, { title: e.target.value })}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            <select
                              value={pdf.category}
                              onChange={(e) => updatePdfFile(index, { category: e.target.value })}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                              <option value="">Category</option>
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
                className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
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
                  <div className="flex items-center justify-center gap-2 text-gray-400 mb-1">
                    <FileText className="w-6 h-6" />
                    <Plus className="w-4 h-4" />
                  </div>
                  <p className="text-sm text-gray-600">
                    {pdfFiles.length > 0 || linkedDocuments.length > 0 ? 'Add more PDFs' : 'Drag & drop PDFs here'}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">PDF files up to 50MB</p>
                </label>
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
              className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
