export type OrderStatus = 'pending' | 'shipped' | 'delivered' | 'cancelled'

export const allowedOrderStatusTransitions: Record<OrderStatus, readonly OrderStatus[]> = {
  pending: ['shipped', 'cancelled'],
  shipped: ['delivered', 'cancelled'],
  delivered: [],
  cancelled: [],
}

export type Order = {
  id: number
  customer: string
  total: number
  status: OrderStatus
  date: string
}