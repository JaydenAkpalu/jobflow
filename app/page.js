import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', color: '#0f172a' }}>

      {/* Navbar */}
      <nav style={{ borderBottom: '1px solid #e2e8f0', padding: '16px 24px' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>JobFlow</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/login" style={{ fontSize: '14px', fontWeight: '500', color: '#64748b', textDecoration: 'none' }}>
              Login
            </Link>
            <Link href="/signup" style={{ fontSize: '14px', fontWeight: '500', backgroundColor: '#2563eb', color: '#ffffff', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none' }}>
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '96px 24px' }}>
        <div style={{ maxWidth: '768px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ display: 'inline-block', fontSize: '14px', fontWeight: '500', color: '#2563eb', backgroundColor: '#eff6ff', padding: '4px 12px', borderRadius: '999px', marginBottom: '24px' }}>
            Built for job seekers
          </span>
          <h1 style={{ fontSize: '48px', fontWeight: '700', color: '#0f172a', lineHeight: '1.2', marginBottom: '24px' }}>
            All your job applications.<br />
            One place.
          </h1>
          <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '40px', maxWidth: '560px', margin: '0 auto 40px' }}>
            JobFlow brings all your job applications from LinkedIn, Handshake, Indeed, company websites, and anywhere else you apply — into one central dashboard.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <Link href="/signup" style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '12px 32px', borderRadius: '8px', fontWeight: '500', textDecoration: 'none', fontSize: '18px' }}>
              Get Started Free
            </Link>
            <Link href="/login" style={{ color: '#64748b', padding: '12px 32px', borderRadius: '8px', fontWeight: '500', textDecoration: 'none', fontSize: '18px', border: '1px solid #e2e8f0' }}>
              Log In
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e2e8f0', padding: '24px' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', textAlign: 'center', fontSize: '14px', color: '#94a3b8' }}>
          © 2026 JobFlow. Built for job seekers.
        </div>
      </footer>

    </div>
  )
}