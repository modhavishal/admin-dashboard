import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { LoaderCircle } from 'lucide-react'
import { useAuthStore } from '../store'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const user = useAuthStore((s) => s.user)
  const isLoading = useAuthStore((s) => s.isLoading)

  if (isLoading) {
    return (
      <div role="status" className="flex min-h-screen items-center justify-center">
        <LoaderCircle size={28} aria-hidden="true" className="animate-spin text-blue-600" />
        <span className="sr-only">Checking session...</span>
      </div>
    )
  }
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}