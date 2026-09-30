import { create } from 'zustand'
import { products as initialProducts } from './data/products'
import type { Product } from './types'
import type { ProductFormValues } from './schema'

type State = {
  products: Product[]
  addProduct: (values: ProductFormValues) => void
  updateProduct: (id: number, values: ProductFormValues) => void
  deleteProduct: (id: number) => void
}

export const useProductStore = create<State>((set) => ({
  products: initialProducts,
  addProduct: (values) =>
    set((s) => ({ products: [...s.products, { id: Date.now(), ...values }] })),
  updateProduct: (id, values) =>
    set((s) => ({
      products: s.products.map((p) => (p.id === id ? { ...p, ...values } : p)),
    })),
  deleteProduct: (id) =>
    set((s) => ({ products: s.products.filter((p) => p.id !== id) })),
}))