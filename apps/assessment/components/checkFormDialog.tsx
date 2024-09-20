import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@uptime/components/dialog';
import { Button } from '@uptime/components/button';
import { Input } from '@uptime/components/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@uptime/components/form';
import {
  Check,
  CheckInsert,
  CheckUpdate,
  spawnCheck,
  CheckFormSchema,
} from '../common/types/check';
import { z } from 'zod';

interface CheckFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (check: CheckInsert | CheckUpdate) => void;
  initialData: Check | null;
}

type CheckForm = z.infer<typeof CheckFormSchema>;

export function CheckFormDialog({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: CheckFormDialogProps) {
  const form = useForm<CheckForm>({
    resolver: zodResolver(CheckFormSchema),
    defaultValues: initialData ?? spawnCheck(),
  });

  useEffect(() => {
    form.reset(initialData ?? spawnCheck());
  }, [initialData, form]);

  const handleSubmit = (data: CheckForm) => {
    onSubmit(initialData ? { ...initialData, ...data } : data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="p-0"
      >
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="font-light">
            {initialData ? 'Edit Check' : 'Add Check'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-col gap-8 py-6 px-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Name</FormLabel>
                    <FormControl className="col-span-3">
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>URL</FormLabel>
                    <FormControl className="col-span-3">
                      <Input {...field} type="url" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter className="p-6 border-t">
          <Button onClick={() => form.handleSubmit(handleSubmit)()}>
            Save
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
