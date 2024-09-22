'use client';

import { Button } from '@uptime/components/button';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { Check, CheckForm } from '../common/types/check';
import { useChecksStore } from '../store/checksStore';
import CheckList from './checkList';

interface DashboardProps {
  preloadedChecks: Check[];
  preloadedLocations: string[];
}

export default function Dashboard({
  preloadedChecks,
  preloadedLocations,
}: DashboardProps) {
  const checks = useChecksStore().checks;
  const { saveCheck, setChecks } = useChecksStore();

  useEffect(() => {
    setChecks(preloadedChecks);
  }, [preloadedChecks, setChecks]);

  const handleSaveCheck = async (checkData: CheckForm) => {
    if (checkData?.pk) {
      await saveCheck(checkData.pk, checkData);
    }
  };

  return (
    <div className="w-full max-w-4xl flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-extrabold">Checks</h1>
      </div>
      <hr />
      <CheckList
        checks={checks}
        locations={preloadedLocations}
        onEditCheck={handleSaveCheck}
      />
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
}
