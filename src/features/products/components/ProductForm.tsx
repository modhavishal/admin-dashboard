import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Package } from 'lucide-react'

import Button from '../../../shared/components/ui/Button'
import Input from '../../../shared/components/ui/Input'
import { productSchema, type ProductFormValues } from '../schema'

type Props = {
  defaultValues?: ProductFormValues
  onSubmit: (values: ProductFormValues) => void
  onCancel: () => void
}

const emptyValues: ProductFormValues = {
  name: '',
  category: '',
  stock: 0,
  price: 0,
}

export default function ProductForm({
  defaultValues,
  onSubmit,
  onCancel,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues ?? emptyValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* Intro */}
      <div className="rounded-xl bg-blue-50 p-4">

        <div className="flex gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <Package size={18} />
          </div>

          <div>
            <p className="text-sm font-semibold text-blue-900">
              Product information
            </p>

            <p className="mt-0.5 text-xs text-blue-600">
              Add the product details below.
            </p>
          </div>

        </div>

      </div>

      {/* Name */}
      <div className="relative">
        <Input
          label="Product name"
          placeholder="e.g. Paracetamol 500mg"
          error={errors.name?.message}
          {...register('name')}
        />
      </div>

      {/* Category */}
      <div>
        <Input
          label="Category"
          placeholder="e.g. Pain Relief"
          error={errors.category?.message}
          {...register('category')}
        />
      </div>

      {/* Stock + Price */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        <div>
          <Input
            label="Stock quantity"
            type="number"
            placeholder="0"
            error={errors.stock?.message}
            {...register('stock', {
              valueAsNumber: true,
            })}
          />
        </div>

        <div>
          <Input
            label="Price (₹)"
            type="number"
            step="0.01"
            placeholder="0.00"
            error={errors.price?.message}
            {...register('price', {
              valueAsNumber: true,
            })}
          />
        </div>

      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">

        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit">
          {defaultValues ? 'Update product' : 'Add product'}
        </Button>

      </div>

    </form>
  )
}