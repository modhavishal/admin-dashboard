import { create } from 'zustand'
import { orders as initialOrders } from './data/orders'
import { allowedOrderStatusTransitions, type Order, type OrderStatus } from './types'

type State = {
  orders: Order[]
  updateStatus: (id: number, status: OrderStatus) => void
}

export const useOrderStore = create<State>((set) => ({
  orders: initialOrders,
  updateStatus: (id, status) =>
    set((state) => {
      const order = state.orders.find((item) => item.id === id)
      if (!order || !allowedOrderStatusTransitions[order.status].includes(status)) {
        return state
      }

      return {
        orders: state.orders.map((item) =>
          item.id === id ? { ...item, status } : item,
        ),
      }
    }),
}))