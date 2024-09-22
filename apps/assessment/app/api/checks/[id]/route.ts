import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { Check } from '../../../../common/types/check'
import { config } from '../../../../config'
import { authOptions } from '../../auth/[...nextauth]/route'

interface RequestParams {
  params: {
    id: number
  }
}

export async function PATCH(request: Request, { params }: RequestParams) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'You must be signed in to update checks.' }),
      { status: 401 }
    )
  }

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
