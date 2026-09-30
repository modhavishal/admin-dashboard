    import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type Product = {
  name: string
  stock: number
}

type Props = {
  products: Product[]
}

export default function InventoryChart({
  products,
}: Props) {
  const data = [...products]
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 6)
    .map((product) => ({
      name:
        product.name.length > 14
          ? `${product.name.slice(0, 14)}...`
          : product.name,
      stock: product.stock,
    }))

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: -20,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e2e8f0"
          />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 11,
              fill: '#94a3b8',
            }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 11,
              fill: '#94a3b8',
            }}
          />

          <Tooltip
            cursor={{
              fill: '#f8fafc',
            }}
            contentStyle={{
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              boxShadow:
                '0 10px 30px rgba(15,23,42,0.08)',
            }}
          />

          <Bar
            dataKey="stock"
            name="Stock"
            fill="#3b82f6"
            radius={[6, 6, 0, 0]}
            barSize={34}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}