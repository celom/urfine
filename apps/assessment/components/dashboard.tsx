'use client';

import { useEffect } from 'react';
import { useChecksStore } from '../store/checksStore';
import CheckList from './checkList';
import { Button } from '@uptime/components/button';
import { signOut } from 'next-auth/react';

export default function Dashboard() {
  const { checks, fetchChecks } = useChecksStore();

  useEffect(() => {
    fetchChecks();
  }, [fetchChecks]);

  return (
    <div className="w-full max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Uptime Dashboard</h1>
      <CheckList checks={checks} />
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
}
