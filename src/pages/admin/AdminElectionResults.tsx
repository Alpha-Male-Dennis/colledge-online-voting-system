
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, BarChart, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock election results data - in a real app would come from an API call
const mockElectionResults = {
  id: "1",
  title: "Student Council President Election",
  status: "active", // active, completed, or upcoming
  startDate: "2025-04-01T09:00:00",
  endDate: "2025-04-10T18:00:00",
  totalEligibleVoters: 2845,
  positions: [
    {
      id: "pos-1",
      title: "President",
      candidates: [
        {
          id: "cand-1",
          name: "Jane Smith",
          votes: 345,
          imageUrl: "/placeholder.svg",
        },
        {
          id: "cand-2",
          name: "John Doe",
          votes: 289,
          imageUrl: "/placeholder.svg",
        },
        {
          id: "cand-3",
          name: "Sarah Johnson",
          votes: 167,
          imageUrl: "/placeholder.svg",
        }
      ],
      totalVotes: 801,
    },
    {
      id: "pos-2",
      title: "Vice President",
      candidates: [
        {
          id: "cand-4",
          name: "Michael Brown",
          votes: 423,
          imageUrl: "/placeholder.svg",
        },
        {
          id: "cand-5",
          name: "Emily Wilson",
          votes: 357,
          imageUrl: "/placeholder.svg",
        }
      ],
      totalVotes: 780,
    }
  ],
  votesOverTime: [
    { time: "Day 1", votes: 245 },
    { time: "Day 2", votes: 198 },
    { time: "Day 3", votes: 167 },
    { time: "Day 4", votes: 142 },
    { time: "Day 5", votes: 110 },
    { time: "Day 6", votes: 89 },
    { time: "Day 7", votes: 72 },
    { time: "Day 8", votes: 58 },
    { time: "Day 9", votes: 45 },
    { time: "Day 10", votes: 35 },
  ],
  votesPerDepartment: [
    { department: "Engineering", votes: 312 },
    { department: "Business", votes: 245 },
    { department: "Arts & Sciences", votes: 287 },
    { department: "Medicine", votes: 165 },
    { department: "Law", votes: 104 },
    { department: "Education", votes: 92 },
  ],
  votesPerGradeLevel: [
    { level: "Freshman", votes: 205 },
    { level: "Sophomore", votes: 240 },
    { level: "Junior", votes: 268 },
    { level: "Senior", votes: 287 },
    { level: "Graduate", votes: 112 },
  ]
};

// For the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

