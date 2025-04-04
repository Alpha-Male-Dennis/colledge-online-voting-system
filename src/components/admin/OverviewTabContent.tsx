
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
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      
      <DashboardStats stats={stats} />
      
      <div className="grid md:grid-cols-2 gap-6">
        <RecentActivity activities={stats.recentActivity} />
        <VoterTurnout data={stats.popularElections} />
      </div>
    </div>
  );
};

export default OverviewTabContent;
