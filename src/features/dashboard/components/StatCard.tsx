import type { ElementType } from 'react'
import { ArrowUpRight, TrendingUp, AlertCircle } from 'lucide-react'

type StatCardProps = {
  title: string
  value: string | number
  description: string
  icon: ElementType
  iconClassName?: string
  trend?: string
  warning?: boolean
}

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName = 'bg-blue-50 text-blue-600',
  trend,
  warning,
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">

      {/* Top */}
      <div className="flex items-start justify-between">

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClassName}`}
        >
          <Icon size={21} strokeWidth={2} />
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition group-hover:bg-slate-100 group-hover:text-slate-600">
          <ArrowUpRight size={16} />
        </div>

      </div>

      {/* Value */}
      <div className="mt-5">

        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <p className="mt-1 text-[27px] font-bold tracking-tight text-slate-900">
          {value}
        </p>

      </div>

      {/* Bottom */}
      <div className="mt-3 flex items-center justify-between gap-2">

        <p className="truncate text-xs text-slate-400">
          {description}
        </p>

        {trend && (
          <span
            className={`flex shrink-0 items-center gap-1 text-[11px] font-semibold ${
              warning
                ? 'text-amber-600'
                : 'text-emerald-600'
            }`}
          >
            {warning ? (
              <AlertCircle size={12} />
            ) : (
              <TrendingUp size={12} />
            )}

            {trend}
          </span>
        )}

      </div>
    </div>
  )
}