
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  AlertDialog, AlertDialogAction, AlertDialogCancel, 
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter, 
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowLeft, Vote } from "lucide-react";

const ElectionVote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock data - In a real app, this would come from an API
  const election = {
    id: Number(id),
    title: "Social Committee Chair",
    startDate: "2025-04-01T09:00:00",
    endDate: "2025-04-10T18:00:00",
    description: "Select the candidate who will organize social events for the upcoming academic year. The Social Committee Chair is responsible for planning and executing major campus social events and ensuring they meet the diverse needs of the student body.",
    candidates: [
      {
        id: "c1",
        name: "Alex Johnson",
        photo: "/placeholder.svg",
        bio: "Third-year Psychology major with two years of experience on the social committee. I want to bring more inclusive events that appeal to our diverse student body.",
        platform: "Increase event diversity, improve event accessibility, implement student feedback system.",
      },
      {
        id: "c2",
        name: "Riley Smith",
        photo: "/placeholder.svg",
        bio: "Fourth-year Business major and event planning intern. I've organized multiple charity events and want to bring that experience to campus.",
        platform: "Partner with local businesses, create signature annual events, implement budget-friendly activities.",
      },
      {
        id: "c3",
        name: "Jordan Williams",
        photo: "/placeholder.svg",
        bio: "Second-year Communications student with a background in digital marketing. I want to enhance our campus community through innovative events.",
        platform: "Upgrade online event promotion, create themed event series, focus on sustainability in event planning.",
      }
    ]
  };

  const handleVoteSubmit = () => {
    if (!selectedCandidate) return;
    
    setIsSubmitting(true);
    
    // In a real app, this would make an API call
    setTimeout(() => {
      toast({
        title: "Vote Submitted Successfully",
        description: "Your vote has been recorded securely and anonymously.",
      });
      setIsSubmitting(false);
      navigate("/dashboard");
    }, 1500);
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
          <h1 className="text-xl font-bold ml-2">Election Ballot</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-3xl">
        <Card className="mb-6 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl">{election.title}</CardTitle>
            <CardDescription>
              Voting Period: {formatDate(election.startDate)} to {formatDate(election.endDate)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{election.description}</p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Select One Candidate</h2>
          
          <RadioGroup value={selectedCandidate || ""} onValueChange={setSelectedCandidate}>
            {election.candidates.map((candidate) => (
              <Card 
                key={candidate.id} 
                className={`mb-4 cursor-pointer hover:bg-accent/50 transition-colors ${
                  selectedCandidate === candidate.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedCandidate(candidate.id)}
              >
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="md:col-span-1">
                      <AspectRatio ratio={1/1} className="bg-muted rounded-md overflow-hidden mb-2">
                        <img 
                          src={candidate.photo} 
                          alt={candidate.name} 
                          className="object-cover w-full h-full"
                        />
                      </AspectRatio>
                      <div className="flex items-center justify-center mt-2">
                        <RadioGroupItem value={candidate.id} id={candidate.id} className="mr-2" />
                        <Label htmlFor={candidate.id} className="font-medium text-lg cursor-pointer">
                          {candidate.name}
                        </Label>
                      </div>
                    </div>
                    
                    <div className="md:col-span-3 space-y-4">
                      <div>
                        <h3 className="text-lg font-medium mb-1">About</h3>
                        <p className="text-muted-foreground">{candidate.bio}</p>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-medium mb-1">Platform</h3>
                        <p className="text-muted-foreground">{candidate.platform}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </RadioGroup>
        </div>

        <div className="mt-8 flex justify-end">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                size="lg" 
                disabled={!selectedCandidate} 
                className="px-8"
              >
                <Vote className="mr-2 h-4 w-4" />
                Submit Ballot
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Your Vote</AlertDialogTitle>
                <AlertDialogDescription>
                  {selectedCandidate && (
                    <p>
                      You are voting for{" "}
                      <strong>
                        {election.candidates.find(c => c.id === selectedCandidate)?.name}
                      </strong>
                      . This action cannot be undone.
                    </p>
                  )}
                  <p className="mt-2">
                    Your vote will be securely recorded and kept anonymous. Once submitted, you 
                    cannot change your selection for this election.
                  </p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleVoteSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Confirm Vote"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </main>
    </div>
  );
};

export default ElectionVote;
