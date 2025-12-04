'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase-client'
import { X, Upload, Loader2, Image as ImageIcon, Trash2 } from 'lucide-react'
import Image from 'next/image'

interface ToolCategory {
  id: string
  name: string
  code: string
  icon: string
  order_index?: number
}

interface Tool {
  id: string
  user_id: string
  category_id: string | null
  name: string
  manufacturer: string | null
  model_number: string | null
  description: string | null
  specifications: string | null
  notes: string | null
  image_url: string | null
  is_favorite: boolean
  is_active: boolean
  created_at: string
  updated_at: string
  category: ToolCategory | null
  linked_count: number
}

interface ToolUploadFormProps {
  categories: ToolCategory[]
  userId: string
  existingTool?: Tool
  onClose: () => void
  onSuccess: (tool: Tool) => void
}

export default function ToolUploadForm({ 
  categories, 
  userId, 
  existingTool,
  onClose, 
  onSuccess 
}: ToolUploadFormProps) {
  const supabase = createClient()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: existingTool?.name || '',
    category_id: existingTool?.category_id || '',
    manufacturer: existingTool?.manufacturer || '',
    model_number: existingTool?.model_number || '',
    description: existingTool?.description || '',
    specifications: existingTool?.specifications || '',
    notes: existingTool?.notes || '',
    image_url: existingTool?.image_url || ''
  })

  const [previewUrl, setPreviewUrl] = useState<string | null>(existingTool?.image_url || null)

  const isEditing = !!existingTool

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB')
      return
    }

    setUploadingImage(true)
    setError(null)

    try {
      // Create unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${userId}/${Date.now()}.${fileExt}`

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('tool-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('tool-images')
        .getPublicUrl(data.path)

      setFormData(prev => ({ ...prev, image_url: publicUrl }))
      setPreviewUrl(publicUrl)
    } catch (err: any) {
      setError(err.message || 'Failed to upload image')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleRemoveImage = async () => {
    if (formData.image_url) {
      // Extract path from URL and delete from storage
      try {
        const path = formData.image_url.split('/tool-images/')[1]
        if (path) {
          await supabase.storage.from('tool-images').remove([path])
        }
      } catch (err) {
        console.error('Failed to delete old image:', err)
      }
    }
    setFormData(prev => ({ ...prev, image_url: '' }))
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      setError('Tool name is required')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const toolData = {
        name: formData.name.trim(),
        category_id: formData.category_id || null,
        manufacturer: formData.manufacturer.trim() || null,
        model_number: formData.model_number.trim() || null,
        description: formData.description.trim() || null,
        specifications: formData.specifications.trim() || null,
        notes: formData.notes.trim() || null,
        image_url: formData.image_url || null,
        user_id: userId
      }

      if (isEditing) {
        // Update existing tool
        const { data, error: updateError } = await supabase
          .from('tools')
          .update(toolData)
          .eq('id', existingTool.id)
          .select(`
            *,
            category:tool_categories(id, name, code, icon)
          `)
          .single()

        if (updateError) throw updateError

        onSuccess({
          ...data,
          linked_count: existingTool.linked_count
        })
      } else {
        // Create new tool
        const { data, error: insertError } = await supabase
          .from('tools')
          .insert(toolData)
          .select(`
            *,
            category:tool_categories(id, name, code, icon)
          `)
          .single()

        if (insertError) throw insertError

        onSuccess({
          ...data,
          linked_count: 0
        })
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save tool')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? 'Edit Tool' : 'Add New Tool'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tool Image
            </label>
            <div className="flex items-start gap-4">
              {/* Preview */}
              <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border-2 border-dashed border-gray-300">
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Tool preview"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-10 h-10 text-gray-400" />
                )}
              </div>

              {/* Upload controls */}
              <div className="flex-1 space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  {uploadingImage ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  {previewUrl ? 'Change Image' : 'Upload Image'}
                </button>
                {previewUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                )}
                <p className="text-xs text-gray-500">
                  PNG, JPG or WebP. Max 5MB.
                </p>
              </div>
            </div>
          </div>

          {/* Tool Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tool Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Interlock Coil 5mm"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formData.category_id}
              onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Manufacturer & Model Number */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Manufacturer
              </label>
              <input
                type="text"
                value={formData.manufacturer}
                onChange={(e) => setFormData(prev => ({ ...prev, manufacturer: e.target.value }))}
                placeholder="e.g., Boston Scientific"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Model Number
              </label>
              <input
                type="text"
                value={formData.model_number}
                onChange={(e) => setFormData(prev => ({ ...prev, model_number: e.target.value }))}
                placeholder="e.g., M00123456"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of the tool..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Specifications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specifications
            </label>
            <textarea
              value={formData.specifications}
              onChange={(e) => setFormData(prev => ({ ...prev, specifications: e.target.value }))}
              placeholder="Technical specifications, sizes, compatibility..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Personal Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Tips, tricks, or personal notes about this tool..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || uploadingImage}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isEditing ? 'Save Changes' : 'Add Tool'}
          </button>
        </div>
      </div>
    </div>
  )
}
