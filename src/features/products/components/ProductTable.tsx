import {
  Edit3,
  Trash2,
  PackageOpen,
  AlertTriangle,
} from 'lucide-react'

import type { Product } from '../types'

type Props = {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

export default function ProductTable({
  products,
  onEdit,
  onDelete,
}: Props) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">

        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
          <PackageOpen size={26} />
        </div>

        <h3 className="font-semibold text-slate-900">
          No products found
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Try changing your search or category filter.
        </p>

      </div>
    )
  }

  return (
    <div className="overflow-x-auto">

      <table className="w-full min-w-[750px] text-left">

        {/* HEADER */}

        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/70">

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Product
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Category
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Stock
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Price
            </th>

            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
              Actions
            </th>

          </tr>
        </thead>


        {/* BODY */}

        <tbody className="divide-y divide-slate-100">

          {products.map((product) => {

            const isLowStock = product.stock < 20

            return (
              <tr
                key={product.id}
                className="
                  group
                  transition
                  hover:bg-slate-50/70
                "
              >

                {/* PRODUCT */}

                <td className="px-6 py-4">

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-50
                        text-blue-600
                      "
                    >
                      <PackageOpen size={19} />
                    </div>

                    <div>

                      <p className="font-semibold text-slate-800">
                        {product.name}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-400">
                        Product #{product.id}
                      </p>

                    </div>

                  </div>

                </td>


                {/* CATEGORY */}

                <td className="px-6 py-4">

                  <span
                    className="
                      inline-flex
                      rounded-lg
                      bg-slate-100
                      px-2.5
                      py-1
                      text-xs
                      font-medium
                      text-slate-600
                    "
                  >
                    {product.category}
                  </span>

                </td>


                {/* STOCK */}

                <td className="px-6 py-4">

                  {isLowStock ? (
                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-lg
                        bg-red-50
                        px-2.5
                        py-1
                        text-xs
                        font-semibold
                        text-red-600
                      "
                    >
                      <AlertTriangle size={13} />
                      {product.stock} left
                    </span>
                  ) : (
                    <span
                      className="
                        inline-flex
                        rounded-lg
                        bg-emerald-50
                        px-2.5
                        py-1
                        text-xs
                        font-semibold
                        text-emerald-600
                      "
                    >
                      {product.stock} units
                    </span>
                  )}

                </td>


                {/* PRICE */}

                <td className="px-6 py-4">

                  <span className="font-semibold text-slate-800">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>

                </td>


                {/* ACTIONS */}

                <td className="px-6 py-4">

                  <div className="flex justify-end gap-2">

                    <button
                      type="button"
                      onClick={() => onEdit(product)}
                      className="
                        flex
                        h-9
                        items-center
                        gap-1.5
                        rounded-lg
                        border
                        border-slate-200
                        bg-white
                        px-3
                        text-xs
                        font-medium
                        text-slate-600
                        transition
                        hover:border-blue-200
                        hover:bg-blue-50
                        hover:text-blue-600
                      "
                    >
                      <Edit3 size={14} />
                      Edit
                    </button>


                    <button
                      type="button"
                      onClick={() => onDelete(product)}
                      className="
                        flex
                        h-9
                        items-center
                        gap-1.5
                        rounded-lg
                        border
                        border-slate-200
                        bg-white
                        px-3
                        text-xs
                        font-medium
                        text-slate-500
                        transition
                        hover:border-red-200
                        hover:bg-red-50
                        hover:text-red-600
                      "
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>

                  </div>

                </td>

              </tr>
            )
          })}

        </tbody>

      </table>

    </div>
  )
}