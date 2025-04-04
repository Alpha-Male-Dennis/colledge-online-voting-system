
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, ArrowLeft, Clock, Plus, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Avatar } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Schema for the form validation
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date({ required_error: "End date is required" }),
  positions: z.array(
    z.object({
      id: z.string().optional(),
      title: z.string().min(1, "Position title is required"),
      description: z.string().optional(),
      candidates: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          bio: z.string().optional(),
          imageUrl: z.string().optional(),
        })
      ).default([]),
    })
  ).min(1, "At least one position is required"),
});

type FormValues = z.infer<typeof formSchema>;

// Mock election data - in a real app would come from an API call
const mockElection = {
  id: "1",
  title: "Student Council President Election",
  description: "Annual election for the Student Council President position. The winner will serve for the 2025-2026 academic year.",
  startDate: new Date("2025-05-01"),
  endDate: new Date("2025-05-03"),
  positions: [
    {
      id: "pos-1",
      title: "President",
      description: "Student Council President leads all student government initiatives.",
      candidates: [
        {
          id: "cand-1",
          name: "Jane Smith",
          bio: "Junior studying Political Science. Previous experience as Class Representative.",
          imageUrl: "/placeholder.svg",
        },
        {
          id: "cand-2",
          name: "John Doe",
          bio: "Senior studying Business Administration. Club president for 2 years.",
          imageUrl: "/placeholder.svg",
        }
      ]
    },
    {
      id: "pos-2",
      title: "Vice President",
      description: "Assists the President and leads in their absence.",
      candidates: [
        {
          id: "cand-3",
          name: "Emily Brown",
          bio: "Sophomore studying Psychology. Active in student advocacy.",
          imageUrl: "/placeholder.svg",
        }
      ]
    }
  ]
};

const AdminElectionEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("details");
  const [openAddCandidateDialog, setOpenAddCandidateDialog] = useState(false);
  const [selectedPositionIndex, setSelectedPositionIndex] = useState<number | null>(null);
  const [candidateName, setCandidateName] = useState("");
  const [candidateBio, setCandidateBio] = useState("");
  
  // Initialize the form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      positions: [{ title: "", description: "", candidates: [] }],
    },
  });
  
  // Simulate loading election data
  useEffect(() => {
    // In a real app, this would be an API call using the id from params
    console.log(`Loading election with ID: ${id}`);
    
    // Simulate API delay
    const timeout = setTimeout(() => {
      form.reset(mockElection);
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [id, form]);
  
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    
    // In a real application, you would send this data to the server
    toast({
      title: "Election Updated",
      description: "Your changes have been saved successfully.",
    });
    
    // Redirect to the admin dashboard
    navigate("/admin");
  };
  
  const addPosition = () => {
    const positions = form.getValues().positions || [];
    form.setValue("positions", [...positions, { title: "", description: "", candidates: [] }]);
  };
  
  const removePosition = (index: number) => {
    const positions = form.getValues().positions || [];
    if (positions.length > 1) {
      form.setValue("positions", positions.filter((_, i) => i !== index));
    } else {
      toast({
        title: "Cannot Remove",
        description: "At least one position is required.",
        variant: "destructive",
      });
    }
  };
  
  const handleOpenAddCandidate = (positionIndex: number) => {
    setSelectedPositionIndex(positionIndex);
    setCandidateName("");
    setCandidateBio("");
    setOpenAddCandidateDialog(true);
  };
  
  const handleAddCandidate = () => {
    if (selectedPositionIndex === null) return;
    
    if (!candidateName.trim()) {
      toast({
        title: "Error",
        description: "Candidate name is required",
        variant: "destructive",
      });
      return;
    }
    
    const positions = form.getValues().positions;
    const position = positions[selectedPositionIndex];
    
    const newCandidate = {
      id: `cand-new-${Date.now()}`,
      name: candidateName,
      bio: candidateBio,
      imageUrl: "/placeholder.svg",
    };
    
    const updatedCandidates = [...position.candidates, newCandidate];
    
    form.setValue(`positions.${selectedPositionIndex}.candidates`, updatedCandidates);
    
    setOpenAddCandidateDialog(false);
    
    toast({
      title: "Candidate Added",
      description: `${candidateName} has been added as a candidate.`,
    });
  };
  
  const handleRemoveCandidate = (positionIndex: number, candidateId: string) => {
    const positions = form.getValues().positions;
    const position = positions[positionIndex];
    
    const updatedCandidates = position.candidates.filter(c => c.id !== candidateId);
    
    form.setValue(`positions.${positionIndex}.candidates`, updatedCandidates);
    
    toast({
      title: "Candidate Removed",
      description: "The candidate has been removed from this position.",
    });
  };
  
  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate("/admin")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">Edit Election</h1>
          <p className="text-muted-foreground">Manage election details and candidates</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="details">Election Details</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Election Details</CardTitle>
                    <CardDescription>Basic information about the election</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Election Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              className="min-h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Start Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>End Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Election Positions</CardTitle>
                      <CardDescription>Add positions for candidates</CardDescription>
                    </div>
                    <Button type="button" onClick={addPosition} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" /> Add Position
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {form.watch("positions") && form.watch("positions").map((_, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Position {index + 1}</h3>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removePosition(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name={`positions.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Position Title</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`positions.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Position Description (Optional)</FormLabel>
                              <FormControl>
                                <Textarea {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" type="button" onClick={() => navigate("/admin")}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="candidates">
            <Card>
              <CardHeader>
                <CardTitle>Manage Candidates</CardTitle>
                <CardDescription>Add and remove candidates for each position</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {form.getValues().positions.map((position, posIndex) => (
                  <div key={posIndex} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-lg">{position.title}</h3>
                      <Button 
                        type="button" 
                        size="sm" 
                        onClick={() => handleOpenAddCandidate(posIndex)}
                      >
                        <User className="h-4 w-4 mr-1" /> Add Candidate
                      </Button>
                    </div>
                    
                    {position.candidates.length > 0 ? (
                      <div className="grid gap-4 md:grid-cols-2">
                        {position.candidates.map((candidate) => (
                          <Card key={candidate.id}>
                            <CardContent className="pt-6">
                              <div className="flex gap-4">
                                <Avatar className="h-12 w-12">
                                  <img src={candidate.imageUrl} alt={candidate.name} />
                                </Avatar>
                                <div className="flex-1">
                                  <h4 className="font-medium">{candidate.name}</h4>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {candidate.bio || "No bio provided"}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="justify-end p-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleRemoveCandidate(posIndex, candidate.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4 mr-1" /> Remove
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        No candidates added for this position yet.
                      </p>
                    )}
                  </div>
                ))}
              </CardContent>
              <CardFooter className="justify-end">
                <Button variant="outline" type="button" onClick={() => navigate("/admin")}>
                  Back to Dashboard
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Add Candidate Dialog */}
      <Dialog open={openAddCandidateDialog} onOpenChange={setOpenAddCandidateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Candidate</DialogTitle>
            <DialogDescription>
              Enter the details for the new candidate.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <FormLabel htmlFor="candidateName">Candidate Name</FormLabel>
              <Input
                id="candidateName"
                placeholder="Enter full name"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <FormLabel htmlFor="candidateBio">Candidate Bio (Optional)</FormLabel>
              <Textarea
                id="candidateBio"
                placeholder="Brief description of candidate qualifications, year, major, etc."
                value={candidateBio}
                onChange={(e) => setCandidateBio(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddCandidateDialog(false)}>Cancel</Button>
            <Button onClick={handleAddCandidate}>Add Candidate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminElectionEdit;
