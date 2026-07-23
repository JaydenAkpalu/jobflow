'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter, usePathname } from 'next/navigation'

export default function Navbar() {
  const supabase = createClient()
  const router = useRouter()
  const pathname = usePathname()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  // derive the page title from the current URL path
  function getPageTitle() {
    if (pathname === '/dashboard') return 'Dashboard'
    if (pathname === '/applications') return 'Applications'
    if (pathname === '/applications/new') return 'New Application'
    if (pathname.includes('/edit')) return 'Edit Application'
    if (pathname.startsWith('/applications/')) return 'Application Details'
    return 'JobFlow'
  }

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 fixed top-0 right-0 left-64 z-10">
      <h1 className="text-lg font-semibold text-slate-900">{getPageTitle()}</h1>
      <button
        onClick={handleLogout}
        className="text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer transition-colors"
      >
        Logout
      </button>
    </header>
  )
}