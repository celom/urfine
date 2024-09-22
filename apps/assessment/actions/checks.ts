'use server'

import { notFound } from 'next/navigation';
import { ApiCheckRequest, ApiGetResponse } from '../common/types/api';
import { Check } from '../common/types/check';
import { config } from '../config';

export async function loadChecks(params?: ApiCheckRequest) {
  const url = new URL(`${config.uptimeApiHost}/checks`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, value.toString())
      }
    })
  }
  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Token ${config.uptimeApiKey}`,
    },
    cache: 'no-cache',
  })
  const checks: ApiGetResponse<Check[]> = await response.json()
  if (!checks) notFound()
  return checks;
}

export async function loadLocations() {
  const response = await fetch(`${config.uptimeApiHost}/checks/locations`, {
    headers: {
      'Authorization': `Token ${config.uptimeApiKey}`
    }
  })
  const data: { locations: string[] } = await response.json()
  return data?.locations ?? [];
}

// TODO: Implement saveCheck server actions

// TODO: Implement createCheck server actions