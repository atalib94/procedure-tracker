'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  ClipboardList, FileText, Wrench, Settings, Pill, GraduationCap, Brain,
  Plus, X, Menu, FilePlus, Package
} from 'lucide-react'

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
    name: 'MCQ',
    href: '/dashboard/mcq',
    icon: Brain,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

interface DashboardNavProps {
  isMobileMenuOpen?: boolean
  setIsMobileMenuOpen?: (open: boolean) => void
}

export default function DashboardNav({ isMobileMenuOpen = false, setIsMobileMenuOpen }: DashboardNavProps) {
  const pathname = usePathname()
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false)
  const addMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (addMenuRef.current && !addMenuRef.current.contains(event.target as Node)) {
        setIsAddMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
    setIsAddMenuOpen(false)
  }, [pathname, setIsMobileMenuOpen])

  return (
    <>
      {/* DESKTOP: Sidebar */}
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

      {/* MOBILE: Dropdown Menu */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="lg:hidden fixed inset-0 z-40"
            onClick={() => setIsMobileMenuOpen?.(false)}
          />
          <div className="lg:hidden fixed top-16 right-4 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen?.(false)}
                  className={`flex items-center gap-3 px-4 py-3 transition-colors ${
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
          </div>
        </>
      )}

      {/* MOBILE: Floating Add Button */}
      <div 
        className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        ref={addMenuRef}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {isAddMenuOpen && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col gap-3 items-center mb-2">
            <Link
              href="/dashboard/procedures/new"
              onClick={() => setIsAddMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 bg-white rounded-full shadow-lg border border-gray-200 text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-all whitespace-nowrap"
            >
              <FilePlus className="w-5 h-5" />
              <span className="font-medium">Add Procedure</span>
            </Link>
            
            <Link
              href="/dashboard/toolbox?add=true"
              onClick={() => setIsAddMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 bg-white rounded-full shadow-lg border border-gray-200 text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-all whitespace-nowrap"
            >
              <Package className="w-5 h-5" />
              <span className="font-medium">Add Tool</span>
            </Link>
          </div>
        )}

        <button
          onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
            isAddMenuOpen 
              ? 'bg-gray-800 rotate-45' 
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
          aria-label={isAddMenuOpen ? 'Close menu' : 'Add new'}
        >
          <Plus className="w-7 h-7 text-white" />
        </button>
      </div>

      {/* Backdrop when add menu is open */}
      {isAddMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsAddMenuOpen(false)}
        />
      )}
    </>
  )
}
