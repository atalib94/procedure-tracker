import { createServerClient } from '@/lib/supabase-server'
import { BookOpen } from 'lucide-react'

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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Learning Library</h1>
        <p className="text-gray-600 mt-2">Store and organize your medical learning materials</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Learning Library</h3>
        <p className="text-gray-600">PDF upload feature coming soon</p>
      </div>
    </div>
  )
}
