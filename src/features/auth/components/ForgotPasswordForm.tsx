import { useState } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '../../../shared/components/ui/Button'
import Input from '../../../shared/components/ui/Input'
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '../schema'
import { sendPasswordReset } from '../firebase'

export default function ForgotPasswordForm() {
  const [requestSent, setRequestSent] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  if (requestSent) {
    return (
      <div role="status" className="space-y-4">
        <p className="text-sm leading-6 text-slate-500">
          If an account exists for that email, a password reset link will be sent shortly.
        </p>
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          onClick={() => setRequestSent(false)}
        >
          Use another email
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(async ({ email }) => {
        try {
          await sendPasswordReset(email)
          setRequestSent(true)
          toast.success('If an account exists for that email, a reset link will be sent shortly.')
        } catch (error) {
          toast.error(error instanceof Error ? error.message : 'Unable to send a reset link right now.')
        }
      })}
      className="space-y-4"
    >
      <p className="text-sm leading-6 text-slate-500">
        Enter the email address associated with your account to prepare a reset request.
      </p>
      <Input
        label="Email address"
        type="email"
        autoComplete="email"
        placeholder="Enter your email address"
        error={errors.email?.message}
        {...register('email')}
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send reset link'}
      </Button>
    </form>
  )
}