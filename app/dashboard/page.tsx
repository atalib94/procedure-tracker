import { createServerClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import LibraryClient from '@/components/LibraryClient'

export default async function LibraryPage() {
  const supabase = createServerClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/')
  }

  // Fetch user's profile to get environment
  const { data: profile } = await supabase
    .from('profiles')
    .select('selected_environment_id')
    .eq('id', session.user.id)
    .single()

  // Fetch materials
  const { data: materials } = await supabase
    .from('learning_materials')
    .select('*')
    .eq('user_id', session.user.id)
    .eq('file_type', 'pdf')
    .order('created_at', { ascending: false })

  // Fetch linked procedure counts
  const { data: links } = await supabase
    .from('procedure_learning_links')
    .select('learning_material_id')

  // Count links per material
  const linkCounts: Record<string, number> = {}
  links?.forEach(link => {
    linkCounts[link.learning_material_id] = (linkCounts[link.learning_material_id] || 0) + 1
  })

  // Merge counts into materials
  const materialsWithCounts = (materials || []).map(m => ({
    ...m,
    linked_procedures_count: linkCounts[m.id] || 0
  }))

  return (
    <LibraryClient 
      initialMaterials={materialsWithCounts}
      environmentId={profile?.selected_environment_id || null}
    />
  )
}
