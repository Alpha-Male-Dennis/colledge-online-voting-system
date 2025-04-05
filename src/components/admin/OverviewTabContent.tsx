
import { Activity } from "lucide-react";
import DashboardStats from "./DashboardStats";
import RecentActivity from "./RecentActivity";
import VoterTurnout from "./VoterTurnout";

interface ActivityItem {
  action: string;
  details: string;
  time: string;
}

interface ChartDataItem {
  name: string;
  value: number;
}

interface OverviewTabContentProps {
  stats: {
    totalStudents: number;
    registeredVoters: number;
    activeElections: number;
    completedElections: number;
    recentActivity: ActivityItem[];
    popularElections: ChartDataItem[];
  };
}

const OverviewTabContent = ({ stats }: OverviewTabContentProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="flex items-center text-sm text-muted-foreground bg-muted/40 px-3 py-1 rounded-full">
          <Activity className="h-4 w-4 mr-2 text-blue-500" />
          <span>Vote Activity Overview</span>
        </div>
      </div>
      
      <DashboardStats stats={stats} />
      
      <div className="grid md:grid-cols-2 gap-6">
        <VoterTurnout data={stats.popularElections} />
        <RecentActivity activities={stats.recentActivity} />
      </div>
    </div>
  );
};

export default OverviewTabContent;
