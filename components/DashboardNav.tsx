'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ClipboardList, FileText, Wrench, Settings, Pill, GraduationCap } from 'lucide-react'

const navItems = [
  {
    name: 'Procedures',
    href: '/dashboard',
    icon: ClipboardList,
  },
  {
    name: 'PDFs',
    href: '/dashboard/library',
    icon: FileText,
  },
  {
    name: 'Toolbox',
    href: '/dashboard/toolbox',
    icon: Wrench,
  },
  {
    name: 'Meds',
    href: '/dashboard/anticoagulation',
    icon: Pill,
  },
  {
    name: 'Syllabus',
    href: '/dashboard/syllabus',
    icon: GraduationCap,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export default function DashboardNav() {
  const pathname = usePathname()

  return (
    <>
      {/* DESKTOP: Sidebar (links) */}
      <nav className="hidden lg:block p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-purple-50 text-purple-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* MOBILE: Bottom Navigation Bar */}
      <nav 
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-safe"
      >
        <div className="grid grid-cols-6 py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center py-1 gap-0.5 transition-colors ${
                  isActive
                    ? 'text-purple-600'
                    : 'text-gray-500'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'scale-110' : ''}`} />
                <span className="text-[9px] font-medium leading-tight">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
