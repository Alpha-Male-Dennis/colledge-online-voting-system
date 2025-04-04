
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { ArrowLeft, Download, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// This would be replaced by an actual charting library like Recharts
const FakeBarChart = ({ data }: { data: { name: string; votes: number; percentage: number }[] }) => {
  const maxPercentage = Math.max(...data.map(item => item.percentage));
  
  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>{item.name}</span>
            <span>{item.votes} votes ({item.percentage}%)</span>
          </div>
          <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full ${
                index === 0 ? "bg-primary" : "bg-muted-foreground/30"
              }`}
              style={{ width: `${item.percentage}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ElectionResults = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock data - In a real app, this would come from an API
  const election = {
    id: Number(id),
    title: "Dormitory Council",
    startDate: "2025-03-01T09:00:00",
    endDate: "2025-03-05T18:00:00",
    status: "completed",
    totalVoters: 1500,
    actualVoters: 1245,
    turnoutPercentage: 83,
    results: [
      { name: "Jane Smith", votes: 623, percentage: 50 },
      { name: "John Miller", votes: 402, percentage: 32.3 },
      { name: "Sarah Johnson", votes: 220, percentage: 17.7 }
    ],
    breakdown: {
      byDepartment: [
        { name: "Computer Science", votes: 310, percentage: 24.9 },
        { name: "Business", votes: 295, percentage: 23.7 },
        { name: "Engineering", votes: 285, percentage: 22.9 },
        { name: "Arts", votes: 180, percentage: 14.5 },
        { name: "Medicine", votes: 175, percentage: 14.0 }
      ],
      byYear: [
        { name: "Freshman", votes: 402, percentage: 32.3 },
        { name: "Sophomore", votes: 350, percentage: 28.1 },
        { name: "Junior", votes: 285, percentage: 22.9 },
        { name: "Senior", votes: 208, percentage: 16.7 }
      ]
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-muted/30 pb-8">
      {/* Header */}
      <header className="bg-background sticky top-0 z-10 border-b">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold ml-2">Election Results</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-3xl">
        <Card className="mb-6 animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">{election.title}</CardTitle>
              <Badge variant="secondary">Completed</Badge>
            </div>
            <CardDescription>
              {formatDate(election.startDate)} to {formatDate(election.endDate)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-muted/40 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Eligible Voters</p>
                <p className="text-2xl font-bold">{election.totalVoters}</p>
              </div>
              <div className="bg-muted/40 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Actual Voters</p>
                <p className="text-2xl font-bold">{election.actualVoters}</p>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Turnout Rate</p>
                <p className="text-2xl font-bold">{election.turnoutPercentage}%</p>
              </div>
            </div>
            
            <div className="flex justify-end mb-6">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </Button>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-4">Election Results</h2>
                <Card>
                  <CardContent className="p-6">
                    <FakeBarChart data={election.results} />
                    <div className="mt-6 flex items-center justify-center">
                      <Badge className="bg-green-600 text-white py-1 px-3 text-base">
                        Winner: {election.results[0].name}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">Voter Demographics</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Votes by Department</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Department</TableHead>
                            <TableHead className="text-right">Votes</TableHead>
                            <TableHead className="text-right">Percentage</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {election.breakdown.byDepartment.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell className="text-right">{item.votes}</TableCell>
                              <TableCell className="text-right">{item.percentage}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Votes by Year</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Year</TableHead>
                            <TableHead className="text-right">Votes</TableHead>
                            <TableHead className="text-right">Percentage</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {election.breakdown.byYear.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell className="text-right">{item.votes}</TableCell>
                              <TableCell className="text-right">{item.percentage}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ElectionResults;
