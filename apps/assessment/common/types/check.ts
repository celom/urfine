import { z } from 'zod';

const CheckSchema = z.object({
  pk: z.number().optional(),
  url: z.string().url().optional(),
  stats_url: z.string().url().optional(),
  alerts_url: z.string().url().optional(),
  share_url: z.string().url().optional(),
  name: z.string().max(100).optional(),
  cached_response_time: z.number().optional(),
  contact_groups: z.array(z.string()),
  created_at: z.string().optional(),
  modified_at: z.string().optional(),
  locations: z.array(z.string()),
  tags: z.array(z.string()).optional(),
  check_type: z.string().optional(),
  escalations: z.string().optional(),
  maintenance: z.string().optional(),
  monitoring_service_type: z.string().optional(),
  is_paused: z.boolean(),
  is_under_maintenance: z.boolean().optional(),
  state_is_up: z.boolean().optional(),
  state_changed_at: z.string().optional(),
  msp_protocol: z.string().optional(),
  msp_interval: z.number().int().min(0).max(2147483647).optional(),
  msp_address: z.string().url(),
  msp_port: z.number().int().min(1).max(65535).nullable().optional(),
  msp_username: z.string().max(255).optional(),
  msp_proxy: z.string().max(255).optional(),
  msp_dns_server: z.string().max(255).optional(),
  msp_dns_record_type: z.enum(['A', 'AAAA', 'CNAME', 'MX', 'NS', 'PTR', 'SOA', 'SRV', 'TXT']).optional(),
  msp_status_code: z.string().max(255).optional(),
  msp_send_string: z.string().optional(),
  msp_expect_string: z.string().optional(),
  msp_expect_string_type: z.enum(['exact', 'regex', 'contains']).optional(),
  msp_encryption: z.enum(['none', 'ssl']).optional(),
  msp_threshold: z.number().int().min(0).max(2147483647).nullable().optional(),
  msp_headers: z.string().optional(),
  msp_script: z.string().optional(),
  msp_version: z.number().int().min(0).max(2147483647).optional(),
  msp_sensitivity: z.number().int().min(0).max(2147483647).optional(),
  msp_num_retries: z.number().int().min(1).max(3).optional(),
  msp_use_ip_version: z.enum(['ipv4', 'ipv6', 'both']).optional(),
  msp_uptime_sla: z.string().regex(/^\d+(\.\d{1,4})?$/).optional(),
  msp_response_time_sla: z.string().regex(/^\d+(\.\d{1,3})?$/).nullable().optional(),
  msp_notes: z.string().optional(),
  msp_include_in_global_metrics: z.boolean().optional(),
  send_resolved_notifications: z.boolean().default(false).optional(),
});

export const CheckFormSchema = CheckSchema.pick({
  pk: true,
  name: true,
  contact_groups: true,
  locations: true,
  tags: true,
  msp_address: true,
  msp_interval: true,
});

export type Check = z.infer<typeof CheckSchema>
export type CheckForm = z.infer<typeof CheckFormSchema>

/**
 * Returns a new CheckForm object with default values
 */
export const spawnCheck = (): CheckForm => ({
  pk: undefined,
  name: '',
  contact_groups: [],
  locations: [],
  tags: [],
  msp_address: '',
  msp_interval: 5,
})
