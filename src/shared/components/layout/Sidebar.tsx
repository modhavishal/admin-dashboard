import { NavLink } from 'react-router-dom'
import { useAuthStore } from '../../../features/auth'

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/products', label: 'Products' },
  { to: '/orders', label: 'Orders' },
]

export default function Sidebar() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  return (
    <aside className="flex w-56 shrink-0 flex-col bg-slate-900 p-4 text-white">
      <h2 className="mb-6 text-xl font-bold">Pharmacy Admin</h2>
      <nav className="flex flex-col gap-1">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm ${isActive ? 'bg-blue-600' : 'hover:bg-slate-800'}`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto border-t border-slate-700 pt-4 text-sm">
        <p className="truncate text-slate-300">{user?.email}</p>
        <button onClick={logout} className="mt-2 text-red-300 hover:text-red-200">
          Logout
        </button>
      </div>
    </aside>
  )
}