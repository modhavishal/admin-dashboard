import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, type ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { firebaseAuth, onAuthStateChanged, toAppUser } from '../features/auth/firebase'
import { useAuthStore } from '../features/auth/store'

const queryClient = new QueryClient()

function AuthStateSync() {
  const setUser = useAuthStore((state) => state.setUser)
  const setLoading = useAuthStore((state) => state.setLoading)

  useEffect(() => {
    if (!firebaseAuth) {
      setLoading(false)
      return
    }

    return onAuthStateChanged(
      firebaseAuth,
      (firebaseUser) => {
        setUser(firebaseUser ? toAppUser(firebaseUser) : null)
        setLoading(false)
      },
      () => setLoading(false),
    )
  }, [setLoading, setUser])

  return null
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthStateSync />
      <Toaster position="top-right" />
      {children}
    </QueryClientProvider>
  )
}