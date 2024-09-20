'use client';

import { useEffect } from 'react';
import { useChecksStore } from '../store/checksStore';
import CheckList from './checkList';
import { Button } from '@uptime/components/button';
import { signOut } from 'next-auth/react';
import { CheckForm } from '../common/types/check';

export default function Dashboard() {
  const {
    checks,
    locations,
    fetchChecks,
    fetchLocations,
    createCheck,
    updateCheck,
  } = useChecksStore();

  useEffect(() => {
    fetchChecks();
    fetchLocations();
  }, [fetchChecks, fetchLocations]);

  const handleSaveCheck = async (checkData: CheckForm) => {
    if (checkData?.pk) {
      await updateCheck(checkData.pk, checkData);
    } else {
      await createCheck(checkData);
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
        locations={locations}
        onAddCheck={handleSaveCheck}
        onEditCheck={handleSaveCheck}
      />
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
}
