
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";

interface ChartDataItem {
  name: string;
  value: number;
}

interface VoterTurnoutProps {
  data: ChartDataItem[];
}

const VoterTurnout = ({ data }: VoterTurnoutProps) => {
  // Calculate total votes
  const totalVotes = data.reduce((sum, item) => sum + item.value, 0);
  
  // Sort data by value in descending order
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  
  // Add colors to chart data for better visualization
  const chartData = sortedData.map(item => ({
    ...item,
    color: "#3b82f6", // blue-500
  }));

  return (
    <Card className="shadow-md hover:shadow-lg transition-all">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Voter Turnout by Election
        </CardTitle>
        <TrendingUp className="h-4 w-4 text-blue-500" />
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          Total votes: <span className="font-medium text-foreground">{totalVotes}</span>
        </div>
        
        <div className="h-[240px] w-full">
          <ChartContainer
            config={{
              blue: {
                theme: {
                  light: "#3b82f6",
                  dark: "#60a5fa",
                },
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={chartData} 
                margin={{ top: 5, right: 5, left: 5, bottom: 25 }}
                barCategoryGap={8}
              >
                <XAxis 
                  dataKey="name" 
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  angle={-35}
                  textAnchor="end"
                  height={60}
                  stroke="#9ca3af"
                />
                <YAxis 
                  hide={false}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10 }}
                  width={30}
                  stroke="#9ca3af"
                />
                <Tooltip content={<ChartTooltipContent labelKey="name" />} />
                <Bar 
                  dataKey="value" 
                  fill="var(--color-blue)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={50}
                  animationDuration={1500}
                  label={{
                    position: 'top',
                    fill: '#6b7280',
                    fontSize: 10,
                    formatter: (value: number) => `${value}`,
                    dy: -6
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoterTurnout;
