import Link from 'next/link'
import { Paperclip } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">

      {/* Navbar */}
      <nav className="border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">JobFlow</span>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex items-center px-6 py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* Left column - text content */}
          <div>
            <h1 className="text-5xl font-bold text-slate-900 leading-tight mb-6">
              Never wonder which<br />
              resume you sent again.
            </h1>
            <p className="text-xl text-slate-500 mb-10">
              Track every application from applied to offer, with the exact resume and cover letter attached — all in one dashboard.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/signup"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-lg"
              >
                Start tracking — free
              </Link>
              <Link
                href="/login"
                className="text-slate-600 px-8 py-3 rounded-lg font-medium hover:text-slate-900 transition-colors text-lg border border-slate-200 hover:border-slate-300"
              >
                Log in
              </Link>
            </div>
          </div>

          {/* Right column - stacked application cards */}
          <div className="relative h-[26rem] max-w-2xl w-full justify-self-center md:justify-self-end group">

            {/* Back card - Northlight */}
            <div className="absolute top-28 right-32 w-80 bg-slate-900 border border-slate-800 rounded-xl p-6 -rotate-[10deg] ">
              <p className="text-base font-medium text-slate-50">Northlight Systems</p>
              <p className="text-sm text-slate-400 mb-4">Backend Eng Intern</p>
              <span className="inline-block text-sm font-medium text-white bg-blue-600 px-3 py-1 rounded-full mb-4">
                Applied
              </span>
              <div className="border-t border-slate-700 pt-3 flex items-center gap-2">
                <Paperclip size={15} className="text-slate-400" />
                <span className="text-xs text-slate-400 font-mono">northlight_backend_resume.pdf</span>
              </div>
              <div className="pt-2 flex items-center gap-2">
                <Paperclip size={15} className="text-slate-400" />
                <span className="text-xs text-slate-400 font-mono">northlight_cover_letter.pdf</span>
              </div>
            </div>

            {/* Middle card - Figma */}
            <div className="absolute top-14 right-20 w-80 bg-slate-900 border border-slate-800 rounded-xl p-6 rotate-[7deg] ">
              <p className="text-base font-medium text-slate-50">Figma</p>
              <p className="text-sm text-slate-400 mb-4">Product Eng Intern</p>
              <span className="inline-block text-sm font-medium text-green-950 bg-green-500 px-3 py-1 rounded-full mb-4">
                Offer
              </span>
              <div className="border-t border-slate-700 pt-3 flex items-center gap-2">
                <Paperclip size={15} className="text-slate-400" />
                <span className="text-xs text-slate-400 font-mono">figma_product_resume.pdf</span>
              </div>
            </div>

            {/* Front card - Google */}
            <div className="absolute top-4 right-3 w-80 bg-slate-900 border border-slate-800 rounded-xl p-7 -rotate-2">
              <p className="text-lg font-medium text-slate-50">Google</p>
              <p className="text-sm text-slate-400 mb-4">Software Engineer Intern</p>
              <span className="inline-block text-sm font-medium text-yellow-950 bg-yellow-500 px-3 py-1 rounded-full mb-4">
                Interview
              </span>
              <div className="border-t border-slate-700 pt-3 flex items-center gap-2">
                <Paperclip size={16} className="text-slate-400" />
                <span className="text-xs text-slate-400 font-mono">google_swe_resume.pdf</span>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 px-6 py-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-slate-400">
          © 2026 JobFlow. Built for job seekers.
        </div>
      </footer>

    </div>
  )
}