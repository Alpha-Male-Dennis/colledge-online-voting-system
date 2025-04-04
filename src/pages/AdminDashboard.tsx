
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BarChart, Clock, ListPlus, LogOut, ShieldAlert, 
  Users, Settings, Vote, Calendar, FilePlus, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// This would be replaced by an actual charting library like Recharts
const FakeBarChart = ({ data }: { data: { name: string; value: number }[] }) => {
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

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data - In a real app, this would come from an API
  const stats = {
    totalStudents: 3580,
    registeredVoters: 2845,
    activeElections: 1,
    completedElections: 4,
    recentActivity: [
      { action: "Election Created", details: "Student Council President", time: "2 hours ago" },
      { action: "Election Started", details: "Social Committee Chair", time: "1 day ago" },
      { action: "Election Ended", details: "Dormitory Council", time: "3 days ago" },
      { action: "User Banned", details: "Suspicious activity detected", time: "5 days ago" }
    ],
    popularElections: [
      { name: "Student Council", value: 1245 },
      { name: "Department Reps", value: 1050 },
      { name: "Social Committee", value: 980 },
      { name: "Dormitory Council", value: 875 }
    ]
  };
  
  const activeElections = [
    {
      id: 1,
      title: "Social Committee Chair",
      startDate: "2025-04-01T09:00:00",
      endDate: "2025-04-10T18:00:00",
      status: "active",
      candidates: 3,
      votes: 457,
      eligibleVoters: 2845
    }
  ];
  
  const upcomingElections = [
    {
      id: 2,
      title: "Student Council President",
      startDate: "2025-05-01T09:00:00",
      endDate: "2025-05-03T18:00:00",
      status: "upcoming",
      candidates: 4,
      eligibleVoters: 2845
    },
    {
      id: 3,
      title: "Department Representatives",
      startDate: "2025-05-10T09:00:00",
      endDate: "2025-05-12T18:00:00",
      status: "upcoming",
      candidates: 8,
      eligibleVoters: 2845
    }
  ];
  
  const completedElections = [
    {
      id: 4,
      title: "Dormitory Council",
      startDate: "2025-03-01T09:00:00",
      endDate: "2025-03-05T18:00:00",
      status: "completed",
      candidates: 3,
      votes: 1245,
      eligibleVoters: 2800,
      winner: "Jane Smith"
    },
    {
      id: 5,
      title: "Student Union Elections",
      startDate: "2025-02-10T09:00:00",
      endDate: "2025-02-15T18:00:00",
      status: "completed",
      candidates: 5,
      votes: 1356,
      eligibleVoters: 2750,
      winner: "Michael Brown"
    }
  ];

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
    <div className="min-h-screen bg-muted/30">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-background border-r h-screen sticky top-0">
          <div className="p-4 flex items-center space-x-2 border-b">
            <Vote className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Admin Portal</h1>
          </div>
          
          <nav className="flex-1 p-4 space-y-1">
            <Button 
              variant={activeTab === "overview" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <BarChart className="h-4 w-4 mr-2" /> Overview
            </Button>
            <Button 
              variant={activeTab === "elections" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("elections")}
            >
              <Calendar className="h-4 w-4 mr-2" /> Elections
            </Button>
            <Button 
              variant={activeTab === "voters" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("voters")}
            >
              <Users className="h-4 w-4 mr-2" /> Voters
            </Button>
            <Button 
              variant={activeTab === "security" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("security")}
            >
              <Shield className="h-4 w-4 mr-2" /> Security
            </Button>
          </nav>
          
          <div className="p-4 border-t">
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate("/settings")}
            >
              <Settings className="h-4 w-4 mr-2" /> Settings
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => navigate("/")}
            >
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Mobile Header */}
          <header className="md:hidden bg-background sticky top-0 z-10 border-b">
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Vote className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">Admin</h1>
              </div>
              <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="px-4 pb-3">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="overview" onClick={() => setActiveTab("overview")}>
                  <BarChart className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="elections" onClick={() => setActiveTab("elections")}>
                  <Calendar className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="voters" onClick={() => setActiveTab("voters")}>
                  <Users className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="security" onClick={() => setActiveTab("security")}>
                  <Shield className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </div>
          </header>

          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6 animate-fade-in">
                <h1 className="text-2xl font-bold">Dashboard Overview</h1>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Students
                      </CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.totalStudents}</div>
                      <p className="text-xs text-muted-foreground">
                        Eligible to register as voters
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Registered Voters
                      </CardTitle>
                      <Vote className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.registeredVoters}</div>
                      <p className="text-xs text-muted-foreground">
                        {Math.round((stats.registeredVoters / stats.totalStudents) * 100)}% of total students
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Active Elections
                      </CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.activeElections}</div>
                      <p className="text-xs text-muted-foreground">
                        Currently in progress
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Completed Elections
                      </CardTitle>
                      <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.completedElections}</div>
                      <p className="text-xs text-muted-foreground">
                        In the past 12 months
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {stats.recentActivity.map((activity, index) => (
                          <div key={index} className="flex items-start">
                            <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2"></div>
                            <div className="space-y-1">
                              <p className="font-medium">{activity.action}</p>
                              <p className="text-sm text-muted-foreground">{activity.details}</p>
                              <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Voter Turnout by Election</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FakeBarChart data={stats.popularElections} />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Elections Tab */}
              <TabsContent value="elections" className="space-y-6 animate-fade-in">
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
                        <Card key={election.id} className="hover:shadow-md transition-shadow">
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
                                  <span className="flex items-center">
                                    <Vote className="h-4 w-4 mr-1" />
                                    {election.votes} Votes Cast
                                  </span>
                                  <span className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {Math.round((election.votes / election.eligibleVoters) * 100)}% Turnout
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2">
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
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Upcoming Elections</h2>
                    <div className="grid gap-4">
                      {upcomingElections.map((election) => (
                        <Card key={election.id} className="hover:shadow-md transition-shadow">
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
                                  <span className="flex items-center">
                                    <ListPlus className="h-4 w-4 mr-1" />
                                    Prepared
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2">
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
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Completed Elections</h2>
                    <div className="grid gap-4">
                      {completedElections.map((election) => (
                        <Card key={election.id} className="hover:shadow-md transition-shadow">
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
                                  <span className="flex items-center">
                                    <Vote className="h-4 w-4 mr-1" />
                                    {election.votes} Votes
                                  </span>
                                  <span className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {Math.round((election.votes / election.eligibleVoters) * 100)}% Turnout
                                  </span>
                                  <span className="font-medium">
                                    Winner: {election.winner}
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => navigate(`/admin/elections/${election.id}/results`)}
                                >
                                  <BarChart className="h-4 w-4 mr-1" />
                                  View Results
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Voters Tab */}
              <TabsContent value="voters" className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Manage Voters</h1>
                  <Button>Import Student Data</Button>
                </div>
                
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground py-16">
                      Voters management interface would be implemented here.<br />
                      Features would include viewing registered voters, approving registrations,<br />
                      managing eligibility, and handling suspicious activities.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Security & Audit</h1>
                  <Button variant="outline">
                    <ShieldAlert className="h-4 w-4 mr-2" />
                    Security Report
                  </Button>
                </div>
                
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground py-16">
                      Security and audit interface would be implemented here.<br />
                      Features would include viewing security logs, audit trails,<br />
                      suspicious activity alerts, and system integrity reports.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
