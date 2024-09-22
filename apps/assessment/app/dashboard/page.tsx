import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { loadChecks, loadLocations } from '../../actions/checks';
import Dashboard from '../../components/dashboard';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const checks = await loadChecks();
  const locations = await loadLocations();

  return (
    <Suspense fallback={<div>Loading data...</div>}>
      <Dashboard
        preloadedChecks={checks.results}
        preloadedLocations={locations}
      />
    </Suspense>
  );
}
