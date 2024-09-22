import { NextResponse } from 'next/server';
import { loadChecks } from '../../../actions/checks';
import { ApiGetResponse } from '../../../common/types/api';
import { Check } from '../../../common/types/check';

export async function GET() {
  const checks: ApiGetResponse<Check[]> = await loadChecks()

  return NextResponse.json(checks)
}
