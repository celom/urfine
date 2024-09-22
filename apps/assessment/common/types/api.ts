// API

export interface ApiRequest {
  page?: number;
  page_size?: number;
  search?: string;
}

export interface ApiGetResponse<T> {
  count: number;
  /** 
   * The URL to the next page of results.
   * @example http://api.example.org/accounts/?page=4
   */
  next: string;
  /** 
   * The URL to the previous page of results.
   * @example http://api.example.org/accounts/?page=2
   */
  previous: string;
  results: T;
}

export interface ApiMutateResponse<T> {
  messages: {
    errors: boolean,
    detail: string,
  };
  results: T;
}

// Check

export interface ApiCheckRequest extends ApiRequest {
  ordering?: 'pk' | '-pk' | 'address' | '-address' | 'name' | '-name' | 'monitoring_service_type' | '-monitoring_service_type' | 'created_at' | '-created_at';
  monitoring_service_type?: 'HTTP' | 'HTTP_POC' | 'RUM2' | 'ICMP' | 'SSH' | 'TCP' | 'UDP' | 'DNS' | 'SMTP' | 'POP' | 'IMAP' | 'NTP' | 'BLACKLIST' | 'WHOIS' | 'MALWARE' | 'SSL_CERT' | 'TRANSACTION' | 'API' | 'HEARTBEAT' | 'WEBHOOK' | 'GROUP' | 'PAGESPEED';
  is_paused?: boolean;
  is_under_maintenance?: boolean;
  state_is_up?: boolean;
  has_maintenance_schedule?: boolean;
  tag?: string;
}