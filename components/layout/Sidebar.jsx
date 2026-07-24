'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/applications', label: 'Applications' },
  ]

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 fixed top-0 left-0 flex flex-col">
      
      {/* Logo */}
      <div className="h-16 flex items-center px-6">
        <Link href="/dashboard" className="text-xl font-bold text-slate-900">JobFlow</Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === link.href
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-slate-200">
        <p className="text-xs text-slate-400 text-center">JobFlow V1</p>
      </div>

    </aside>
  )
}