import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../../../features/auth";
import { signOutAccount } from "../../../features/auth/firebase";

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
import Modal from "../ui/Modal";
import Button from "../ui/Button";

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

export default function Sidebar({
  mobileOpen,
  onMobileClose,
}: {
  mobileOpen: boolean;
  onMobileClose: () => void;
}) {
  const user = useAuthStore((s) => s.user);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      await signOutAccount();
      setShowLogoutConfirm(false);
      toast.success("Signed out successfully.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to sign out.");
    }
  };

  return (
    <aside
      id="app-sidebar"
      className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-72 shrink-0 flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-200 md:relative md:z-auto md:h-screen md:w-64 md:translate-x-0 md:shadow-none ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
    >

      {/* Logo */}
      <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
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
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onMobileClose}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 md:hidden"
        >
          <X size={19} />
        </button>
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
              onNavigate={onMobileClose}
            />
          ))}
        </div>
      </nav>

      {/* User section */}
      <div className="border-t border-slate-100 p-4">

        <Link
          to="/profile"
          aria-label="Open profile settings"
          title="Profile settings"
          onClick={onMobileClose}
          className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3 transition hover:bg-slate-100"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
            {user?.email?.charAt(0).toUpperCase() || "A"}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-slate-800">
              {user?.name || "Admin"}
            </p>

            <p className="truncate text-[11px] text-slate-400">
              {user?.email}
            </p>
          </div>
        </Link>


        {/* Logout action */}
        <div>
          {/* Logout button */}
          <button
            type="button"
            onClick={() => {
              onMobileClose();
              setShowLogoutConfirm((prev) => !prev);
            }}
            aria-label="Logout"
            title="Logout"
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

      <Modal
        open={showLogoutConfirm}
        title="Confirm logout"
        onClose={() => setShowLogoutConfirm(false)}
      >
        <div className="space-y-6">
          <div className="flex flex-col items-center py-2 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <AlertTriangle size={25} />
            </div>
            <p className="text-base font-semibold text-slate-900">
              Are you sure you want to log out?
            </p>
            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
              You will need to sign in again to access your dashboard.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={() => setShowLogoutConfirm(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="danger"
              className="flex-1"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </Modal>

    </aside>
  );
}

function SidebarLink({
  to,
  label,
  icon: Icon,
  onNavigate,
}: {
  to: string;
  label: string;
  icon: React.ElementType;
  onNavigate: () => void;
}) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      title={label}
      onClick={onNavigate}
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