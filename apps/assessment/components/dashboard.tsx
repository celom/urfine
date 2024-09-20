'use client';

import { useEffect, useState } from 'react';
import { useChecksStore } from '../store/checksStore';
import CheckList from './checkList';
import { Button } from '@uptime/components/button';
import { Input } from '@uptime/components/input';
import { signOut } from 'next-auth/react';
import { CheckInsert, CheckUpdate } from '../common/types/check';

export default function Dashboard() {
  const { checks, fetchChecks, createCheck, updateCheck } = useChecksStore();
  const [checkForm, setCheckForm] = useState<CheckInsert>({
    name: '',
    url: '',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCheck, setEditingCheck] = useState<
    CheckInsert | CheckUpdate | null
  >(null);

  useEffect(() => {
    fetchChecks();
  }, [fetchChecks]);

  const handleSubmitCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCheck && 'pk' in editingCheck) {
      await updateCheck(editingCheck.pk, checkForm);
    } else {
      await createCheck(checkForm);
    }
    setCheckForm({ name: '', url: '' });
    setIsFormOpen(false);
    setEditingCheck(null);
  };

  const handleEditCheck = (check: CheckInsert) => {
    setCheckForm({ name: check.name, url: check.url });
    setEditingCheck(check);
    setIsFormOpen(true);
  };

  const handleCancelForm = () => {
    setCheckForm({ name: '', url: '' });
    setIsFormOpen(false);
    setEditingCheck(null);
  };

  return (
    <div className="w-full max-w-4xl flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Uptime Dashboard</h1>
        {!isFormOpen && (
          <Button onClick={() => setIsFormOpen(true)}>Add New</Button>
        )}
      </div>
      <hr />
      {isFormOpen && (
        <form onSubmit={handleSubmitCheck} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Check Name"
            value={checkForm.name}
            onChange={(e) =>
              setCheckForm({ ...checkForm, name: e.target.value })
            }
            required
          />
          <Input
            type="url"
            placeholder="URL"
            value={checkForm.url}
            onChange={(e) =>
              setCheckForm({ ...checkForm, url: e.target.value })
            }
            required
          />
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              onClick={handleCancelForm}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingCheck ? 'Update Check' : 'Create Check'}
            </Button>
          </div>
        </form>
      )}
      <CheckList checks={checks} onEditCheck={handleEditCheck} />
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
}
