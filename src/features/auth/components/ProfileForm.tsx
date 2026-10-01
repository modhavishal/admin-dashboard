import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '../../../shared/components/ui/Button'
import Input from '../../../shared/components/ui/Input'
import { profileSchema, type ProfileFormValues } from '../schema'

export default function ProfileForm({
  user,
  onSave,
  onCancel,
}: {
  user: ProfileFormValues
  onSave: (user: ProfileFormValues) => Promise<void>
  onCancel?: () => void
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: user,
  })

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-4">
      <Input
        label="Name *"
        required
        autoComplete="name"
        placeholder="Your name"
        error={errors.name?.message}
        {...register('name')}
      />
      <Input
        label="Email address *"
        required
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register('email')}
      />
      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save changes'}
        </Button>
      </div>
    </form>
  )
}