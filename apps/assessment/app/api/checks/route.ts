import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'
import { Check } from '../../../common/types/check'

type SimpleCheck = Pick<Check, 'pk' | 'name' | 'url' | 'state_is_up'>;

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'You must be signed in to view checks.' }),
      { status: 401 }
    )
  }

  // Mock API call
  const checks: SimpleCheck[] = [
    { pk: '1', name: 'Check 1', url: 'https://example1.com', state_is_up: true },
    { pk: '2', name: 'Check 2', url: 'https://example2.com', state_is_up: false },
    { pk: '3', name: 'Check 3', url: 'https://example3.com', state_is_up: true },
  ]

  return NextResponse.json(checks)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'You must be signed in to create checks.' }),
      { status: 401 }
    )
  }

  const newCheck: Omit<SimpleCheck, 'pk'> = await request.json()

  // Here you would typically send this to your backend API
  // const res = await fetch('https://api.celom.com/v1/checks', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Token ${session.accessToken}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(newCheck),
  // })

  // For now, we'll mock the response
  const createdCheck: SimpleCheck = {
    pk: Date.now().toString(), // Generate a temporary ID
    ...newCheck,
    state_is_up: false // Set initial state
  }

  return NextResponse.json(createdCheck, { status: 201 })
}