
import { useState, useEffect } from "react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import AddVoterForm from "./AddVoterForm";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseQuery } from "@/hooks/useSupabaseQuery";
import { useSupabaseUpdate } from "@/hooks/useSupabaseMutation";

const VotersSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddVoterOpen, setIsAddVoterOpen] = useState(false);
  const { toast } = useToast();

  // Fetch voters from Supabase
  const { data: voters = [], refetch: refetchVoters } = useSupabaseQuery<any[]>(
    ['voters'],
    'profiles',
    {
      select: '*, auth_users:auth.users(email, last_sign_in_at)',
      order: { column: 'created_at', ascending: false },
    }
  );

  // Update voter status mutation
  const updateVoterMutation = useSupabaseUpdate('profiles', {
    toastSuccess: { title: 'Voter status updated successfully' },
    toastError: { title: 'Failed to update voter status' },
    invalidateQueries: [['voters']],
  });

  const filteredVoters = voters.filter(voter => 
    (voter.first_name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
    (voter.last_name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
    (voter.auth_users?.email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (voter.student_id || '').includes(searchQuery)
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
    setIsAddVoterOpen(true);
  };

  const handleSubmitVoter = async (formData: any) => {
    try {
      // In a real implementation, this would create a user account
      // For this demo, we just show a success message
      toast({
        title: "Voter Invitation Sent",
        description: `${formData.name} has been invited to the system.`,
      });
      
      setIsAddVoterOpen(false);
      refetchVoters();
    } catch (error) {
      console.error("Error adding voter:", error);
      toast({
        title: "Error",
        description: "Failed to add voter. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleUpdateVoterStatus = (id: string, status: string) => {
    updateVoterMutation.mutate({ 
      id, 
      data: { 
        status,
        // Update other fields as needed
      } 
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

  const renderStatusBadge = (voter: any) => {
    // Determine status based on Supabase auth state and profile
    if (!voter.auth_users) {
      return <Badge variant="outline" className="text-amber-500 border-amber-500">Pending</Badge>;
    }
    
    if (voter.is_admin) {
      return <Badge className="bg-blue-500">Admin</Badge>;
    }
    
    return <Badge className="bg-green-500">Active</Badge>;
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
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVoters.length > 0 ? (
                    filteredVoters.map((voter) => (
                      <TableRow key={voter.id}>
                        <TableCell className="font-medium">{`${voter.first_name} ${voter.last_name}`}</TableCell>
                        <TableCell>{voter.auth_users?.email || "Not registered"}</TableCell>
                        <TableCell>{voter.student_id || "N/A"}</TableCell>
                        <TableCell>{renderStatusBadge(voter)}</TableCell>
                        <TableCell>{formatDate(voter.auth_users?.last_sign_in_at)}</TableCell>
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
                              <DropdownMenuItem onClick={() => toast({ title: "View Details", description: `View details for ${voter.first_name} ${voter.last_name}` })}>
                                View details
                              </DropdownMenuItem>
                              
                              {!voter.is_admin && (
                                <DropdownMenuItem onClick={() => updateVoterMutation.mutate({ id: voter.id, data: { is_admin: true } })}>
                                  Make admin
                                </DropdownMenuItem>
                              )}
                              
                              {voter.is_admin && (
                                <DropdownMenuItem onClick={() => updateVoterMutation.mutate({ id: voter.id, data: { is_admin: false } })}>
                                  Remove admin
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

      {/* Add Voter Dialog */}
      <Dialog open={isAddVoterOpen} onOpenChange={setIsAddVoterOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Voter</DialogTitle>
          </DialogHeader>
          <AddVoterForm 
            onSubmit={handleSubmitVoter}
            onCancel={() => setIsAddVoterOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VotersSection;
