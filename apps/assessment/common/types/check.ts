import { z } from 'zod'

export const CheckSchema = z.object({
  pk: z.string(),
  url: z.string().url({ message: 'Please enter a valid address.' }),
  name: z.string(),
  cached_response_time: z.number(),
  contact_groups: z.array(z.string()),
  created_at: z.string().datetime(),
  modified_at: z.string().datetime(),
  locations: z.array(z.string()),
  tags: z.array(z.string()),
  check_type: z.string(),
  escalations: z.array(z.string()),
  maintenance: z.object({
    state: z.string(),
    schedule: z.array(z.string())
  }),
  monitoring_service_type: z.string(),
  is_paused: z.boolean(),
  is_under_maintenance: z.boolean(),
  state_is_up: z.boolean(),
  state_changed_at: z.string().datetime(),
  msp_protocol: z.string(),
  msp_interval: z.number(),
  msp_address: z.string().url(),
  msp_port: z.null(),
  msp_username: z.string(),
  msp_proxy: z.string(),
  msp_dns_server: z.string(),
  msp_dns_record_type: z.string(),
  msp_status_code: z.string(),
  msp_send_string: z.string(),
  msp_expect_string: z.string(),
  msp_expect_string_type: z.string(),
  msp_encryption: z.string(),
  msp_threshold: z.number(),
  msp_headers: z.string(),
  msp_script: z.string(),
  msp_version: z.number(),
  msp_sensitivity: z.number(),
  msp_num_retries: z.number(),
  msp_use_ip_version: z.string(),
  msp_uptime_sla: z.string(),
  msp_response_time_sla: z.string(),
  msp_notes: z.string(),
  msp_include_in_global_metrics: z.boolean(),
  stats_url: z.string().url(),
  analysis_url: z.string().url(),
  alerts_url: z.string().url(),
  share_url: z.string().url()
})

export const CheckFormSchema = CheckSchema.pick({
  name: true,
  url: true,
});

export type Check = z.infer<typeof CheckSchema>
export type CheckInsert = Pick<Check, 'name' | 'url'>
export type CheckUpdate = Required<Pick<Check, 'pk'>> & Partial<Check>

/**
 * Returns a new CheckInsert object with default values
 */
export const spawnCheck = (): CheckInsert => ({
  name: '',
  url: ''
})