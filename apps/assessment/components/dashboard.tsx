'use client';

import { Button } from '@urfine/components/button';
import { useToast } from '@urfine/components/toast';
import { cn } from '@urfine/utils';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { Check, CheckForm } from '../common/types/check';
import { useChecksStore } from '../store/checksStore';
import CheckList from './checkList';

interface DashboardProps {
  className?: string;
  preloadedChecks: Check[];
  preloadedLocations: string[];
}

export default function Dashboard({
  className,
  preloadedChecks,
  preloadedLocations,
}: DashboardProps) {
  const checks = useChecksStore().checks;
  const { saveCheck, setChecks } = useChecksStore();
  const { toast } = useToast();

  useEffect(() => {
    setChecks(preloadedChecks);
  }, [preloadedChecks, setChecks]);

  const handleSaveCheck = async (checkData: CheckForm) => {
    if (checkData?.pk) {
      saveCheck(checkData.pk, checkData)
        .then(() => {
          toast({
            title: 'Check successfully updated',
          });
        })
        .catch(() => {
          toast({
            title: 'Failed to update check',
            variant: 'destructive',
          });
        });
    }
  };

  return (
    <div
      className={cn('flex w-full max-w-screen-lg flex-col gap-6', className)}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-extrabold">Checks</h1>
      </div>
      <hr />
      <CheckList
        className="bg-white shadow-md"
        checks={checks}
        locations={preloadedLocations}
        onEditCheck={handleSaveCheck}
      />
      <Button className="w-fit self-end bg-gray-400" onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  );
}
