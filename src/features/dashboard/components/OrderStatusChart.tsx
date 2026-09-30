import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

type Order = {
  status: string
}

type Props = {
  orders: Order[]
}

export default function OrderStatusChart({ orders }: Props) {
  const data = [
    {
      name: 'Delivered',
      value: orders.filter(
        (o) => o.status === 'delivered',
      ).length,
    },
    {
      name: 'Pending',
      value: orders.filter(
        (o) => o.status === 'pending',
      ).length,
    },
    {
      name: 'Cancelled',
      value: orders.filter(
        (o) => o.status === 'cancelled',
      ).length,
    },
  ].filter((item) => item.value > 0)

  const total = orders.length

  return (
    <div>

      <div className="relative h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={62}
              outerRadius={82}
              paddingAngle={4}
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    [
                      '#10b981',
                      '#f59e0b',
                      '#ef4444',
                    ][index]
                  }
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                boxShadow:
                  '0 10px 30px rgba(15,23,42,0.08)',
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-900">
            {total}
          </span>

          <span className="text-xs text-slate-400">
            Total orders
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-2 space-y-3">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: [
                    '#10b981',
                    '#f59e0b',
                    '#ef4444',
                  ][index],
                }}
              />

              <span className="text-xs text-slate-500">
                {item.name}
              </span>
            </div>

            <span className="text-xs font-semibold text-slate-800">
              {item.value}
            </span>
          </div>
        ))}
      </div>

    </div>
  )
}