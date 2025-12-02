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
      {/* Top bar - always visible */}
      <div className="bg-white border-b border-gray-200 fixed w-full top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-10 h-10 rounded-xl object-cover"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900">Procedure Tracker</h1>
              <p className="text-xs text-gray-500">Reflect, improve, and thrive. </p>
            </div>
          </div>
          <UserMenu user={session.user} profile={profile} />
        </div>
      </div>

      <div className="pt-16">
        {/* DESKTOP: Sidebar */}
        <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 fixed left-0 h-[calc(100vh-4rem)] overflow-y-auto">
          <DashboardNav />
        </aside>

        {/* MOBILE: Bottom nav - rendered outside the hidden aside */}
        <div className="lg:hidden">
          <DashboardNav />
        </div>

        {/* Main content */}
        <main className="lg:ml-64 p-4 sm:p-6 pb-24 lg:pb-6">
          {children}
        </main>
      </div>
    </div>
  )
}
