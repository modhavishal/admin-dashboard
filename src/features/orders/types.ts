export type OrderStatus = 'pending' | 'shipped' | 'delivered' | 'cancelled'

export type Order = {
  id: number
  customer: string
  total: number
  status: OrderStatus
  date: string
}