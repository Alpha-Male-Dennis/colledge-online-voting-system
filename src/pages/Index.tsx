
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, Vote, Users, BarChart } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Shield className="h-12 w-12 text-primary" />,
      title: "Secure Authentication",
      description: "Two-factor authentication and email verification ensure only eligible students can vote."
    },
    {
      icon: <Vote className="h-12 w-12 text-primary" />,
      title: "Anonymous Voting",
      description: "Cast your vote with complete privacy. Your identity remains separate from your ballot."
    },
    {
      icon: <Users className="h-12 w-12 text-primary" />,
      title: "Candidate Profiles",
      description: "Browse detailed profiles and platforms of all candidates before making your decision."
    },
    {
      icon: <BarChart className="h-12 w-12 text-primary" />,
      title: "Real-time Results",
      description: "Watch live vote counting and statistics as the election progresses."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Campus<span className="text-primary">Vote</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-8">
          A secure and transparent platform for conducting student elections at your college.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            size="lg" 
            onClick={() => navigate("/login")}
            className="animate-fade-in"
          >
            Login to Vote
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => navigate("/register")}
            className="animate-fade-in"
          >
            Register Now
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card p-6 rounded-lg shadow-sm border border-border flex flex-col items-center text-center hover:shadow-md transition-shadow animate-fade-in"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-primary/10 rounded-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to make your voice heard?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join your fellow students in shaping the future of your college through democratic elections.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/register")}
            className="animate-fade-in"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
