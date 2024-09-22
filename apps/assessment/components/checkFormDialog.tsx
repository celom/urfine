'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@uptime/components/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@uptime/components/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@uptime/components/form';
import { Input } from '@uptime/components/input';
import { MultiSelect } from '@uptime/components/multi-select';
import { Slider } from '@uptime/components/slider';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import {
  Check,
  CheckForm,
  CheckFormSchema,
  spawnCheck,
} from '../common/types/check';

interface CheckFormDialogProps {
  isOpen: boolean;
  initialData: Check | null;
  locations: string[];
  onClose: () => void;
  onSubmit: (check: CheckForm) => void;
}

export function CheckFormDialog({
  isOpen,
  initialData,
  locations,
  onClose,
  onSubmit,
}: CheckFormDialogProps) {
  const form = useForm<CheckForm>({
    resolver: zodResolver(CheckFormSchema),
    defaultValues: initialData ?? spawnCheck(),
  });

  useEffect(() => {
    form.reset(initialData ?? spawnCheck());
  }, [initialData, form]);

  const locationMap = useMemo(
    () =>
      locations.map((location) => ({
        label: location,
        value: location,
      })),
    [locations]
  );

  const handleSubmit = (data: CheckForm) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="p-0 max-w-3xl"
      >
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="font-light">
            {initialData ? 'Edit Check' : 'Add Check'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-col gap-6 py-6 px-8 max-h-[70vh] overflow-y-auto">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name of check</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="msp_interval"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem className="flex flex-col gap-4">
                    <FormLabel>
                      Check interval: (
                      {`${value} minute${value == 1 ? '' : 's'}`})
                    </FormLabel>
                    <FormControl>
                      <Slider
                        {...field}
                        defaultValue={[value ?? 1]}
                        min={1}
                        max={60}
                        onValueChange={(val) => onChange(val?.[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact_groups"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contacts</FormLabel>
                    <FormControl>
                      <MultiSelect
                        {...field}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        options={[{ label: 'Default', value: 'Default' }]} // TODO: Replace with actual contacts
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-8 justify-between">
                <FormField
                  control={form.control}
                  name="locations"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Locations</FormLabel>
                      <FormControl>
                        <MultiSelect
                          {...field}
                          defaultValue={field.value}
                          options={locationMap}
                          placeholder="Click to select server locations"
                          onValueChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription>Select locations</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <MultiSelect
                          {...field}
                          onValueChange={field.onChange}
                          options={[]} // TODO: Replace with actual tags
                          placeholder="Click to select tags"
                        />
                      </FormControl>
                      <FormDescription>Manage check tags</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="msp_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
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
