import Button from '../../../shared/components/ui/Button'
import type { Product } from '../types'

type Props = {
  products: Product[]
  onEdit: (p: Product) => void
  onDelete: (p: Product) => void
}

export default function ProductTable({ products, onEdit, onDelete }: Props) {
  if (products.length === 0) {
    return <p className="rounded-xl bg-white p-6 text-center text-gray-500 shadow">No products found.</p>
  }

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow">
      <table className="w-full text-left text-sm">
        <thead className="border-b bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Stock</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b last:border-0">
              <td className="px-4 py-3 font-medium">{p.name}</td>
              <td className="px-4 py-3">{p.category}</td>
              <td className="px-4 py-3">
                <span className={p.stock < 20 ? 'font-semibold text-red-600' : ''}>{p.stock}</span>
              </td>
              <td className="px-4 py-3">₹{p.price}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Button variant="secondary" onClick={() => onEdit(p)}>Edit</Button>
                  <Button variant="danger" onClick={() => onDelete(p)}>Delete</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}