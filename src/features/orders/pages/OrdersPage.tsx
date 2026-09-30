import { useState } from 'react'
import OrderTable from '../components/OrderTable'
import { useOrders } from '../hooks/useOrders'
import { useOrderStore } from '../store'
import type { OrderStatus } from '../types'

const tabs: (OrderStatus | 'all')[] = ['all', 'pending', 'shipped', 'delivered', 'cancelled']

export default function OrdersPage() {
  const [status, setStatus] = useState<OrderStatus | 'all'>('all')
  const orders = useOrders(status)
  const updateStatus = useOrderStore((s) => s.updateStatus)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Orders</h1>

      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setStatus(t)}
            className={`rounded-full px-3 py-1 text-sm capitalize ${
              status === t ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 shadow'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <OrderTable orders={orders} onStatusChange={updateStatus} />
    </div>
  )
}