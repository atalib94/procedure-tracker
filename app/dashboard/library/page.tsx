import { createServerClient } from '@/lib/supabase-server'
import { Plus, BookOpen } from 'lucide-react'
import Link from 'next/link'

export default async function LibraryPage() {
  const supabase = createServerClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) return null

  const { data: materials } = await supabase
    .from('learning_materials')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Learning Library</h1>
          <p className="text-gray-600 mt-1">Store and organize your learning materials</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Upload PDF
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {materials?.length || 0}
          </div>
          <div className="text-sm text-gray-600">Total Documents</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
          <div className="text-sm text-gray-600">Categories Used</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
          <div className="text-sm text-gray-600">Linked to Procedures</div>
        </div>
      </div>

      {/* Materials List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {materials && materials.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {materials.map((material) => (
              <div key={material.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{material.title}</h3>
                    {material.description && (
                      <p className="text-sm text-gray-600 mt-1">{material.description}</p>
                    )}
                    {material.category && (
                      <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {material.category}
                      </span>
                    )}
                  </div>
                  <a
                    href={material.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    View PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents yet</h3>
            <p className="text-gray-600 mb-6">Start building your learning library</p>
            <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              <Plus className="w-5 h-5" />
              Upload First PDF
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
