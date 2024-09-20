import React, { useEffect, useMemo } from 'react';
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
import { Slider } from '@uptime/components/slider';
import { MultiSelect } from '@uptime/components/multi-select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@uptime/components/form';
import {
  Check,
  spawnCheck,
  CheckFormSchema,
  CheckForm,
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
    console.log('data', data);
    // Convert comma-separated strings to arrays
    const processedData = {
      ...data,
      contact_groups: data.contact_groups.map((item) => item.trim()),
      locations: data.locations.map((item) => item.trim()),
      tags: data.tags.map((item) => item.trim()),
      // Ensure numeric fields are converted to numbers
      msp_interval: Number(data.msp_interval),
      // msp_threshold: Number(data.msp_threshold),
      // msp_sensitivity: Number(data.msp_sensitivity),
      // msp_num_retries: Number(data.msp_num_retries),
    };
    onSubmit(
      initialData ? { ...initialData, ...processedData } : processedData
    );
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
                        defaultValue={[value ?? 1]}
                        {...field}
                        onValueChange={(val) => onChange(val?.[0])}
                        min={1}
                        max={60}
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
                        onValueChange={field.onChange}
                        options={[{ label: 'Default', value: 'Default' }]}
                        {...field}
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
                          onValueChange={field.onChange}
                          options={locationMap}
                          {...field}
                          placeholder="Location1, Location2, Location3"
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
                          onValueChange={field.onChange}
                          options={[]}
                          {...field}
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
                name="url"
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
              {/* <FormField
                control={form.control}
                name="is_paused"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Is Paused</FormLabel>
                      <FormDescription>
                        Temporarily disable this check
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="send_resolved_notifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Send Resolved Notifications</FormLabel>
                      <FormDescription>
                        Notify when issues are resolved
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              */}
              {/* <FormField
                control={form.control}
                name="msp_threshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Threshold</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={0}
                        max={2147483647}
                      />
                    </FormControl>
                    <FormDescription>
                      Failure threshold before alerting
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="msp_script"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Script</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormDescription>
                      Custom script for this check
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="msp_sensitivity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sensitivity</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={0}
                        max={2147483647}
                      />
                    </FormControl>
                    <FormDescription>
                      Detection sensitivity level
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="msp_num_retries"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Retries</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min={1} max={3} />
                    </FormControl>
                    <FormDescription>
                      Retry attempts before failing
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="msp_use_ip_version"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IP Version</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select IP Version" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ipv4">IPv4</SelectItem>
                        <SelectItem value="ipv6">IPv6</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      IP version to use for this check
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="msp_uptime_sla"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Uptime SLA</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., 99.9" />
                    </FormControl>
                    <FormDescription>Target uptime percentage</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="msp_response_time_sla"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Response Time SLA</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., 200" />
                    </FormControl>
                    <FormDescription>
                      Target response time in milliseconds
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="msp_notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormDescription>
                      Additional notes for this check
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="msp_include_in_global_metrics"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Include in Global Metrics</FormLabel>
                      <FormDescription>
                        Include this check in overall statistics
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              /> */}
            </div>
            <DialogFooter className="p-6 border-t">
              <Button type="submit">Save</Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
