import { Card } from '@/components/ui/card';
import { useMetricsStore } from '@/stores/metricsStore';
import { Line } from 'react-chartjs-2';
import '@/lib/chart';

interface RevenueChartProps {
  dateRange: string;
  customRange: { from: Date; to: Date } | null;
}

export default function RevenueChart({ dateRange, customRange }: RevenueChartProps) {
  const { getRevenueData } = useMetricsStore();
  const data = getRevenueData(dateRange, customRange);

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Revenue',
        data: data.values,
        fill: true,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Revenue Overview</h3>
        <p className="text-sm text-gray-600">Track your earnings over time</p>
      </div>
      <div className="h-[300px]">
        <Line data={chartData} options={options} />
      </div>
    </Card>
  );
}
