import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '../../../shared/components/ui/Button'
import Input from '../../../shared/components/ui/Input'
import { productSchema, type ProductFormValues } from '../schema'

type Props = {
  defaultValues?: ProductFormValues
  onSubmit: (values: ProductFormValues) => void
  onCancel: () => void
}

const emptyValues: ProductFormValues = { name: '', category: '', stock: 0, price: 0 }

export default function ProductForm({ defaultValues, onSubmit, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues ?? emptyValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Input label="Name" error={errors.name?.message} {...register('name')} />
      <Input label="Category" error={errors.category?.message} {...register('category')} />
      <Input
        label="Stock"
        type="number"
        error={errors.stock?.message}
        {...register('stock', { valueAsNumber: true })}
      />
      <Input
        label="Price (₹)"
        type="number"
        step="0.01"
        error={errors.price?.message}
        {...register('price', { valueAsNumber: true })}
      />
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}