import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  stock: z.number().min(0, 'Stock cannot be negative'),
  price: z.number().positive('Price must be more than 0'),
})

export type ProductFormValues = z.infer<typeof productSchema>