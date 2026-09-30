import { Navigate, useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import { useAuthStore } from '../store'

export default function LoginPage() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const login = useAuthStore((s) => s.login)

  if (user) return <Navigate to="/" replace />

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow">
        <h1 className="mb-1 text-2xl font-bold">Pharmacy Admin</h1>
        <p className="mb-4 text-sm text-gray-500">Demo login: any email and a 6+ character password.</p>
        <LoginForm
          onSubmit={(v) => {
            login(v.email)
            navigate('/')
          }}
        />
      </div>
    </div>
  )
}