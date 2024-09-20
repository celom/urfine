'use client';

import { useEffect } from 'react';
import { useChecksStore } from '../store/checksStore';
import CheckList from './checkList';
import { Button } from '@uptime/components/button';
import { signOut } from 'next-auth/react';
import { CheckInsert, CheckUpdate } from '../common/types/check';

export default function Dashboard() {
  const { checks, fetchChecks, createCheck, updateCheck } = useChecksStore();

  useEffect(() => {
    fetchChecks();
  }, [fetchChecks]);

  const handleAddCheck = async (checkData: CheckInsert) => {
    await createCheck(checkData);
  };

  const handleEditCheck = async (checkData: CheckUpdate) => {
    if ('pk' in checkData) {
      await updateCheck(checkData.pk, checkData);
    }
  };

  return (
    <div className="w-full max-w-4xl flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">urfine.com Check checker</h1>
      </div>
      <hr />
      <CheckList
        checks={checks}
        onAddCheck={handleAddCheck}
        onEditCheck={handleEditCheck}
      />
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
}
