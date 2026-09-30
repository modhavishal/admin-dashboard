import {
  Package,
  Boxes,
  AlertTriangle,
  IndianRupee,
} from 'lucide-react'

type Props = {
  totalProducts: number
  totalStock: number
  lowStock: number
  inventoryValue: number
}

export default function ProductStats({
  totalProducts,
  totalStock,
  lowStock,
  inventoryValue,
}: Props) {
  const stats = [
    {
      title: 'Total products',
      value: totalProducts,
      description: 'Products in catalog',
      icon: Package,
      iconClass: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Total stock',
      value: totalStock.toLocaleString('en-IN'),
      description: 'Units available',
      icon: Boxes,
      iconClass: 'bg-violet-50 text-violet-600',
    },
    {
      title: 'Low stock',
      value: lowStock,
      description: 'Need attention',
      icon: AlertTriangle,
      iconClass: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Inventory value',
      value: `₹${inventoryValue.toLocaleString('en-IN')}`,
      description: 'Current stock value',
      icon: IndianRupee,
      iconClass: 'bg-emerald-50 text-emerald-600',
    },
  ]

  return (
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
  )
}