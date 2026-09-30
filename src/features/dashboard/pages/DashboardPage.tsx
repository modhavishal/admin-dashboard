import StatCard from '../components/StatCard'
import SalesChart from '../components/SalesChart'
import LowStockList from '../components/LowStockList'
import { useProductStore } from '../../products'
import { useOrderStore } from '../../orders'
import { formatCurrency } from '../../../shared/utils/formatCurrency'

export default function DashboardPage() {
  const products = useProductStore((s) => s.products)
  const orders = useOrderStore((s) => s.orders)
  const lowStockProducts = products.filter((p) => p.stock < 20)
  const pending = orders.filter((o) => o.status === 'pending').length
  const revenue = orders
    .filter((o) => o.status === 'delivered')
    .reduce((sum, o) => sum + o.total, 0)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total products" value={products.length} />
        <StatCard title="Low stock" value={lowStockProducts.length} />
        <StatCard title="Pending orders" value={pending} />
        <StatCard title="Revenue (delivered)" value={formatCurrency(revenue)} />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <LowStockList products={lowStockProducts} />
      </div>
    </div>
  )
}