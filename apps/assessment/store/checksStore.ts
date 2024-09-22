import { create } from 'zustand'
import { ApiMutateResponse } from '../common/types/api'
import { Check, CheckForm } from '../common/types/check'

interface ChecksStoreState {
  checks: Check[]
  locations: string[]
  loadChecks: () => Promise<void>
  loadLocations: () => Promise<void>
  saveCheck: (id: number, updates: Partial<Check>) => Promise<void>
  createCheck: (newCheck: CheckForm) => Promise<void>,
  setChecks: (checks: Check[]) => void,
  setLocations: (locations: string[]) => void
}

export const useChecksStore = create<ChecksStoreState>((set) => ({
  checks: [],
  locations: [],
  loadChecks: async () => {
    const response = await fetch('/api/checks')
    const checks: Check[] = await response.json()
    set({ checks })
  },
  loadLocations: async () => {
    const response = await fetch('/api/checks/locations')
    const locations: string[] = await response.json()
    set({ locations })
  },
  saveCheck: async (id, updates) => {
    const response = await fetch(`/api/checks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })
    const updatedCheck: ApiMutateResponse<Check> = await response.json()

    // TODO: Apply proper error handling
    // if (response.status !== 200) {
    //   throw new Error(updatedCheck.messages.detail)
    // }

    set((state) => ({
      checks: state.checks.map((check) =>
        check.pk === id ? { ...check, ...updatedCheck.results } : check
      ),
    }))
  },
  createCheck: async (newCheck) => {
    const response = await fetch('/api/checks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCheck),
    })
    const createdCheck: ApiMutateResponse<Check> = await response.json()

    set((state) => ({
      checks: [...state.checks, createdCheck.results],
    }))
  },
  setChecks: (checks: Check[]) => set({ checks }),
  setLocations: (locations: string[]) => set({ locations }),
}))