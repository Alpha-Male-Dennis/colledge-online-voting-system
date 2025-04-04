
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FakeBarChart from "./FakeBarChart";

interface ChartDataItem {
  name: string;
  value: number;
}

interface VoterTurnoutProps {
  data: ChartDataItem[];
}

const VoterTurnout = ({ data }: VoterTurnoutProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Voter Turnout by Election</CardTitle>
      </CardHeader>
      <CardContent>
        <FakeBarChart data={data} />
      </CardContent>
    </Card>
  );
};

export default VoterTurnout;
