
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface ChartDataItem {
  name: string;
  value: number;
}

interface VoterTurnoutProps {
  data: ChartDataItem[];
}

const VoterTurnout = ({ data }: VoterTurnoutProps) => {
  // Add colors to chart data for better visualization
  const chartData = data.map(item => ({
    ...item,
    color: "#3b82f6", // blue-500
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Voter Turnout by Election</CardTitle>
      </CardHeader>
      <CardContent>
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
              <BarChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
                <XAxis 
                  dataKey="name" 
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  angle={-35}
                  textAnchor="end"
                />
                <YAxis hide />
                <Tooltip content={<ChartTooltipContent labelKey="name" />} />
                <Bar 
                  dataKey="value" 
                  fill="var(--color-blue)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={50}
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
