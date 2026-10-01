import { create } from 'zustand'
import type { User } from './types'

type State = {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (isLoading: boolean) => void
  updateProfile: (user: User) => void
}

export const useAuthStore = create<State>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  updateProfile: (user) => set({ user }),
}))