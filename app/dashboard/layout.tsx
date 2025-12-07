import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase-server'
import DashboardLayoutClient from '@/components/DashboardLayoutClient'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()

  return (
    <DashboardLayoutClient user={session.user} profile={profile}>
      {children}
    </DashboardLayoutClient>
  )
}
