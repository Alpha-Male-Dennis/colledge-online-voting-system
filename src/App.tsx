
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ElectionVote from "./pages/ElectionVote";
import ElectionResults from "./pages/ElectionResults";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import RouteGuard from "./components/RouteGuard";

// Admin routes
import AdminElectionEdit from "./pages/admin/AdminElectionEdit";
import AdminElectionNew from "./pages/admin/AdminElectionNew";
import AdminElectionResults from "./pages/admin/AdminElectionResults";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={
                <RouteGuard>
                  <Login />
                </RouteGuard>
              } />
              <Route path="/register" element={
                <RouteGuard>
                  <Register />
                </RouteGuard>
              } />
              <Route path="/dashboard" element={
                <RouteGuard requireAuth>
                  <Dashboard />
                </RouteGuard>
              } />
              <Route path="/elections/:id" element={
                <RouteGuard requireAuth>
                  <ElectionVote />
                </RouteGuard>
              } />
              <Route path="/elections/:id/results" element={
                <RouteGuard requireAuth>
                  <ElectionResults />
                </RouteGuard>
              } />
              
              {/* Admin routes */}
              <Route path="/admin" element={
                <RouteGuard requireAuth requireAdmin>
                  <AdminDashboard />
                </RouteGuard>
              } />
              <Route path="/admin/elections/new" element={
                <RouteGuard requireAuth requireAdmin>
                  <AdminElectionNew />
                </RouteGuard>
              } />
              <Route path="/admin/elections/:id/edit" element={
                <RouteGuard requireAuth requireAdmin>
                  <AdminElectionEdit />
                </RouteGuard>
              } />
              <Route path="/admin/elections/:id/results" element={
                <RouteGuard requireAuth requireAdmin>
                  <AdminElectionResults />
                </RouteGuard>
              } />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
