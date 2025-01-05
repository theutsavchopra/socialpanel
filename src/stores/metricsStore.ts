import { create } from 'zustand';
import { addDays, eachDayOfInterval, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subMonths, subWeeks } from 'date-fns';
import { formatShortDate } from '@/lib/utils';

interface DateRange {
  from: Date;
  to: Date;
}

function getDateRange(range: string, customRange: DateRange | null): DateRange {
  if (customRange) return customRange;

  const now = new Date();
  
  switch (range) {
    case 'this_month':
      return {
        from: startOfMonth(now),
        to: endOfMonth(now)
      };
    case 'last_month':
      const lastMonth = subMonths(now, 1);
      return {
        from: startOfMonth(lastMonth),
        to: endOfMonth(lastMonth)
      };
    case 'this_week':
      return {
        from: startOfWeek(now, { weekStartsOn: 1 }),
        to: endOfWeek(now, { weekStartsOn: 1 })
      };
    case 'last_week':
      const lastWeek = subWeeks(now, 1);
      return {
        from: startOfWeek(lastWeek, { weekStartsOn: 1 }),
        to: endOfWeek(lastWeek, { weekStartsOn: 1 })
      };
    default:
      return {
        from: startOfMonth(now),
        to: endOfMonth(now)
      };
  }
}

interface MetricsStore {
  getMetrics: (range: string, customRange: DateRange | null) => {
    // Revenue metrics
    revenueToday: number;
    revenueThisMonth: number;
    revenueAllTime: number;
    revenueChange: number;
    
    // Order metrics
    orders: number;
    ordersChange: number;
    completedOrders: number;
    pendingOrders: number;
    
    // Customer metrics
    totalCustomers: number;
    activeCustomers: number;
    newCustomersToday: number;
    customersChange: number;
  };
  getRevenueData: (range: string, customRange: DateRange | null) => {
    labels: string[];
    values: number[];
  };
  getOrdersData: (range: string, customRange: DateRange | null) => {
    labels: string[];
    values: number[];
  };
  getTopPackages: (range: string, customRange: DateRange | null) => Array<{
    id: string;
    name: string;
    orders: number;
    revenue: number;
    percentageOfTotal: number;
  }>;
}

export const useMetricsStore = create<MetricsStore>(() => ({
  getMetrics: (range, customRange) => {
    // Mock data - in production this would fetch from an API
    return {
      // Revenue metrics
      revenueToday: 2890.50,
      revenueThisMonth: 25890.50,
      revenueAllTime: 158920.75,
      revenueChange: 12.5,
      
      // Order metrics
      orders: 156,
      ordersChange: 8.3,
      completedOrders: 142,
      pendingOrders: 14,
      
      // Customer metrics
      totalCustomers: 892,
      activeCustomers: 654,
      newCustomersToday: 12,
      customersChange: 5.2
    };
  },

  getRevenueData: (range, customRange) => {
    const { from, to } = getDateRange(range, customRange);
    const days = eachDayOfInterval({ start: from, end: to });

    return {
      labels: days.map(day => formatShortDate(day)),
      values: days.map(() => Math.floor(Math.random() * 2000) + 1000)
    };
  },

  getOrdersData: (range, customRange) => {
    const { from, to } = getDateRange(range, customRange);
    const days = eachDayOfInterval({ start: from, end: to });

    return {
      labels: days.map(day => formatShortDate(day)),
      values: days.map(() => Math.floor(Math.random() * 20) + 5)
    };
  },

  getTopPackages: (range, customRange) => [
    {
      id: '1',
      name: '10K Premium Views',
      orders: 42,
      revenue: 8400,
      percentageOfTotal: 32.4
    },
    {
      id: '2',
      name: '5K Premium Views',
      orders: 38,
      revenue: 5700,
      percentageOfTotal: 22.0
    },
    {
      id: '3',
      name: '25K Regular Views',
      orders: 31,
      revenue: 4650,
      percentageOfTotal: 17.9
    },
    {
      id: '4',
      name: '1K Premium Views',
      orders: 28,
      revenue: 2800,
      percentageOfTotal: 10.8
    }
  ]
}));
