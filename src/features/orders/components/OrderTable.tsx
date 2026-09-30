import {
  AlertCircle,
  CalendarDays,
  ChevronDown,
  ShoppingBag,
} from 'lucide-react'

import { formatCurrency } from '../../../shared/utils/formatCurrency'
import { formatDate } from '../../../shared/utils/formatDate'

import type { Order, OrderStatus } from '../types'
import OrderStatusBadge from './OrderStatusBadge'

type Props = {
  orders: Order[]
  onStatusChange: (id: number, status: OrderStatus) => void
}

const statuses: OrderStatus[] = [
  'pending',
  'shipped',
  'delivered',
  'cancelled',
]

export default function OrderTable({
  orders,
  onStatusChange,
}: Props) {
  if (orders.length === 0) {
    return (
      <div
        className="
          flex
          min-h-[320px]
          flex-col
          items-center
          justify-center
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-6
          text-center
          shadow-sm
        "
      >
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
          <ShoppingBag size={25} />
        </div>

        <h3 className="font-semibold text-slate-900">
          No orders found
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Try selecting another order status.
        </p>
      </div>
    )
  }

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left">

          {/* Header */}
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Order
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Customer
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Date
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Total
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Status
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                Update
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="group transition hover:bg-slate-50/70"
              >
                {/* Order */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <ShoppingBag size={18} />
                    </div>

                    <div>
                      <p className="font-semibold text-slate-800">
                        #{order.id}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-400">
                        Pharmacy order
                      </p>
                    </div>
                  </div>
                </td>

                {/* Customer */}
                <td className="px-6 py-4">
                  <span className="font-medium text-slate-700">
                    {order.customer}
                  </span>
                </td>

                {/* Date */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <CalendarDays
                      size={15}
                      className="text-slate-400"
                    />

                    {formatDate(order.date)}
                  </div>
                </td>

                {/* Total */}
                <td className="px-6 py-4">
                  <span className="font-semibold text-slate-800">
                    {formatCurrency(order.total)}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <OrderStatusBadge status={order.status} />
                </td>

                {/* Update */}
                <td className="px-6 py-4">
                  <div className="flex justify-end">
                    <div className="relative">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          onStatusChange(
                            order.id,
                            e.target.value as OrderStatus,
                          )
                        }
                        className="
                          h-9
                          appearance-none
                          rounded-lg
                          border
                          border-slate-200
                          bg-white
                          py-1
                          pl-3
                          pr-8
                          text-xs
                          font-medium
                          capitalize
                          text-slate-600
                          outline-none
                          transition
                          hover:border-slate-300
                          focus:border-blue-500
                          focus:ring-4
                          focus:ring-blue-500/10
                        "
                      >
                        {statuses.map((item) => (
                          <option
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        ))}
                      </select>

                      <ChevronDown
                        size={14}
                        className="
                          pointer-events-none
                          absolute
                          right-2.5
                          top-1/2
                          -translate-y-1/2
                          text-slate-400
                        "
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 px-6 py-4">
        <p className="text-sm text-slate-500">
          Showing{' '}
          <span className="font-semibold text-slate-700">
            {orders.length}
          </span>{' '}
          orders
        </p>
      </div>
    </div>
  )
}