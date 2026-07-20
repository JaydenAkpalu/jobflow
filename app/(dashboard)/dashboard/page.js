'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function DashboardPage() {
  // states - stats, loading, error
  const [ stats, setStats ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(null)

  // useEffect - fetch dashboard stats when page loads
  useEffect(() => {
    async function fetchDashboard() {
    try {
    const response = await fetch('/api/dashboard/stats')
    const data = await response.json()
    setStats(data)
    } catch(err) {
      setError("Failed to load dashboard")
    } finally {
      setLoading(false)
    }
    }
    fetchDashboard()
  }, [])

  // return jsx
    // total applications count
    // status breakdown
    // 5 most recent applications

    return (
    <div className="p-6">

      {/* Header */}
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard</h1>

      {/* Loading state */}
      {loading && (
        <div className="text-center py-12 text-slate-500">Loading...</div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* Dashboard content */}
      {!loading && !error && stats && (
        <div>

          {/* Total applications card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">
              Total Applications
            </p>
            <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
          </div>

          {/* Status breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">Applied</p>
              <p className="text-2xl font-bold text-blue-600">{stats.by_status.applied}</p>
            </div>

            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4">
              <p className="text-xs font-medium text-yellow-600 uppercase tracking-wide mb-1">Interview</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.by_status.interview}</p>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <p className="text-xs font-medium text-green-600 uppercase tracking-wide mb-1">Offer</p>
              <p className="text-2xl font-bold text-green-600">{stats.by_status.offer}</p>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-xl p-4">
              <p className="text-xs font-medium text-red-600 uppercase tracking-wide mb-1">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{stats.by_status.rejected}</p>
            </div>

            <div className="bg-slate-100 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Ghosted</p>
              <p className="text-2xl font-bold text-slate-600">{stats.by_status.ghosted}</p>
            </div>

          </div>

          {/* Recent applications */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-slate-900">Recent Applications</h2>
              <Link href="/applications" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View all
              </Link>
            </div>

            {stats.recent.length === 0 ? (
              <p className="text-sm text-slate-400">No applications yet.</p>
            ) : (
              <div className="space-y-3">
                {stats.recent.map((application) => (
                  <Link
                    key={application.id}
                    href={`/applications/${application.id}`}
                    className="flex items-center justify-between py-2 hover:bg-slate-50 rounded-lg px-2 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900 capitalize">
                        {application.company_name}
                      </p>
                      <p className="text-xs text-slate-500 capitalize">{application.job_title}</p>
                    </div>
                    <span className="text-xs text-slate-400">{application.applied_date}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  )
    
}