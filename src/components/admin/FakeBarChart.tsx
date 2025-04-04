
interface ChartDataItem {
  name: string;
  value: number;
}

interface FakeBarChartProps {
  data: ChartDataItem[];
}

const FakeBarChart = ({ data }: FakeBarChartProps) => {
  const max = Math.max(...data.map(item => item.value));
  
  return (
    <div className="space-y-2">
      {data.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>{item.name}</span>
            <span>{item.value}</span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary"
              style={{ width: `${(item.value / max) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FakeBarChart;
