import { Link } from 'react-router-dom'
import ForgotPasswordForm from '../components/ForgotPasswordForm'

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
        <div className="flex w-full items-center justify-center px-6 py-10 sm:px-10 lg:w-1/2 lg:px-16 xl:px-20">
          <div className="w-full max-w-md">
            <Link
              to="/login"
              className="mb-8 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Back to login
            </Link>
            <div className="mb-8">
              <h1 className="text-[32px] font-bold tracking-[-0.8px] text-slate-800">
                Reset your password
              </h1>
            </div>
            <ForgotPasswordForm />
          </div>
        </div>

        <div className="relative hidden w-1/2 lg:block">
          <img
            src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=85&w=1200&auto=format&fit=crop"
            alt="Pharmacy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/5" />
          <div className="absolute bottom-8 left-8 right-8">
            <div className="rounded-2xl bg-white/80 p-5 backdrop-blur-md">
              <p className="text-sm font-semibold text-slate-800">
                Your health, our priority.
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Simple and reliable pharmacy management for modern healthcare businesses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}