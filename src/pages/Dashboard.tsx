
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BarChart, Clipboard, LogOut, ChevronRight, 
  Vote, Calendar, User, Settings, Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("elections");
  
  // Mock data - In a real app, this would come from an API
  const upcomingElections = [
    {
      id: 1,
      title: "Student Council President",
      startDate: "2025-05-01T09:00:00",
      endDate: "2025-05-03T18:00:00",
      status: "upcoming"
    },
    {
      id: 2,
      title: "Department Representatives",
      startDate: "2025-05-10T09:00:00",
      endDate: "2025-05-12T18:00:00",
      status: "upcoming"
    }
  ];
  
  const activeElections = [
    {
      id: 3,
      title: "Social Committee Chair",
      startDate: "2025-04-01T09:00:00",
      endDate: "2025-04-10T18:00:00",
      status: "active",
      voted: false
    }
  ];
  
  const pastElections = [
    {
      id: 4,
      title: "Dormitory Council",
      startDate: "2025-03-01T09:00:00",
      endDate: "2025-03-05T18:00:00",
      status: "completed",
      voted: true,
      results: {
        winner: "Jane Smith",
        totalVotes: 1245
      }
    }
  ];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadge = (status: string, voted: boolean | undefined = undefined) => {
    if (status === "active") {
      return voted 
        ? <Badge className="bg-green-500">Voted</Badge>
        : <Badge className="bg-blue-500">Open for Voting</Badge>;
    } else if (status === "upcoming") {
      return <Badge variant="outline">Upcoming</Badge>;
    } else if (status === "completed") {
      return <Badge variant="secondary">Completed</Badge>;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header with Navigation */}
      <header className="bg-background sticky top-0 z-10 border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Vote className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Campus<span className="text-primary">Vote</span></h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" onClick={() => setActiveTab("elections")}>
              <Calendar className="h-4 w-4 mr-2" /> Elections
            </Button>
            <Button variant="ghost" onClick={() => setActiveTab("profile")}>
              <User className="h-4 w-4 mr-2" /> My Profile
            </Button>
            <Button variant="ghost" onClick={() => setActiveTab("results")}>
              <BarChart className="h-4 w-4 mr-2" /> Results
            </Button>
            <Button variant="ghost" onClick={() => navigate("/notifications")}>
              <Bell className="h-4 w-4 mr-2" /> Notifications
            </Button>
          </nav>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 md:w-[400px] mx-auto">
            <TabsTrigger value="elections">Elections</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>
          
          {/* Elections Tab */}
          <TabsContent value="elections" className="space-y-6 animate-fade-in">
            <section>
              <h2 className="text-2xl font-bold mb-4">Active Elections</h2>
              {activeElections.length > 0 ? (
                <div className="grid gap-4">
                  {activeElections.map((election) => (
                    <Card key={election.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle>{election.title}</CardTitle>
                          {getStatusBadge(election.status, election.voted)}
                        </div>
                        <CardDescription>
                          {formatDate(election.startDate)} - {formatDate(election.endDate)}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button 
                          onClick={() => navigate(`/elections/${election.id}`)}
                          disabled={election.voted}
                          className="w-full"
                        >
                          {election.voted ? "Already Voted" : "Vote Now"}
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-4 text-center text-muted-foreground">
                    No active elections at the moment.
                  </CardContent>
                </Card>
              )}
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Upcoming Elections</h2>
              <div className="grid gap-4">
                {upcomingElections.map((election) => (
                  <Card key={election.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{election.title}</CardTitle>
                        {getStatusBadge(election.status)}
                      </div>
                      <CardDescription>
                        {formatDate(election.startDate)} - {formatDate(election.endDate)}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        onClick={() => navigate(`/elections/${election.id}/preview`)}
                        className="w-full"
                      >
                        Preview Candidates
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Past Elections</h2>
              <div className="grid gap-4">
                {pastElections.map((election) => (
                  <Card key={election.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{election.title}</CardTitle>
                        {getStatusBadge(election.status, election.voted)}
                      </div>
                      <CardDescription>
                        {formatDate(election.startDate)} - {formatDate(election.endDate)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="text-sm">
                        <p><strong>Winner:</strong> {election.results.winner}</p>
                        <p><strong>Total Votes:</strong> {election.results.totalVotes}</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        onClick={() => navigate(`/elections/${election.id}/results`)}
                        className="w-full"
                      >
                        View Detailed Results
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>
          
          {/* Profile Tab */}
          <TabsContent value="profile" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
                <CardDescription>
                  Manage your personal information and voting preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Full Name</p>
                    <p className="text-lg">John Doe</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-lg">john.doe@university.edu</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Student ID</p>
                    <p className="text-lg">S12345678</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Department</p>
                    <p className="text-lg">Computer Science</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <p className="text-sm font-medium mb-2">Voting History</p>
                  <div className="border rounded-md divide-y">
                    {pastElections.map((election) => (
                      <div key={election.id} className="p-3 flex justify-between items-center">
                        <div>
                          <p className="font-medium">{election.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(election.endDate)}
                          </p>
                        </div>
                        <Badge className="bg-green-500">Voted</Badge>
                      </div>
                    ))}
                    <div className="p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Student Union Elections</p>
                        <p className="text-sm text-muted-foreground">Feb 12, 2025</p>
                      </div>
                      <Badge className="bg-green-500">Voted</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => navigate("/settings")}>
                  Account Settings
                </Button>
                <Button onClick={() => navigate("/change-password")}>
                  Change Password
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Results Tab */}
          <TabsContent value="results" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Election Results</CardTitle>
                <CardDescription>
                  View the outcomes of past elections and voting statistics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-muted-foreground py-8">
                  Select an election from the list below to view detailed results
                </p>
                
                <div className="grid gap-4">
                  {pastElections.map((election) => (
                    <Button 
                      key={election.id}
                      variant="outline" 
                      className="justify-between h-auto py-3"
                      onClick={() => navigate(`/elections/${election.id}/results`)}
                    >
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{election.title}</span>
                        <span className="text-sm text-muted-foreground">
                          Ended on {formatDate(election.endDate)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clipboard className="h-4 w-4 mr-2" />
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </Button>
                  ))}
                  <Button 
                    variant="outline" 
                    className="justify-between h-auto py-3"
                    onClick={() => navigate(`/elections/5/results`)}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Student Union Elections</span>
                      <span className="text-sm text-muted-foreground">
                        Ended on Feb 12, 2025
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clipboard className="h-4 w-4 mr-2" />
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
