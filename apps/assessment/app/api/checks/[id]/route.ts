import { NextResponse } from 'next/server'
import { Check } from '../../../../common/types/check'
import { config } from '../../../../config'

interface RequestParams {
  params: {
    id: number
  }
}

export async function PATCH(request: Request, { params }: RequestParams) {
  const body: Partial<Check> = await request.json()

  const response = await fetch(`${config.uptimeApiHost}/checks/${params.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${config.uptimeApiKey}`
    },
    body: JSON.stringify(body),
  })
  const updatedCheck: Check = await response.json()

  return NextResponse.json(updatedCheck)
}
