import { NextResponse } from 'next/server'
import { loadLocations } from '../../../../actions/checks'

export async function GET() {
  const locations: string[] = await loadLocations()

  return NextResponse.json(locations)
}
