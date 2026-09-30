import { formatCurrency } from '../../../shared/utils/formatCurrency'
import { formatDate } from '../../../shared/utils/formatDate'
import type { Order, OrderStatus } from '../types'
import OrderStatusBadge from './OrderStatusBadge'

type Props = {
  orders: Order[]
  onStatusChange: (id: number, status: OrderStatus) => void
}

const statuses: OrderStatus[] = ['pending', 'shipped', 'delivered', 'cancelled']

export default function OrderTable({ orders, onStatusChange }: Props) {
  if (orders.length === 0) {
    return <p className="rounded-xl bg-white p-6 text-center text-gray-500 shadow">No orders found.</p>
  }

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow">
      <table className="w-full text-left text-sm">
        <thead className="border-b bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3">Order</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Total</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Update</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b last:border-0">
              <td className="px-4 py-3 font-medium">#{o.id}</td>
              <td className="px-4 py-3">{o.customer}</td>
              <td className="px-4 py-3">{formatDate(o.date)}</td>
              <td className="px-4 py-3">{formatCurrency(o.total)}</td>
              <td className="px-4 py-3"><OrderStatusBadge status={o.status} /></td>
              <td className="px-4 py-3">
                <select
                  value={o.status}
                  onChange={(e) => onStatusChange(o.id, e.target.value as OrderStatus)}
                  className="rounded-lg border border-gray-300 px-2 py-1 text-sm capitalize"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}