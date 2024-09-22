import { Suspense } from 'react';
import { loadChecks, loadLocations } from '../../actions/checks';
import Dashboard from '../../components/dashboard';

export default async function Page() {
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
