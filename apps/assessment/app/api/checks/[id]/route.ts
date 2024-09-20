import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'
import { Check } from '../../../../common/types/check'

type SimpleCheck = Pick<Check, 'pk' | 'name' | 'url' | 'state_is_up'>;

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'You must be signed in to view checks.' }),
      { status: 401 }
    )
  }

  // Mock API call
  const check: SimpleCheck = {
    pk: params.id,
    name: `Check ${params.id}`,
    url: `https://example${params.id}.com`,
    state_is_up: Math.random() < 0.5
  }

  return NextResponse.json(check)
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'You must be signed in to update checks.' }),
      { status: 401 }
    )
  }

  const body: Partial<SimpleCheck> = await request.json()

  // Mock API call
  const updatedCheck: SimpleCheck = {
    pk: params.id,
    name: body.name || `Check ${params.id}`,
    url: body.url || `https://example${params.id}.com`,
    state_is_up: body.state_is_up !== undefined ? body.state_is_up : (Math.random() < 0.5)
  }

  return NextResponse.json(updatedCheck)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'You must be signed in to delete checks.' }),
      { status: 401 }
    )
  }

  // Mock API call
  // In a real scenario, you would delete the check from your database or external API

  return new NextResponse(null, { status: 204 })
}