import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@uptime/components/dialog';
import { Button } from '@uptime/components/button';
import { Label } from '@uptime/components/label';
import { Input } from '@uptime/components/input';
import {
  Check,
  CheckInsert,
  CheckUpdate,
  spawnCheck,
} from '../common/types/check';

interface CheckFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (check: CheckInsert | CheckUpdate) => void;
  initialData: Check | null;
}

export function CheckFormDialog({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: CheckFormDialogProps) {
  const [formData, setFormData] = useState<Check | CheckInsert>(
    initialData ?? spawnCheck()
  );

  useEffect(() => {
    setFormData(initialData ?? spawnCheck());
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="font-light">
            {initialData ? 'Edit Check' : 'Add Check'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData?.name}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                URL
              </Label>
              <Input
                id="url"
                name="url"
                value={formData?.url}
                onChange={handleChange}
                className="col-span-3"
                type="url"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">{initialData ? 'Update' : 'Add'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
