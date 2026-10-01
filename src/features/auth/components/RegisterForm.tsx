import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import Button from '../../../shared/components/ui/Button'
import Input from '../../../shared/components/ui/Input'
import { registerSchema, type RegisterFormValues } from '../schema'

export default function RegisterForm({
  onSubmit,
  onLogin,
}: {
  onSubmit: (values: RegisterFormValues) => Promise<void>
  onLogin: () => void
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input label="Name" autoComplete="name" placeholder="Your name" error={errors.name?.message} {...register('name')} />
      <Input label="Email address" type="email" autoComplete="email" placeholder="Enter your email address" error={errors.email?.message} {...register('email')} />
      <Input
        label="Password"
        type={showPassword ? 'text' : 'password'}
        autoComplete="new-password"
        placeholder="At least 6 characters"
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
      <Input
        label="Confirm password"
        type={showConfirmPassword ? 'text' : 'password'}
        autoComplete="new-password"
        placeholder="Re-enter your password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
        trailingAdornment={(
          <button
            type="button"
            onClick={() => setShowConfirmPassword((visible) => !visible)}
            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            aria-pressed={showConfirmPassword}
            className="flex h-9 w-9 items-center justify-center text-slate-500 hover:text-slate-800 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Creating account...' : 'Create account'}
      </Button>
      <p className="text-center text-sm text-slate-500">
        Already registered?{' '}
        <button type="button" onClick={onLogin} className="font-semibold text-blue-600 hover:text-blue-700">
          Sign in
        </button>
      </p>
    </form>
  )
}