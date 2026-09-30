import type { Product } from '../../products'

export default function LowStockList({ products }: { products: Product[] }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <h2 className="mb-4 text-lg font-semibold">Low stock alert</h2>
      {products.length === 0 ? (
        <p className="text-sm text-gray-500">All products are well stocked.</p>
      ) : (
        <ul className="space-y-2">
          {products.map((p) => (
            <li key={p.id} className="flex justify-between text-sm">
              <span>{p.name}</span>
              <span className="font-semibold text-red-600">{p.stock} left</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}