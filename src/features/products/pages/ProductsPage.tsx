import { useEffect, useMemo, useState } from "react";
import Button from "../../../shared/components/ui/Button";
import Modal from "../../../shared/components/ui/Modal";

import ProductFilters from "../components/ProductFilters";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

import { useProducts } from "../hooks/useProducts";
import { useProductStore } from "../store";

import type { ProductFormValues } from "../schema";
import type { Product } from "../types";
import ProductStats from "../components/ProductStats";

const ITEMS_PER_PAGE = 10;

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const { products, categories } = useProducts(search, category);

  const allProducts = useProductStore((state) => state.products);

  const { addProduct, updateProduct, deleteProduct } = useProductStore();

  // --------------------------------------------------
  // Statistics
  // --------------------------------------------------

  const totalProducts = allProducts.length;

  const totalStock = allProducts.reduce(
    (sum, product) => sum + product.stock,
    0,
  );

  const lowStock = allProducts.filter((product) => product.stock < 20).length;

  const inventoryValue = allProducts.reduce(
    (sum, product) => sum + product.stock * product.price,
    0,
  );

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    const endIndex = startIndex + ITEMS_PER_PAGE;

    return products.slice(startIndex, endIndex);
  }, [products, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category]);

  // If deleting products causes current page
  // to become invalid, move back to previous page.
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // --------------------------------------------------
  // Pagination handlers
  // --------------------------------------------------

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
  };

  // --------------------------------------------------
  // Modal
  // --------------------------------------------------

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  // --------------------------------------------------
  // Submit
  // --------------------------------------------------

  const handleSubmit = (values: ProductFormValues) => {
    if (editing) {
      updateProduct(editing.id, values);
    } else {
      addProduct(values);
    }

    closeModal();
  };

  // --------------------------------------------------
  // Delete
  // --------------------------------------------------

  const handleDelete = (product: Product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`,
    );

    if (confirmed) {
      deleteProduct(product.id);
    }
  };

  // --------------------------------------------------
  // Pagination numbers
  // --------------------------------------------------

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <div className="space-y-6">
      {/* ==========================================
          HEADER
      =========================================== */}

      {/* HEADER */}
      <div className="border-b border-slate-200 bg-white flex flex-col justify-between gap-5 md:flex-row md:items-center px-5 py-6 sm:px-7 lg:px-8 ">
        {/* Title */}
        <div>
          <div className="mb-1.5 flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">
              Products
            </h1>

            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold tracking-wide text-blue-600">
              INVENTORY
            </span>
          </div>

          <p className="text-sm text-slate-500">
            Manage your pharmacy products and inventory.
          </p>
        </div>

        {/* Action */}
        <Button
          onClick={openAdd}
          className="
      flex
      h-11
      items-center
      justify-center
      rounded-xl
      bg-blue-600
      px-5
      font-semibold
      text-white
      shadow-sm
      transition
      hover:bg-blue-700
      hover:shadow-md
      active:scale-[0.98]
    "
        >
          + Add product
        </Button>
      </div>

      <main className="bg-slate-50/80 p-4 sm:p-6 lg:p-8">
        <div className="space-y-6">
  {/* ==========================================
          STATS
      =========================================== */}

      <ProductStats
        totalProducts={totalProducts}
        totalStock={totalStock}
        lowStock={lowStock}
        inventoryValue={inventoryValue}
      />

      {/* ==========================================
          FILTERS
      =========================================== */}

      <div
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-4
          shadow-sm
        "
      >
        <ProductFilters
          search={search}
          category={category}
          categories={categories}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
        />
      </div>

      {/* ==========================================
          TABLE
      =========================================== */}

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >
        <ProductTable
          products={paginatedProducts}
          onEdit={openEdit}
          onDelete={handleDelete}
        />

        {/* ========================================
            PAGINATION
        ========================================= */}

        {products.length > 0 && (
          <div
            className="
              flex
              flex-col
              gap-4
              border-t
              border-slate-100
              px-6
              py-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* Result count */}

            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}
              </span>{" "}
              –{" "}
              <span className="font-semibold text-slate-700">
                {Math.min(currentPage * ITEMS_PER_PAGE, products.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {products.length}
              </span>{" "}
              products
            </p>

            {/* Pagination */}

            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                {/* Previous */}

                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => goToPage(currentPage - 1)}
                  className="
                    flex
                    h-9
                    min-w-9
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    px-3
                    text-sm
                    font-medium
                    text-slate-600
                    transition
                    hover:bg-slate-50
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  ←
                </button>

                {/* Page numbers */}

                <div className="flex items-center gap-1">
                  {pageNumbers.map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => goToPage(page)}
                      className={`
                        flex
                        h-9
                        min-w-9
                        items-center
                        justify-center
                        rounded-lg
                        px-2
                        text-sm
                        font-medium
                        transition
                        ${
                          currentPage === page
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-600 hover:bg-slate-100"
                        }
                      `}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* Next */}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => goToPage(currentPage + 1)}
                  className="
                    flex
                    h-9
                    min-w-9
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    px-3
                    text-sm
                    font-medium
                    text-slate-600
                    transition
                    hover:bg-slate-50
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
        </div>
      </main>

    

      {/* ==========================================
          MODAL
      =========================================== */}

      <Modal
        open={modalOpen}
        title={editing ? "Edit product" : "Add product"}
        onClose={closeModal}
      >
        <ProductForm
          key={editing?.id ?? "new"}
          defaultValues={
            editing
              ? {
                  name: editing.name,
                  category: editing.category,
                  stock: editing.stock,
                  price: editing.price,
                }
              : undefined
          }
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}
