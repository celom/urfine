import { create } from 'zustand'
import { _CheckInsert, _CheckUpdate, Check } from '../common/types/check'

interface ChecksStoreState {
  checks: Check[]
  fetchChecks: () => Promise<void>
  updateCheck: (id: string, updates: Partial<_CheckUpdate>) => Promise<void>
  createCheck: (newCheck: _CheckInsert) => Promise<void>
}

export const useChecksStore = create<ChecksStoreState>((set) => ({
  checks: [],
  fetchChecks: async () => {
    const response = await fetch('/api/checks')
    const checks: Check[] = await response.json()
    set({ checks })
  },
  updateCheck: async (id, updates) => {
    const response = await fetch(`/api/checks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })
    const updatedCheck: Check = await response.json()
    set((state) => ({
      checks: state.checks.map((check) =>
        check.pk === id ? { ...check, ...updatedCheck } : check
      ),
    }))
  },
  createCheck: async (newCheck) => {
    const response = await fetch('/api/checks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCheck),
    })
    const createdCheck: Check = await response.json()
    set((state) => ({
      checks: [...state.checks, createdCheck],
    }))
  },
}))