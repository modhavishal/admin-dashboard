import type { OrderStatus } from '../types'

const styles: Record<OrderStatus, string> = {
  pending:
    'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
  shipped:
    'bg-blue-50 text-blue-700 ring-1 ring-blue-100',
  delivered:
    'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
  cancelled:
    'bg-red-50 text-red-700 ring-1 ring-red-100',
}

export default function OrderStatusBadge({
  status,
}: {
  status: OrderStatus
}) {
  return (
    <span
      className={`
        inline-flex
        rounded-lg
        px-2.5
        py-1
        text-xs
        font-semibold
        capitalize
        ${styles[status]}
      `}
    >
      {status}
    </span>
  )
}