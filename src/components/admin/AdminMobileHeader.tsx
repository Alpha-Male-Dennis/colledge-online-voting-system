
import { LogOut, Vote } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Calendar, Shield, Users } from "lucide-react";

interface AdminMobileHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminMobileHeader = ({ activeTab, setActiveTab }: AdminMobileHeaderProps) => {
  const navigate = useNavigate();
  
  return (
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
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="overview">
              <BarChart className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="elections">
              <Calendar className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="voters">
              <Users className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </header>
  );
};

export default AdminMobileHeader;
