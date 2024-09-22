import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { loadChecks } from '../../../actions/checks';
import { ApiGetResponse } from '../../../common/types/api';
import { Check } from '../../../common/types/check';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'You must be signed in to view checks.' }),
      { status: 401 }
    )
  }

  const checks: ApiGetResponse<Check[]> = await loadChecks()

  return NextResponse.json(checks)
}
