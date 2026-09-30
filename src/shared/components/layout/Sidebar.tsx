import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../../features/auth";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  LogOut,
  Pill,
  ChevronRight,
  AlertTriangle,
  X,
} from "lucide-react";

const mainLinks = [
  {
    to: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/products",
    label: "Products",
    icon: Package,
  },
  {
    to: "/orders",
    label: "Orders",
    icon: ShoppingCart,
  },
];

export default function Sidebar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
  };

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">

      {/* Logo */}
      <div className="flex h-20 items-center border-b border-slate-100 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <Pill size={21} strokeWidth={2.2} />
          </div>

          <div>
            <h1 className="text-[15px] font-bold tracking-tight text-slate-900">
              PharmaCare
            </h1>

            <p className="text-[11px] font-medium text-slate-400">
              Admin Portal
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
          Main Menu
        </p>

        <div className="space-y-1">
          {mainLinks.map((link) => (
            <SidebarLink
              key={link.to}
              to={link.to}
              label={link.label}
              icon={link.icon}
            />
          ))}
        </div>
      </nav>

      {/* User section */}
      <div className="border-t border-slate-100 p-4">

        <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
            {user?.email?.charAt(0).toUpperCase() || "A"}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-800">
              Admin
            </p>

            <p className="truncate text-[11px] text-slate-400">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Logout area */}
        <div className="relative">

          {/* Confirmation Dropup */}
          {showLogoutConfirm && (
            <div
              className="
                absolute
                bottom-full
                left-0
                z-50
                mb-2
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                p-3
                shadow-xl
                shadow-slate-900/10
              "
            >
              <div className="flex items-start gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                  <AlertTriangle size={16} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900">
                    Logout?
                  </p>

                  <p className="mt-0.5 text-[11px] leading-4 text-slate-400">
                    Are you sure you want to logout?
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowLogoutConfirm(false)}
                  className="ml-auto shrink-0 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowLogoutConfirm(false)}
                  className="
                    flex-1
                    rounded-lg
                    border
                    border-slate-200
                    px-2.5
                    py-2
                    text-xs
                    font-semibold
                    text-slate-600
                    transition
                    hover:bg-slate-50
                  "
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex-1
                    rounded-lg
                    bg-red-600
                    px-2.5
                    py-2
                    text-xs
                    font-semibold
                    text-white
                    transition
                    hover:bg-red-700
                  "
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* Logout button */}
          <button
            type="button"
            onClick={() => setShowLogoutConfirm((prev) => !prev)}
            className={`
              group
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-3
              py-2.5
              text-sm
              font-medium
              transition
              ${
                showLogoutConfirm
                  ? "bg-red-50 text-red-600"
                  : "text-slate-500 hover:bg-red-50 hover:text-red-600"
              }
            `}
          >
            <LogOut
              size={18}
              className="transition group-hover:translate-x-0.5"
            />

            <span>Logout</span>
          </button>

        </div>
      </div>
    </aside>
  );
}

function SidebarLink({
  to,
  label,
  icon: Icon,
}: {
  to: string;
  label: string;
  icon: React.ElementType;
}) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
          isActive
            ? "bg-blue-50 text-blue-600"
            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            size={19}
            strokeWidth={isActive ? 2.3 : 1.9}
            className="shrink-0"
          />

          <span className="flex-1">{label}</span>

          {isActive && (
            <ChevronRight
              size={15}
              strokeWidth={2.5}
              className="text-blue-500"
            />
          )}
        </>
      )}
    </NavLink>
  );
}