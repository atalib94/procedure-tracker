import { createServerClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import AnticoagulationGuide from '@/components/AnticoagulationGuide'

export default async function AnticoagulationPage() {
  const supabase = createServerClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/')
  }

  return <AnticoagulationGuide />
}
