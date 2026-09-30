import { useMemo } from 'react'
import { useDebounce } from '../../../shared/hooks/useDebounce'
import { useProductStore } from '../store'

export function useProducts(search: string, category: string) {
  const products = useProductStore((s) => s.products)
  const debouncedSearch = useDebounce(search)

  const filtered = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase()
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) &&
        (category === 'All' || p.category === category),
    )
  }, [products, debouncedSearch, category])

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(products.map((p) => p.category)))],
    [products],
  )

  return { products: filtered, categories }
}