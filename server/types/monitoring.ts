export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'down';
  services: {
    database: ServiceHealth;
    redis: ServiceHealth;
  };
  timestamp: Date;
}

export interface ServiceHealth {
  status: 'healthy' | 'degraded' | 'down';
  latency: number;
}

export interface DashboardOverview {
  transactions: number;
  activeUsers: number;
  failedAttempts: number;
  totalVolume: number;
  updatedAt: Date;
}

export interface TransactionMetrics {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface MetricsQuery extends DateRange {
  groupBy: 'hour' | 'day' | 'week';
}

export interface AlertQuery extends DateRange {
  severity?: 'low' | 'medium' | 'high';
}
