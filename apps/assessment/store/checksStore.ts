import { create } from 'zustand'
import { Check } from '../common/types/check'

interface ChecksState {
  checks: Check[]
  fetchChecks: () => Promise<void>
  updateCheck: (id: string, updates: Partial<Check>) => Promise<void>
}

export const useChecksStore = create<ChecksState>((set) => ({
  checks: [],
  fetchChecks: async () => {
    const response = await fetch('/api/checks')
    const checks = await response.json()
    set({ checks })
  },
  updateCheck: async (id, updates) => {
    const response = await fetch(`/api/checks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })
    const updatedCheck = await response.json()
    set((state) => ({
      checks: state.checks.map((check) =>
        check.id === id ? { ...check, ...updatedCheck } : check
      ),
    }))
  },
}))