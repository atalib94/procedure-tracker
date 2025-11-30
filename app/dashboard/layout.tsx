import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase-server'
import DashboardNav from '@/components/DashboardNav'
import UserMenu from '@/components/UserMenu'

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
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 fixed w-full top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">IR</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">IR Procedure Log</h1>
              <p className="text-xs text-gray-500">Track your interventional radiology procedures</p>
            </div>
          </div>
          <UserMenu user={session.user} profile={profile} />
        </div>
      </div>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 fixed left-0 h-[calc(100vh-4rem)] overflow-y-auto">
          <DashboardNav />
        </aside>

        {/* Main content */}
        <main className="flex-1 ml-64 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
