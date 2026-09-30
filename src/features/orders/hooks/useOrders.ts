import { useMemo } from 'react'
import { useOrderStore } from '../store'
import type { OrderStatus } from '../types'

export function useOrders(status: OrderStatus | 'all') {
  const orders = useOrderStore((s) => s.orders)
  return useMemo(
    () => (status === 'all' ? orders : orders.filter((o) => o.status === status)),
    [orders, status],
  )
}   