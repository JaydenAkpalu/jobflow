'use client'

// imports
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ApplicationsPage() {
  // state — applications list, loading, error, search and filter controls
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // holds the id of the application pending deletion, or null if no modal is showing
  // storing the id (not just true/false) lets the modal know WHICH application to delete
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)

  // fetch all applications when the page first loads
  useEffect(() => {
    async function fetchApplications() {
      try {
        const response = await fetch('/api/applications')
        const data = await response.json()
        setApplications(data.applications)
      } catch (err) {
        setError('Failed to load applications')
      } finally {
        // always set loading to false whether fetch succeeded or failed
        setLoading(false)
      }
    }
    fetchApplications()
  }, []) // empty array — run once on mount, never again

  // filter applications client-side based on search query and status filter
  // this runs on every render so the list updates instantly as the user types
  const filteredApplications = applications.filter((application) => {
    // match company name or job title — case insensitive
    const matchesSearch =
      searchQuery === '' ||
      application.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.job_title.toLowerCase().includes(searchQuery.toLowerCase())

    // match status exactly — empty string means no filter applied
    const matchesStatus =
      statusFilter === '' || application.status === statusFilter

    // only include application if both conditions pass
    return matchesSearch && matchesStatus
  })

  // clicking the Delete button no longer deletes immediately —
  // it just opens the modal by storing which application id is pending deletion
  function handleDeleteClick(id) {
    setConfirmDeleteId(id)
  }

  // the actual delete — only runs when the user confirms inside the modal
  async function handleDelete() {
    await fetch(`/api/applications/${confirmDeleteId}`, { method: 'DELETE' })
    // remove the deleted application from state immediately (optimistic UI)
    setApplications(applications.filter((app) => app.id !== confirmDeleteId))
    // close the modal
    setConfirmDeleteId(null)
  }

  // closes the modal without deleting anything
  function handleCancelDelete() {
    setConfirmDeleteId(null)
  }

  return (
    <div className="p-6">

      {/* Header — page title and add button */}
      <div className="flex items-center justify-end mb-6">
        <Link
          href="/applications/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          + Add Application
        </Link>
      </div>

      {/* Filters — search input and status dropdown */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by company or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none"
        >
          <option value="">All Statuses</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
          <option value="ghosted">Ghosted</option>
        </select>
      </div>

      {/* Loading state — shown while fetch is in progress */}
      {loading && (
        <div className="text-center py-12 text-slate-500">
          Loading applications...
        </div>
      )}

      {/* Error state — shown if fetch failed */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-6">
          {error}
        </div>
      )}

      {/* No applications at all */}
      {!loading && !error && applications.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 mb-4">No applications yet.</p>
          <Link
            href="/applications/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Add your first application
          </Link>
        </div>
      )}

      {/* Has applications but none match filter */}
      {!loading && !error && applications.length > 0 && filteredApplications.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No applications match your search or filter</p>
        </div>
      )}

      {/* Applications list — rendered when data is loaded and results exist */}
      {!loading && !error && filteredApplications.length > 0 && (
        <div className="space-y-3">
          {filteredApplications.map((application) => (
            <div
              key={application.id}
              className="bg-white border border-slate-200 rounded-lg p-4 flex items-center justify-between hover:border-slate-300 transition-colors"
            >
              {/* Application info — company, status badge, role, date */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-slate-900 capitalize">
                    {application.company_name}
                  </h3>
                  {/* Status badge — color changes based on status value */}
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    application.status === 'applied' ? 'bg-blue-50 text-blue-600' :
                    application.status === 'interview' ? 'bg-yellow-50 text-yellow-600' :
                    application.status === 'offer' ? 'bg-green-50 text-green-600' :
                    application.status === 'rejected' ? 'bg-red-50 text-red-600' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {/* Capitalise first letter of status for display */}
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-slate-500 capitalize">{application.job_title}</p>
                <p className="text-xs text-slate-400 mt-1">{application.applied_date}</p>
              </div>

              {/* Action buttons — view, edit, delete */}
              <div className="flex items-center gap-2 ml-4">
                <Link
                  href={`/applications/${application.id}`}
                  className="text-sm text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  View
                </Link>
                <Link
                  href={`/applications/${application.id}/edit`}
                  className="text-sm text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Edit
                </Link>
                {/* now opens the modal instead of deleting immediately */}
                <button
                  onClick={() => handleDeleteClick(application.id)}
                  className="text-sm text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirmation modal — only renders when confirmDeleteId is not null */}
      {/* fixed + inset-0 covers the entire viewport; bg-black/40 dims the page behind it */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
            <h3 className="font-semibold text-slate-900 mb-2">Delete this application?</h3>
            <p className="text-sm text-slate-500 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}