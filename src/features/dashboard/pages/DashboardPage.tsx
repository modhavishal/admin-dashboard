import {
  CalendarDays,
  TrendingUp,
  Package,
  AlertTriangle,
  ShoppingCart,
  IndianRupee,
  ArrowUpRight,
} from 'lucide-react'

import StatCard from '../components/StatCard'
import SalesChart from '../components/SalesChart'
import LowStockList from '../components/LowStockList'
import OrderStatusChart from '../components/OrderStatusChart'
import InventoryChart from '../components/InventoryChart'

import { useProductStore } from '../../products'
import { useOrderStore } from '../../orders'
import { formatCurrency } from '../../../shared/utils/formatCurrency'

export default function DashboardPage() {
  const products = useProductStore((s) => s.products)
  const orders = useOrderStore((s) => s.orders)

  // -----------------------------
  // Dashboard calculations
  // -----------------------------

  const lowStockProducts = products.filter(
    (product) => product.stock < 20,
  )

  const pendingOrders = orders.filter(
    (order) => order.status === 'pending',
  ).length

  const deliveredOrders = orders.filter(
    (order) => order.status === 'delivered',
  ).length

  const revenue = orders
    .filter((order) => order.status === 'delivered')
    .reduce((sum, order) => sum + order.total, 0)

  return (
    <div className="min-h-screen bg-slate-100">

      {/* =====================================================
          MAIN DASHBOARD WRAPPER
      ====================================================== */}
      <div className="mx-auto min-h-[calc(100vh-2.5rem)] max-w-[1600px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        {/* =====================================================
            HEADER
        ====================================================== */}
        <header className="border-b border-slate-200 bg-white px-5 py-6 sm:px-7 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

            {/* Title */}
            <div>
              <div className="mb-1.5 flex items-center gap-2.5">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">
                  Dashboard
                </h1>

                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold tracking-wide text-emerald-600">
                  LIVE
                </span>
              </div>

              <p className="text-sm text-slate-500">
                Here's what's happening with your pharmacy today.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">

              {/* Date */}
              <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-500 shadow-sm sm:flex">
                <CalendarDays
                  size={17}
                  strokeWidth={1.8}
                />

                <span>
                  Sep 30, 2026
                </span>
              </div>

              {/* Reports */}
              <button
                type="button"
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-slate-900
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-slate-800
                  active:scale-[0.98]
                "
              >
                <TrendingUp
                  size={16}
                  strokeWidth={2}
                />

                Reports
              </button>
            </div>
          </div>
        </header>

        {/* =====================================================
            DASHBOARD BODY
        ====================================================== */}
        <main className="bg-slate-50/80 p-4 sm:p-6 lg:p-8">

          <div className="space-y-6">

            {/* =================================================
                STAT CARDS
            ================================================== */}
            <section>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <StatCard
                  title="Total products"
                  value={products.length}
                  description="Products in inventory"
                  icon={Package}
                  iconClassName="bg-blue-50 text-blue-600"
                  trend="+12.5%"
                />

                <StatCard
                  title="Low stock"
                  value={lowStockProducts.length}
                  description="Products need attention"
                  icon={AlertTriangle}
                  iconClassName="bg-amber-50 text-amber-600"
                  trend="Needs action"
                  warning
                />

                <StatCard
                  title="Pending orders"
                  value={pendingOrders}
                  description="Orders waiting"
                  icon={ShoppingCart}
                  iconClassName="bg-violet-50 text-violet-600"
                  trend={`${deliveredOrders} delivered`}
                />

                <StatCard
                  title="Revenue"
                  value={formatCurrency(revenue)}
                  description="From delivered orders"
                  icon={IndianRupee}
                  iconClassName="bg-emerald-50 text-emerald-600"
                  trend="+8.4%"
                />

              </div>
            </section>

            {/* =================================================
                REVENUE + ORDER STATUS
            ================================================== */}
            <section>
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                {/* Revenue */}
                <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">

                  {/* Card Header */}
                  <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:px-6">

                    <div>
                      <h2 className="text-base font-bold text-slate-900">
                        Revenue overview
                      </h2>

                      <p className="mt-1 text-xs text-slate-400">
                        Track your pharmacy sales performance
                      </p>
                    </div>

                    <select
                      className="
                        h-9
                        rounded-lg
                        border
                        border-slate-200
                        bg-white
                        px-3
                        text-xs
                        font-medium
                        text-slate-600
                        outline-none
                        transition
                        focus:border-blue-400
                        focus:ring-2
                        focus:ring-blue-100
                      "
                    >
                      <option>This month</option>
                      <option>Last month</option>
                      <option>This year</option>
                    </select>
                  </div>

                  {/* Chart */}
                  <div className="p-4 sm:p-6">
                    <SalesChart />
                  </div>
                </div>

                {/* Order Status */}
                <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                  <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
                    <h2 className="text-base font-bold text-slate-900">
                      Order status
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Current order distribution
                    </p>
                  </div>

                  <div className="p-4 sm:p-5">
                    <OrderStatusChart orders={orders} />
                  </div>
                </div>

              </div>
            </section>

            {/* =================================================
                INVENTORY + LOW STOCK
            ================================================== */}
            <section>
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                {/* Inventory */}
                <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">

                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">

                    <div>
                      <h2 className="text-base font-bold text-slate-900">
                        Inventory overview
                      </h2>

                      <p className="mt-1 text-xs text-slate-400">
                        Current stock levels
                      </p>
                    </div>

                    <button
                      type="button"
                      className="flex items-center gap-1 text-xs font-semibold text-blue-600 transition hover:text-blue-700"
                    >
                      View inventory

                      <ArrowUpRight size={14} />
                    </button>
                  </div>

                  <div className="p-4 sm:p-6">
                    <InventoryChart products={products} />
                  </div>
                </div>

                {/* Low Stock */}
                <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

                    <div>
                      <h2 className="text-base font-bold text-slate-900">
                        Low stock alerts
                      </h2>

                      <p className="mt-1 text-xs text-slate-400">
                        Restocking required
                      </p>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                      <AlertTriangle
                        size={17}
                        strokeWidth={2}
                      />
                    </div>
                  </div>

                  <div className="p-5">
                    {lowStockProducts.length > 0 ? (
                      <LowStockList
                        products={lowStockProducts}
                      />
                    ) : (
                      <div className="flex min-h-[180px] flex-col items-center justify-center text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                          ✓
                        </div>

                        <p className="text-sm font-semibold text-slate-800">
                          Inventory looks good
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          No products need restocking.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </section>

            {/* =================================================
                BOTTOM SUMMARY
            ================================================== */}
            <section>
              <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 sm:p-6">

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                  <div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                        <TrendingUp size={16} />
                      </div>

                      <h3 className="text-sm font-bold text-slate-900">
                        Pharmacy performance
                      </h3>
                    </div>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      You currently have{' '}
                      <span className="font-semibold text-slate-700">
                        {products.length} products
                      </span>{' '}
                      in inventory and{' '}
                      <span className="font-semibold text-slate-700">
                        {pendingOrders} pending orders
                      </span>
                      .
                    </p>
                  </div>

                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 self-start rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-blue-600 shadow-sm ring-1 ring-blue-100 transition hover:bg-blue-50 sm:self-auto"
                  >
                    View analytics
                    <ArrowUpRight size={14} />
                  </button>

                </div>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  )
}