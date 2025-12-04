'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Trash2, Plus, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase-client'

interface ProcedureImage {
  id: string
  image_url: string
  caption: string | null
  display_order: number
  is_primary: boolean
}

interface ImageGalleryProps {
  images: ProcedureImage[]
  procedureId: string
  editable?: boolean
  onImagesChange?: (images: ProcedureImage[]) => void
}

export default function ImageGallery({ 
  images: initialImages, 
  procedureId, 
  editable = false,
  onImagesChange 
}: ImageGalleryProps) {
  const supabase = createClient()
  const [images, setImages] = useState<ProcedureImage[]>(initialImages)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const newImages: ProcedureImage[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const fileExt = file.name.split('.').pop()
        const fileName = `${session.user.id}/${Date.now()}-${i}.${fileExt}`

        const { error: uploadError } = await supabase.storage
          .from('procedure-images')
          .upload(fileName, file)

        if (uploadError) {
          console.error('Upload error:', uploadError)
          continue
        }

        const { data: { publicUrl } } = supabase.storage
          .from('procedure-images')
          .getPublicUrl(fileName)

        // Insert into procedure_images table
        const { data: imageData, error: insertError } = await supabase
          .from('procedure_images')
          .insert({
            procedure_id: procedureId,
            image_url: publicUrl,
            display_order: images.length + i,
            is_primary: images.length === 0 && i === 0
          })
          .select()
          .single()

        if (!insertError && imageData) {
          newImages.push(imageData)
        }
      }

      const updatedImages = [...images, ...newImages]
      setImages(updatedImages)
      onImagesChange?.(updatedImages)
    } catch (err) {
      console.error('Failed to upload images:', err)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (imageId: string) => {
    setDeleting(imageId)
    try {
      const imageToDelete = images.find(img => img.id === imageId)
      if (!imageToDelete) return

      // Delete from storage
      const path = imageToDelete.image_url.split('/procedure-images/')[1]
      if (path) {
        await supabase.storage.from('procedure-images').remove([path])
      }

      // Delete from database
      await supabase.from('procedure_images').delete().eq('id', imageId)

      const updatedImages = images.filter(img => img.id !== imageId)
      setImages(updatedImages)
      onImagesChange?.(updatedImages)
      
      if (selectedIndex !== null && selectedIndex >= updatedImages.length) {
        setSelectedIndex(updatedImages.length > 0 ? updatedImages.length - 1 : null)
      }
    } catch (err) {
      console.error('Failed to delete image:', err)
    } finally {
      setDeleting(null)
    }
  }

  const openLightbox = (index: number) => {
    setSelectedIndex(index)
  }

  const closeLightbox = () => {
    setSelectedIndex(null)
  }

  const goToPrevious = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  const goToNext = () => {
    if (selectedIndex !== null && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
  }

  if (images.length === 0 && !editable) {
    return null
  }

  return (
    <div className="space-y-3">
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
        {images.map((image, index) => (
          <div 
            key={image.id} 
            className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.image_url}
              alt={image.caption || `Image ${index + 1}`}
              fill
              className="object-cover"
            />
            {image.is_primary && (
              <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-blue-600 text-white text-xs rounded">
                Primary
              </span>
            )}
            {editable && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(image.id)
                }}
                disabled={deleting === image.id}
                className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {deleting === image.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        ))}

        {/* Add Image Button */}
        {editable && (
          <label className="aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition-colors">
            {uploading ? (
              <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
            ) : (
              <>
                <Plus className="w-6 h-6 text-gray-400" />
                <span className="text-xs text-gray-500 mt-1">Add</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        )}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && images[selectedIndex] && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-lg z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous button */}
          {selectedIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              className="absolute left-4 p-2 text-white hover:bg-white/20 rounded-lg"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {/* Image */}
          <div 
            className="relative max-w-[90vw] max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedIndex].image_url}
              alt={images[selectedIndex].caption || `Image ${selectedIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          {/* Next button */}
          {selectedIndex < images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              className="absolute right-4 p-2 text-white hover:bg-white/20 rounded-lg"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Caption & Counter */}
          <div className="absolute bottom-4 left-0 right-0 text-center text-white">
            <p className="text-sm opacity-75">
              {selectedIndex + 1} / {images.length}
            </p>
            {images[selectedIndex].caption && (
              <p className="mt-1">{images[selectedIndex].caption}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
