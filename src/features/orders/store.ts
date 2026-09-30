import { create } from 'zustand'
import { orders as initialOrders } from './data/orders'
import type { Order, OrderStatus } from './types'

type State = {
  orders: Order[]
  updateStatus: (id: number, status: OrderStatus) => void
}

export const useOrderStore = create<State>((set) => ({
  orders: initialOrders,
  updateStatus: (id, status) =>
    set((s) => ({
      orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
    })),
}))