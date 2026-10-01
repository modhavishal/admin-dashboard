import {
  CalendarDays,
  ChevronDown,
  ShoppingBag,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { formatCurrency } from '../../../shared/utils/formatCurrency'
import { formatDate } from '../../../shared/utils/formatDate'

import type { Order, OrderStatus } from '../types'
import { allowedOrderStatusTransitions } from '../types'
import { orderStatusStyles } from './OrderStatusBadge'

type Props = {
  orders: Order[]
  onStatusChange: (id: number, status: OrderStatus) => void
}

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

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                Manage
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

                {/* Manage */}
                <td className="px-6 py-4">
                  <div className="flex justify-end">
                    <OrderStatusControl
                      order={order}
                      onStatusChange={onStatusChange}
                    />
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

function OrderStatusControl({
  order,
  onStatusChange,
}: {
  order: Order
  onStatusChange: Props['onStatusChange']
}) {
  const [isOpen, setIsOpen] = useState(false)
  const controlRef = useRef<HTMLDivElement>(null)
  const nextStatuses = allowedOrderStatusTransitions[order.status]

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!controlRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div ref={controlRef} className="relative">
      <button
        type="button"
        disabled={nextStatuses.length === 0}
        aria-label={
          nextStatuses.length === 0
            ? `${order.status} status is final`
            : `Update ${order.status} order status`
        }
        aria-haspopup={nextStatuses.length > 0 ? 'menu' : undefined}
        aria-expanded={nextStatuses.length > 0 ? isOpen : undefined}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setIsOpen(false)
        }}
        className={`inline-flex h-9 items-center gap-2 rounded-full px-3 text-xs font-semibold capitalize transition focus:outline-none focus:ring-4 focus:ring-blue-500/10 ${orderStatusStyles[order.status]} ${nextStatuses.length > 0 ? 'cursor-pointer hover:brightness-95' : 'cursor-not-allowed opacity-75'}`}
      >
        {order.status}
        {nextStatuses.length > 0 && <ChevronDown size={14} />}
      </button>

      {isOpen && nextStatuses.length > 0 && (
        <div
          role="menu"
          aria-label={`Next status for order ${order.id}`}
          className="absolute right-0 top-full z-30 mt-2 min-w-40 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg shadow-slate-900/10"
        >
          {nextStatuses.map((nextStatus: OrderStatus) => (
            <button
              key={nextStatus}
              type="button"
              role="menuitem"
              onClick={() => {
                onStatusChange(order.id, nextStatus)
                setIsOpen(false)
              }}
              className="flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left text-sm capitalize text-slate-700 transition hover:bg-slate-50"
            >
              <span>Move to</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${orderStatusStyles[nextStatus]}`}
              >
                {nextStatus}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}