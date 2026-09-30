import { create } from 'zustand'
import type { User } from './types'

type State = {
  user: User | null
  login: (email: string) => void
  logout: () => void
}

export const useAuthStore = create<State>((set) => ({
  user: null,
  login: (email) => set({ user: { name: 'Admin', email } }),
  logout: () => set({ user: null }),
}))