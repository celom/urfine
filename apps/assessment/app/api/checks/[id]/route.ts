import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'You must be signed in to update checks.' }),
      { status: 401 }
    )
  }

  const body = await request.json()

  const res = await fetch(`https://api.uptime.com/v1/checks/${params.id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const updatedCheck = await res.json()

  return NextResponse.json(updatedCheck)
}