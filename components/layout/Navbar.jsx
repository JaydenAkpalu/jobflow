'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function Navbar({ pageTitle }) {
  const supabase = createClient()
  const router = useRouter()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 fixed top-0 right-0 left-64 z-10">
      <h1 className="text-lg font-semibold text-slate-900">{pageTitle}</h1>
      <button
        onClick={handleLogout}
        className="text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer transition-colors"
      >
        Logout
      </button>
    </header>
  )
}