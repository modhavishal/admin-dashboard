import { useState } from 'react'
import {
  ShoppingCart,
  Clock3,
  Truck,
  CheckCircle2,
} from 'lucide-react'

import OrderTable from '../components/OrderTable'
import { useOrders } from '../hooks/useOrders'
import { useOrderStore } from '../store'
import type { OrderStatus } from '../types'

const tabs: (OrderStatus | 'all')[] = [
  'all',
  'pending',
  'shipped',
  'delivered',
  'cancelled',
]

export default function OrdersPage() {
  const [status, setStatus] = useState<OrderStatus | 'all'>('all')

  const orders = useOrders(status)
  const allOrders = useOrderStore((s) => s.orders)
  const updateStatus = useOrderStore((s) => s.updateStatus)

  const pendingOrders = allOrders.filter(
    (order) => order.status === 'pending',
  ).length

  const shippedOrders = allOrders.filter(
    (order) => order.status === 'shipped',
  ).length

  const deliveredOrders = allOrders.filter(
    (order) => order.status === 'delivered',
  ).length

  const stats = [
    {
      title: 'Total orders',
      value: allOrders.length,
      description: 'All pharmacy orders',
      icon: ShoppingCart,
      iconClass: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Pending',
      value: pendingOrders,
      description: 'Waiting for processing',
      icon: Clock3,
      iconClass: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Shipped',
      value: shippedOrders,
      description: 'Orders on the way',
      icon: Truck,
      iconClass: 'bg-violet-50 text-violet-600',
    },
    {
      title: 'Delivered',
      value: deliveredOrders,
      description: 'Successfully delivered',
      icon: CheckCircle2,
      iconClass: 'bg-emerald-50 text-emerald-600',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-100">

      {/* =====================================================
          MAIN WRAPPER — SAME AS DASHBOARD
      ====================================================== */}
      <div className="mx-auto min-h-[calc(100vh-2.5rem)] max-w-[1600px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        {/* =====================================================
            HEADER — SAME AS DASHBOARD
        ====================================================== */}
        <header className="border-b border-slate-200 bg-white px-5 py-6 sm:px-7 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

            {/* Title */}
            <div>
              <div className="mb-1.5 flex items-center gap-2.5">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">
                  Orders
                </h1>

                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold tracking-wide text-blue-600">
                  ORDERS
                </span>
              </div>

              <p className="text-sm text-slate-500">
                Manage pharmacy orders and track their status.
              </p>
            </div>

          </div>
        </header>

        {/* =====================================================
            MAIN — SAME AS DASHBOARD
        ====================================================== */}
        <main className="bg-slate-50/80 p-4 sm:p-6 lg:p-8">

          {/* =================================================
              STAT CARDS
          ================================================== */}
          <section>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

              {stats.map((stat) => {
                const Icon = stat.icon

                return (
                  <div
                    key={stat.title}
                    className="
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      p-5
                      shadow-sm
                      transition
                      duration-200
                      hover:-translate-y-0.5
                      hover:shadow-md
                    "
                  >
                    <div className="flex items-start justify-between">

                      <div>
                        <p className="text-sm font-medium text-slate-500">
                          {stat.title}
                        </p>

                        <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                          {stat.value}
                        </p>
                      </div>

                      <div
                        className={`
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          rounded-xl
                          ${stat.iconClass}
                        `}
                      >
                        <Icon size={21} strokeWidth={2} />
                      </div>

                    </div>

                    <p className="mt-4 text-xs font-medium text-slate-400">
                      {stat.description}
                    </p>
                  </div>
                )
              })}

            </div>
          </section>

          {/* =================================================
              ORDER MANAGEMENT
          ================================================== */}
          <section className="mt-6">

            {/* Tabs */}
            <div className="mb-4 flex flex-wrap items-center gap-2">

              {tabs.map((tab) => {
                const isActive = status === tab

                const count =
                  tab === 'all'
                    ? allOrders.length
                    : allOrders.filter(
                        (order) => order.status === tab,
                      ).length

                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setStatus(tab)}
                    className={`
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      capitalize
                      transition
                      ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                      }
                    `}
                  >
                    {tab}

                    <span
                      className={`
                        rounded-full
                        px-1.5
                        py-0.5
                        text-[11px]
                        ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 text-slate-500'
                        }
                      `}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}

            </div>

            {/* Order Table */}
            <OrderTable
              orders={orders}
              onStatusChange={updateStatus}
            />

          </section>

        </main>
      </div>
    </div>
  )
}