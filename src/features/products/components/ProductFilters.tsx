import { useEffect, useRef, useState } from 'react'
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Check,
} from 'lucide-react'

type Props = {
  search: string
  category: string
  categories: string[]
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
}

export default function ProductFilters({
  search,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}: Props) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const hasFilters = search || category !== 'All'

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const clearFilters = () => {
    onSearchChange('')
    onCategoryChange('All')
  }

  const selectedCategory =
    category === 'All' ? 'All categories' : category

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

      {/* SEARCH */}
      <div className="relative flex-1">

        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products..."
          className="
            h-11
            w-full
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            pl-10
            pr-10
            text-sm
            text-slate-800
            outline-none
            transition-all
            placeholder:text-slate-400
            hover:border-slate-300
            focus:border-blue-500
            focus:bg-white
            focus:ring-4
            focus:ring-blue-500/10
          "
        />

        {search && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              rounded-md
              p-1
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
            "
          >
            <X size={15} />
          </button>
        )}

      </div>

      {/* CUSTOM CATEGORY DROPDOWN */}
      <div
        ref={dropdownRef}
        className="relative w-full lg:w-[210px]"
      >

        {/* Trigger */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className={`
            flex
            h-11
            w-full
            items-center
            justify-between
            rounded-xl
            border
            bg-slate-50
            px-3.5
            text-sm
            font-medium
            outline-none
            transition-all
            ${
              open
                ? 'border-blue-500 bg-white ring-4 ring-blue-500/10'
                : 'border-slate-200 hover:border-slate-300'
            }
          `}
        >
          <span className="flex items-center gap-2.5">

            <SlidersHorizontal
              size={17}
              className="text-slate-400"
            />

            <span className="text-slate-700">
              {selectedCategory}
            </span>

          </span>

          <ChevronDown
            size={17}
            className={`
              text-slate-400
              transition-transform
              ${open ? 'rotate-180' : ''}
            `}
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div
            className="
              absolute
              left-0
              top-[calc(100%+8px)]
              z-50
              w-full
              overflow-hidden
              rounded-xl
              border
              border-slate-200
              bg-white
              p-1.5
              shadow-xl
              shadow-slate-900/10
            "
          >
            {categories.map((item) => {
              const isSelected = item === category

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    onCategoryChange(item)
                    setOpen(false)
                  }}
                  className={`
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-lg
                    px-3
                    py-2.5
                    text-left
                    text-sm
                    transition
                    ${
                      isSelected
                        ? 'bg-blue-50 font-semibold text-blue-600'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }
                  `}
                >
                  <span>
                    {item === 'All' ? 'All categories' : item}
                  </span>

                  {isSelected && (
                    <Check
                      size={16}
                      className="text-blue-600"
                    />
                  )}
                </button>
              )
            })}
          </div>
        )}

      </div>

      {/* CLEAR */}
      {hasFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="
            flex
            h-11
            items-center
            justify-center
            gap-1.5
            rounded-xl
            px-3
            text-sm
            font-medium
            text-slate-500
            transition
            hover:bg-slate-100
            hover:text-slate-900
          "
        >
          <X size={15} />
          Clear
        </button>
      )}

    </div>
  )
}