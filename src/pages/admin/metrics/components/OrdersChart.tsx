import { Card } from '@/components/ui/card';
import { useMetricsStore } from '@/stores/metricsStore';
import { Bar } from 'react-chartjs-2';
import '@/lib/chart';

interface OrdersChartProps {
  dateRange: string;
  customRange: { from: Date; to: Date } | null;
}

export default function OrdersChart({ dateRange, customRange }: OrdersChartProps) {
  const { getOrdersData } = useMetricsStore();
  const data = getOrdersData(dateRange, customRange);

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Orders',
        data: data.values,
        backgroundColor: 'rgb(239, 68, 68)',
        borderRadius: 4
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
        },
        ticks: {
          stepSize: 1
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
        <h3 className="text-lg font-semibold">Orders Overview</h3>
        <p className="text-sm text-gray-600">Monitor order volume trends</p>
      </div>
      <div className="h-[300px]">
        <Bar data={chartData} options={options} />
      </div>
    </Card>
  );
}
