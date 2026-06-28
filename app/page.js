import Link from 'next/link'

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
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-6">
            Built for job seekers
          </span>
          <h1 className="text-5xl font-bold text-slate-900 leading-tight mb-6">
            All your job applications.<br />
            One place.
          </h1>
          <p className="text-xl text-slate-500 mb-10 max-w-xl mx-auto">
            JobFlow brings all your job applications from LinkedIn, Handshake, Indeed, company websites, and anywhere else you apply — into one central dashboard.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/signup"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-lg"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="text-slate-600 px-8 py-3 rounded-lg font-medium hover:text-slate-900 transition-colors text-lg border border-slate-200 hover:border-slate-300"
            >
              Log In
            </Link>
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