import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
          type="password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register('password')}
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