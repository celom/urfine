import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'You must be signed in to view checks.' }),
      { status: 401 }
    )
  }

  const res = await fetch('https://api.uptime.com/v1/checks', {
    headers: {
      'Authorization': `Token ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  const checks = await res.json()

  return NextResponse.json(checks)
}