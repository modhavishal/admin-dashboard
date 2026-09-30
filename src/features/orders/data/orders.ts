import type { Order } from '../types'

export const orders: Order[] = [
  { id: 1001, customer: 'Amit Shah', total: 450, status: 'delivered', date: '2026-09-25' },
  { id: 1002, customer: 'Neha Patel', total: 1290, status: 'shipped', date: '2026-09-27' },
  { id: 1003, customer: 'Rahul Mehta', total: 320, status: 'pending', date: '2026-09-28' },
  { id: 1004, customer: 'Pooja Joshi', total: 860, status: 'cancelled', date: '2026-09-28' },
  { id: 1005, customer: 'Karan Desai', total: 2100, status: 'pending', date: '2026-09-29' },
  { id: 1006, customer: 'Sneha Trivedi', total: 675, status: 'delivered', date: '2026-09-29' },
]