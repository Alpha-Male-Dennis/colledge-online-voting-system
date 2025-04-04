
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminMobileHeader from "@/components/admin/AdminMobileHeader";
import OverviewTabContent from "@/components/admin/OverviewTabContent";
import ElectionsSection from "@/components/admin/ElectionsSection";
import VotersSection from "@/components/admin/VotersSection";
import SecuritySection from "@/components/admin/SecuritySection";

const AdminDashboard = () => {
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

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <main className="flex-1">
          {/* Mobile Header */}
          <AdminMobileHeader activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              {/* Overview Tab */}
              <TabsContent value="overview">
                <OverviewTabContent stats={stats} />
              </TabsContent>
              
              {/* Elections Tab */}
              <TabsContent value="elections" className="space-y-6 animate-fade-in">
                <ElectionsSection 
                  activeElections={activeElections}
                  upcomingElections={upcomingElections}
                  completedElections={completedElections}
                />
              </TabsContent>
              
              {/* Voters Tab */}
              <TabsContent value="voters" className="animate-fade-in">
                <VotersSection />
              </TabsContent>
              
              {/* Security Tab */}
              <TabsContent value="security" className="animate-fade-in">
                <SecuritySection />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
