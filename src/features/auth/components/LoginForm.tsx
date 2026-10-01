import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'

import Button from '../../../shared/components/ui/Button'
import Input from '../../../shared/components/ui/Input'

import {
  loginSchema,
  type LoginFormValues,
} from '../schema'

export default function LoginForm({
  onSubmit,
  onForgotPassword,
  onRegister,
}: {
  onSubmit: (v: LoginFormValues) => Promise<void>
  onForgotPassword: () => void
  onRegister: () => void
}) {
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Email */}
      <Input
        label="Email address"
        type="email"
        placeholder="Enter your email address"
        error={errors.email?.message}
        {...register('email')}
      />

      {/* Password */}
      <div>
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register('password')}
          trailingAdornment={(
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
              className="flex h-9 w-9 items-center justify-center text-slate-500 hover:text-slate-800 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        />

        <div className="mt-2 text-right">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-xs font-medium text-blue-600 transition hover:text-blue-700"
          >
            Forgot password?
          </button>
        </div>
      </div>

      {/* Login */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="
          mt-2
          h-12
          w-full
          rounded-full
          bg-blue-500
          text-sm
          font-semibold
          text-white
          shadow-sm
          transition
          hover:bg-blue-600
          active:scale-[0.99]
        "
      >
        {isSubmitting ? 'Signing in...' : 'Login account'}
      </Button>
      <p className="text-center text-sm text-slate-500">
        New here?{' '}
        <button type="button" onClick={onRegister} className="font-semibold text-blue-600 hover:text-blue-700">
          Create an account
        </button>
      </p>
    </form>
  )
}