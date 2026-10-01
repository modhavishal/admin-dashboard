import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Button from '../../../shared/components/ui/Button'
import Input from '../../../shared/components/ui/Input'
import { changeAccountPassword } from '../firebase'
import { passwordChangeSchema, type PasswordChangeFormValues } from '../schema'

type PasswordField = 'currentPassword' | 'newPassword' | 'confirmPassword'

export default function PasswordChangeForm() {
  const [visibleFields, setVisibleFields] = useState<Record<PasswordField, boolean>>({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordChangeFormValues>({ resolver: zodResolver(passwordChangeSchema) })

  const toggleVisibility = (field: PasswordField) => {
    setVisibleFields((current) => ({ ...current, [field]: !current[field] }))
  }

  const handleChangePassword = async ({ currentPassword, newPassword }: PasswordChangeFormValues) => {
    try {
      await changeAccountPassword(currentPassword, newPassword)
      reset()
      toast.success('Password changed successfully.')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to change your password.')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleChangePassword)} className="max-w-xl space-y-5">
      <p className="text-sm leading-6 text-slate-500">
        Confirm your current password before choosing a new one.
      </p>
      <PasswordField
        label="Current password *"
        autoComplete="current-password"
         placeholder="Current password"
        error={errors.currentPassword?.message}
        visible={visibleFields.currentPassword}
        onToggle={() => toggleVisibility('currentPassword')}
        {...register('currentPassword')}
      />
      <PasswordField
        label="New password *"
        autoComplete="new-password"
        placeholder="At least 8 characters"
        error={errors.newPassword?.message}
        visible={visibleFields.newPassword}
        onToggle={() => toggleVisibility('newPassword')}
        {...register('newPassword')}
      />
      <PasswordField
        label="Confirm new password *"
        autoComplete="new-password"
        placeholder="Re-enter your new password"
        error={errors.confirmPassword?.message}
        visible={visibleFields.confirmPassword}
        onToggle={() => toggleVisibility('confirmPassword')}
        {...register('confirmPassword')}
      />
      <div className="pt-1">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Updating password...' : 'Update password'}
        </Button>
      </div>
    </form>
  )
}

type PasswordFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
  visible: boolean
  onToggle: () => void
}

function PasswordField({ label, error, visible, onToggle, ...inputProps }: PasswordFieldProps) {
  return (
    <Input
      label={label}
      type={visible ? 'text' : 'password'}
      required
      error={error}
      {...inputProps}
      trailingAdornment={(
      <button
        type="button"
        onClick={onToggle}
        aria-label={visible ? `Hide ${label.replace(' *', '').toLowerCase()}` : `Show ${label.replace(' *', '').toLowerCase()}`}
        aria-pressed={visible}
        className="flex h-9 w-9 items-center justify-center text-slate-500 hover:text-slate-800 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
      )}
    />
  )
}