'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import DashboardNav from '@/components/DashboardNav'
import UserMenu from '@/components/UserMenu'

interface DashboardLayoutClientProps {
  children: React.ReactNode
  user: any
  profile: any
}

export default function DashboardLayoutClient({ children, user, profile }: DashboardLayoutClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
              <p className="text-xs text-gray-500">Reflect, improve, and thrive.</p>
            </div>
          </div>
          
          {/* Right side with menu button and user */}
          <div className="flex items-center gap-2">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <UserMenu user={user} profile={profile} />
          </div>
        </div>
      </div>

      <div className="pt-16">
        {/* DESKTOP: Sidebar */}
        <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 fixed left-0 h-[calc(100vh-4rem)] overflow-y-auto">
          <DashboardNav />
        </aside>

        {/* MOBILE: Nav with dropdown and FAB */}
        <div className="lg:hidden">
          <DashboardNav 
            isMobileMenuOpen={isMobileMenuOpen} 
            setIsMobileMenuOpen={setIsMobileMenuOpen} 
          />
        </div>

        {/* Main content */}
        <main className="lg:ml-64 p-4 sm:p-6 pb-24 lg:pb-6">
          {children}
        </main>
      </div>
    </div>
  )
}
