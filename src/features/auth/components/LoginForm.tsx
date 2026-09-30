import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '../../../shared/components/ui/Button'
import Input from '../../../shared/components/ui/Input'
import { loginSchema, type LoginFormValues } from '../schema'

export default function LoginForm({ onSubmit }: { onSubmit: (v: LoginFormValues) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
      <Input label="Password" type="password" error={errors.password?.message} {...register('password')} />
      <Button type="submit" className="w-full">Sign in</Button>
    </form>
  )
}