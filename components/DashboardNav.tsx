'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ClipboardList, BookOpen, Settings } from 'lucide-react'

const navItems = [
  {
    name: 'Procedures',
    href: '/dashboard',
    icon: ClipboardList,
  },
  {
    name: 'Learning Library',
    href: '/dashboard/library',
    icon: BookOpen,
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
    <nav className="p-4 space-y-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}
