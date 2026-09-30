import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <main className="min-w-0 flex-1 overflow-hidden p-3 sm:p-4">
        <div className="h-full overflow-hidden rounded-3xl bg-white">

          <div className="h-full overflow-y-auto overflow-x-hidden">
            <Outlet />
          </div>

        </div>
      </main>

    </div>
  )
}