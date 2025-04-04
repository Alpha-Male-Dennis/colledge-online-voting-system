
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, FileUp, FileDown, MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

// Mock voter data
const mockVoters = [
  { id: "1001", name: "Alice Johnson", email: "alice@university.edu", status: "active", lastLogin: "2025-04-03" },
  { id: "1002", name: "Bob Smith", email: "bob@university.edu", status: "active", lastLogin: "2025-04-02" },
  { id: "1003", name: "Charlie Davis", email: "charlie@university.edu", status: "pending", lastLogin: null },
  { id: "1004", name: "Diana Wilson", email: "diana@university.edu", status: "active", lastLogin: "2025-04-01" },
  { id: "1005", name: "Edward Brown", email: "edward@university.edu", status: "suspended", lastLogin: "2025-03-25" },
  { id: "1006", name: "Fiona Miller", email: "fiona@university.edu", status: "active", lastLogin: "2025-04-04" },
  { id: "1007", name: "George Taylor", email: "george@university.edu", status: "active", lastLogin: "2025-04-03" },
  { id: "1008", name: "Hannah Clark", email: "hannah@university.edu", status: "pending", lastLogin: null },
];

const VotersSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [voters, setVoters] = useState(mockVoters);
  const { toast } = useToast();

  const filteredVoters = voters.filter(voter => 
    voter.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    voter.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    voter.id.includes(searchQuery)
  );

  const handleImportData = () => {
    toast({
      title: "Import Started",
      description: "Student data import has been initiated.",
    });
    // In a real app, this would open a file picker or API call
  };

  const handleExportData = () => {
    toast({
      title: "Export Complete",
      description: "Voter data has been exported.",
    });
    // In a real app, this would generate a CSV file
  };

  const handleAddVoter = () => {
    // This would open a modal form to add a new voter
    toast({
      title: "Add Voter",
      description: "The form to add a new voter would appear here.",
    });
  };

  const handleApproveVoter = (id: string) => {
    setVoters(prev => 
      prev.map(voter => 
        voter.id === id ? { ...voter, status: "active" } : voter
      )
    );
    toast({
      title: "Voter Approved",
      description: `Voter ID ${id} has been approved.`,
    });
  };

  const handleSuspendVoter = (id: string) => {
    setVoters(prev => 
      prev.map(voter => 
        voter.id === id ? { ...voter, status: "suspended" } : voter
      )
    );
    toast({
      title: "Voter Suspended",
      description: `Voter ID ${id} has been suspended.`,
    });
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    }).format(date);
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Pending</Badge>;
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Voters</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportData}>
            <FileDown className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleImportData}>
            <FileUp className="h-4 w-4 mr-2" />
            Import Student Data
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search voters..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button onClick={handleAddVoter}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Voter
              </Button>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVoters.length > 0 ? (
                    filteredVoters.map((voter) => (
                      <TableRow key={voter.id}>
                        <TableCell className="font-medium">{voter.id}</TableCell>
                        <TableCell>{voter.name}</TableCell>
                        <TableCell>{voter.email}</TableCell>
                        <TableCell>{renderStatusBadge(voter.status)}</TableCell>
                        <TableCell>{formatDate(voter.lastLogin)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => toast({ title: "View Details", description: `View details for ${voter.name}` })}>
                                View details
                              </DropdownMenuItem>
                              {voter.status === "pending" && (
                                <DropdownMenuItem onClick={() => handleApproveVoter(voter.id)}>
                                  Approve registration
                                </DropdownMenuItem>
                              )}
                              {voter.status === "active" && (
                                <DropdownMenuItem onClick={() => handleSuspendVoter(voter.id)}>
                                  Suspend account
                                </DropdownMenuItem>
                              )}
                              {voter.status === "suspended" && (
                                <DropdownMenuItem onClick={() => handleApproveVoter(voter.id)}>
                                  Reactivate account
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => toast({ 
                                  title: "Delete Account", 
                                  description: "This would permanently delete the account",
                                  variant: "destructive"
                                })}
                              >
                                Delete account
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No voters found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VotersSection;
