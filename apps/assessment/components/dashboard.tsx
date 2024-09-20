'use client';

import { useEffect, useState } from 'react';
import { useChecksStore } from '../store/checksStore';
import CheckList from './checkList';
import { Button } from '@uptime/components/button';
import { Input } from '@uptime/components/input';
import { signOut } from 'next-auth/react';
import { _CheckInsert } from '../common/types/check';

export default function Dashboard() {
  const { checks, fetchChecks, createCheck } = useChecksStore();
  const [newCheck, setNewCheck] = useState<_CheckInsert>({ name: '', url: '' });
  const [isAddingCheck, setIsAddingCheck] = useState(false);

  useEffect(() => {
    fetchChecks();
  }, [fetchChecks]);

  const handleCreateCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCheck(newCheck);
    setNewCheck({ name: '', url: '' });
    setIsAddingCheck(false);
  };

  return (
    <div className="w-full max-w-4xl flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Uptime Dashboard</h1>
        <Button onClick={() => setIsAddingCheck(!isAddingCheck)}>
          {isAddingCheck ? 'Cancel' : 'Add New'}
        </Button>
      </div>
      <hr />
      {isAddingCheck && (
        <form onSubmit={handleCreateCheck} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Check Name"
            value={newCheck.name}
            onChange={(e) => setNewCheck({ ...newCheck, name: e.target.value })}
            required
          />
          <Input
            type="url"
            placeholder="URL"
            value={newCheck.url}
            onChange={(e) => setNewCheck({ ...newCheck, url: e.target.value })}
            required
          />
          <Button type="submit">Create Check</Button>
        </form>
      )}
      <CheckList checks={checks} />
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
}
