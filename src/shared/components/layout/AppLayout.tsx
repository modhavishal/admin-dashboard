import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function AppLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    if (!mobileNavOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileNavOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mobileNavOpen])

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <Sidebar
        mobileOpen={mobileNavOpen}
        onMobileClose={() => setMobileNavOpen(false)}
      />

      {mobileNavOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 bg-slate-950/40 md:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      {/* Main area */}
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden p-3 sm:p-4">
        <header className="mb-3 flex h-11 shrink-0 items-center gap-3 md:hidden">
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-controls="app-sidebar"
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm"
          >
            <Menu size={20} />
          </button>
          <span className="text-sm font-bold text-slate-900">PharmaCare</span>
        </header>

        <div className="min-h-0 flex-1 overflow-hidden rounded-3xl bg-white">
          <div className="h-full overflow-y-auto overflow-x-hidden">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}