const AdminElectionResults = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [electionData, setElectionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would be an API call using the id from params
    console.log(`Loading election results for ID: ${id}`);
    
    // Simulate API delay
    const timeout = setTimeout(() => {
      setElectionData(mockElectionResults);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, [id]);
  
  const handleExportResults = () => {
    toast({
      title: "Export Started",
      description: "Election results are being prepared for export.",
    });
    
    // In a real app, this would generate a CSV or PDF file
  };
  
  const handleShareResults = () => {
    toast({
      title: "Share Link Copied",
      description: "A public link to these results has been copied to your clipboard.",
    });
    
    // In a real app, this would copy a shareable URL to clipboard
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading Results</h2>
          <p className="text-muted-foreground">Please wait...</p>
        </div>
      </div>
    );
  }
  
  const totalVotes = electionData.positions.reduce((sum: number, pos: any) => sum + pos.totalVotes, 0);
  const turnoutPercentage = Math.round((totalVotes / electionData.totalEligibleVoters) * 100);
  
  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate("/admin")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{electionData.title} Results</h1>
              <p className="text-muted-foreground">
                {new Date(electionData.startDate).toLocaleDateString()} - {new Date(electionData.endDate).toLocaleDateString()}
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExportResults}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" onClick={handleShareResults}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Votes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVotes}</div>
              <p className="text-xs text-muted-foreground">
                From {electionData.positions.length} positions
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Voter Turnout
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{turnoutPercentage}%</div>
              <p className="text-xs text-muted-foreground">
                Of {electionData.totalEligibleVoters} eligible voters
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                <Badge className={electionData.status === "active" ? "bg-green-500" : 
                               electionData.status === "completed" ? "bg-gray-500" : "bg-blue-500"}>
                  {electionData.status === "active" ? "In Progress" : 
                   electionData.status === "completed" ? "Completed" : "Upcoming"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {electionData.status === "active" ? 
                  `Ends on ${new Date(electionData.endDate).toLocaleDateString()}` :
                  electionData.status === "completed" ? 
                  `Ended on ${new Date(electionData.endDate).toLocaleDateString()}` :
                  `Starts on ${new Date(electionData.startDate).toLocaleDateString()}`}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="positions">Results by Position</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Vote Activity Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer 
                    config={{
                      votes: {
                        theme: {
                          light: "#3b82f6",
                          dark: "#60a5fa",
                        },
                        label: "Votes Cast",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={electionData.votesOverTime}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 60,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="time" 
                          angle={-45} 
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent labelKey="time" />} />
                        <Bar 
                          dataKey="votes" 
                          fill="var(--color-votes)" 
                          name="Votes"
                          radius={[4, 4, 0, 0]}
                        />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Votes by Department</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={electionData.votesPerDepartment}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="votes"
                          nameKey="department"
                        >
                          {electionData.votesPerDepartment.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name, props) => [value, props.payload.department]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Votes by Grade Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer 
                      config={{
                        level: {
                          theme: {
                            light: "#8b5cf6",
                            dark: "#a78bfa",
                          },
                        },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart
                          data={electionData.votesPerGradeLevel}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 20,
                          }}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis 
                            type="category" 
                            dataKey="level" 
                            width={100}
                          />
                          <Tooltip content={<ChartTooltipContent labelKey="level" />} />
                          <Bar 
                            dataKey="votes" 
                            fill="var(--color-level)" 
                            name="Votes"
                            radius={[0, 4, 4, 0]}
                          />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="positions">
            <div className="space-y-6">
              {electionData.positions.map((position: any) => (
                <Card key={position.id}>
                  <CardHeader>
                    <CardTitle>{position.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Candidate</TableHead>
                              <TableHead>Votes</TableHead>
                              <TableHead>Percentage</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {position.candidates.map((candidate: any) => (
                              <TableRow key={candidate.id} className={candidate.votes === Math.max(...position.candidates.map((c: any) => c.votes)) ? "bg-muted/50" : ""}>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                      <img src={candidate.imageUrl} alt={candidate.name} />
                                    </Avatar>
                                    <span>{candidate.name}</span>
                                  </div>
                                </TableCell>
                                <TableCell>{candidate.votes}</TableCell>
                                <TableCell>{Math.round((candidate.votes / position.totalVotes) * 100)}%</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      
                      <div className="h-[300px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={position.candidates}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="votes"
                              nameKey="name"
                            >
                              {position.candidates.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center text-sm text-muted-foreground">
                      Total votes for this position: <strong>{position.totalVotes}</strong> 
                      {position.totalVotes > 0 && ` (${Math.round((position.totalVotes / electionData.totalEligibleVoters) * 100)}% of eligible voters)`}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="demographics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Votes by Department</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead>Votes</TableHead>
                        <TableHead>Percentage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {electionData.votesPerDepartment.map((dept: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{dept.department}</TableCell>
                          <TableCell>{dept.votes}</TableCell>
                          <TableCell>{Math.round((dept.votes / totalVotes) * 100)}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Votes by Grade Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Grade Level</TableHead>
                        <TableHead>Votes</TableHead>
                        <TableHead>Percentage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {electionData.votesPerGradeLevel.map((level: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{level.level}</TableCell>
                          <TableCell>{level.votes}</TableCell>
                          <TableCell>{Math.round((level.votes / totalVotes) * 100)}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminElectionResults;
