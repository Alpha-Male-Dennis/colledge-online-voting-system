
import { FilePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ElectionCard from "./ElectionCard";

interface Election {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  status: string;
  candidates: number;
  votes?: number;
  eligibleVoters?: number;
  winner?: string;
}

interface ElectionsSectionProps {
  activeElections: Election[];
  upcomingElections: Election[];
  completedElections: Election[];
}

const ElectionsSection = ({ activeElections, upcomingElections, completedElections }: ElectionsSectionProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Elections</h1>
        <Button onClick={() => navigate("/admin/elections/new")}>
          <FilePlus className="h-4 w-4 mr-2" />
          Create Election
        </Button>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Active Elections</h2>
          <div className="grid gap-4">
            {activeElections.map((election) => (
              <ElectionCard key={election.id} election={election} />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Upcoming Elections</h2>
          <div className="grid gap-4">
            {upcomingElections.map((election) => (
              <ElectionCard key={election.id} election={election} />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Completed Elections</h2>
          <div className="grid gap-4">
            {completedElections.map((election) => (
              <ElectionCard key={election.id} election={election} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionsSection;
