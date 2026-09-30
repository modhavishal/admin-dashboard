import { useState } from 'react'
import Button from '../../../shared/components/ui/Button'
import Modal from '../../../shared/components/ui/Modal'
import ProductFilters from '../components/ProductFilters'
import ProductForm from '../components/ProductForm'
import ProductTable from '../components/ProductTable'
import { useProducts } from '../hooks/useProducts'
import { useProductStore } from '../store'
import type { ProductFormValues } from '../schema'
import type { Product } from '../types'

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)

  const { products, categories } = useProducts(search, category)
  const { addProduct, updateProduct, deleteProduct } = useProductStore()

  const openAdd = () => {
    setEditing(null)
    setModalOpen(true)
  }

  const openEdit = (p: Product) => {
    setEditing(p)
    setModalOpen(true)
  }

  const closeModal = () => setModalOpen(false)

  const handleSubmit = (values: ProductFormValues) => {
    if (editing) updateProduct(editing.id, values)
    else addProduct(values)
    closeModal()
  }

  const handleDelete = (p: Product) => {
    if (window.confirm(`Delete "${p.name}"?`)) deleteProduct(p.id)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={openAdd}>+ Add product</Button>
      </div>

      <ProductFilters
        search={search}
        category={category}
        categories={categories}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
      />

      <ProductTable products={products} onEdit={openEdit} onDelete={handleDelete} />

      <Modal open={modalOpen} title={editing ? 'Edit product' : 'Add product'} onClose={closeModal}>
        <ProductForm
          key={editing?.id ?? 'new'}
          defaultValues={
            editing
              ? { name: editing.name, category: editing.category, stock: editing.stock, price: editing.price }
              : undefined
          }
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  )
}