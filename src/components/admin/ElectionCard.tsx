
import { useNavigate } from "react-router-dom";
import { BarChart, Clock, ListPlus, Settings, Users, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ElectionProps {
  election: {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    status: string;
    candidates: number;
    votes?: number;
    eligibleVoters?: number;
    winner?: string;
  };
}

const ElectionCard = ({ election }: ElectionProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return <Badge className="bg-green-500">Active</Badge>;
    } else if (status === "upcoming") {
      return <Badge variant="outline">Upcoming</Badge>;
    } else if (status === "completed") {
      return <Badge variant="secondary">Completed</Badge>;
    }
    return null;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg">{election.title}</h3>
              {getStatusBadge(election.status)}
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {formatDate(election.startDate)} - {formatDate(election.endDate)}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {election.candidates} Candidates
              </span>
              
              {election.votes && (
                <span className="flex items-center">
                  <Vote className="h-4 w-4 mr-1" />
                  {election.votes} Votes{election.status === "upcoming" ? "" : " Cast"}
                </span>
              )}
              
              {election.votes && election.eligibleVoters && (
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {Math.round((election.votes / election.eligibleVoters) * 100)}% Turnout
                </span>
              )}
              
              {!election.votes && election.status === "upcoming" && (
                <span className="flex items-center">
                  <ListPlus className="h-4 w-4 mr-1" />
                  Prepared
                </span>
              )}
              
              {election.winner && (
                <span className="font-medium">
                  Winner: {election.winner}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {election.status === "active" && (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/admin/elections/${election.id}/results`)}
                >
                  <BarChart className="h-4 w-4 mr-1" />
                  Live Results
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/admin/elections/${election.id}/edit`)}
                >
                  <Settings className="h-4 w-4 mr-1" />
                  Manage
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                >
                  End Election
                </Button>
              </>
            )}
            
            {election.status === "upcoming" && (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/admin/elections/${election.id}/edit`)}
                >
                  <Settings className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                >
                  Start Election
                </Button>
              </>
            )}
            
            {election.status === "completed" && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate(`/admin/elections/${election.id}/results`)}
              >
                <BarChart className="h-4 w-4 mr-1" />
                View Results
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ElectionCard;
