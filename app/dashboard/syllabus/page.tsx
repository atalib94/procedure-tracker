import { createServerClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import SyllabusGuide from '@/components/SyllabusGuide'

export default async function SyllabusPage() {
  const supabase = createServerClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/')
  }

  return <SyllabusGuide />
}
