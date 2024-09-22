import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { loadLocations } from '../../../../actions/checks'
import { authOptions } from '../../auth/[...nextauth]/route'


export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'You must be signed in to view checks.' }),
      { status: 401 }
    )
  }

  const locations: string[] = await loadLocations()

  return NextResponse.json(locations)
}
