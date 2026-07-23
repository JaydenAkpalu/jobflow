import Sidebar from '@/components/layout/Sidebar'
import Navbar from '@/components/layout/Navbar'

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="ml-64">
        <Navbar/>
        <main className="pt-16 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}