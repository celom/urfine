'use client';

import { useState } from 'react';
import { Check } from '../common/types/check';
import { useChecksStore } from '../store/checksStore';
import { Input } from '@uptime/components/input';
import { Button } from '@uptime/components/button';

interface CheckItemProps {
  check: Check;
}

export default function CheckItem({ check }: CheckItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(check.name);
  const { updateCheck } = useChecksStore();

  const handleSave = () => {
    updateCheck(check.pk, { name });
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between p-2 border rounded">
      {isEditing ? (
        <>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mr-2"
          />
          <Button onClick={handleSave}>Save</Button>
        </>
      ) : (
        <>
          <span>{check.name}</span>
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        </>
      )}
    </li>
  );
}
