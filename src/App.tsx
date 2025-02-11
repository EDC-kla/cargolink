
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Marketplace from "@/pages/Marketplace";
import CreateShipment from "@/pages/CreateShipment";
import NotFound from "@/pages/NotFound";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Navbar from "@/components/Navbar";
import AppSidebar from "@/components/layout/AppSidebar";
import Auth from "@/pages/Auth";
import Onboarding from "@/pages/Onboarding";
import BookingPage from "@/components/marketplace/BookingPage";
import ShipmentDetailsPage from "@/pages/ShipmentDetailsPage";
import { toast } from "@/hooks/use-toast";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const showSidebar = user && location.pathname !== "/" && location.pathname !== "/auth" && location.pathname !== "/onboarding";

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Protect routes that require authentication
  useEffect(() => {
    if (!loading && !user) {
      const protectedRoutes = ["/dashboard", "/create-shipment", "/profile", "/settings", "/book", "/onboarding"];
      const isProtectedRoute = protectedRoutes.some(route => location.pathname.startsWith(route));
      
      if (isProtectedRoute) {
        toast({
          title: "Authentication required",
          description: "Please log in to access this page",
        });
        navigate("/auth", { state: { from: location.pathname } });
      }
    }
  }, [user, loading, location.pathname, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {showSidebar && <AppSidebar />}
      <main className={`${showSidebar ? 'ml-[280px]' : ''} pt-16`}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/marketplace/*" element={<Marketplace />} />
          <Route path="/shipments/:id" element={<ShipmentDetailsPage />} />
          <Route path="/book/:shipmentId" element={<BookingPage />} />
          <Route path="/create-shipment" element={<CreateShipment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
