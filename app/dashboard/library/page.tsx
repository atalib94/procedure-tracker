import { createServerClient } from '@/lib/supabase-server'
import { BookOpen, Download } from 'lucide-react'
import UploadPDFButton from '@/components/UploadPDFButton'

export default async function LibraryPage() {
  const supabase = createServerClient()
  const session = await supabase.auth.getSession()
  
  if (!session.data.session) return null

  const { data: materials } = await supabase
    .from('learning_materials')
    .select('*')
    .eq('user_id', session.data.session.user.id)
    .order('created_at', { ascending: false })

  const totalDocs = materials?.length || 0

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Learning Library</h1>
          <p className="text-gray-600 mt-1">Store and organize your learning materials</p>
        </div>
        <UploadPDFButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-3xl font-bold text-gray-900 mb-1">{totalDocs}</div>
          <div className="text-sm text-gray-600">Total Documents</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {materials && materials.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {materials.map((material) => (
              <div key={material.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{material.title}</h3>
                    {material.description && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{material.description}</p>
                    )}
                    {material.category && (
                      <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {material.category}
                      </span>
                    )}
                  </div>
                  
                    href={material.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    View
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
            <UploadPDFButton />
          </div>
        )}
      </div>
    </div>
  )
}
