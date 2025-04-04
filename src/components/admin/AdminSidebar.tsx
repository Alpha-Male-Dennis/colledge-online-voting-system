
import { BarChart, Calendar, LogOut, Settings, Shield, Users, Vote } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminSidebar = ({ activeTab, setActiveTab }: AdminSidebarProps) => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default AdminSidebar;
