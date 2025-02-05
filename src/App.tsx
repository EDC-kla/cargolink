import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";
import Marketplace from "@/pages/Marketplace";
import CreateShipment from "@/pages/CreateShipment";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import Index from "@/pages/Index";
import Onboarding from "@/pages/Onboarding";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import EditBookingForm from "@/components/bookings/EditBookingForm";
import BookingPage from "@/components/marketplace/BookingPage";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Toaster />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/marketplace/*" element={<Marketplace />} />
        <Route path="/book/:shipmentId" element={
          user ? <BookingPage /> : <Navigate to="/auth" replace />
        } />
        
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/create-shipment"
          element={user ? <CreateShipment /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/settings"
          element={user ? <Settings /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/onboarding"
          element={user ? <Onboarding /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/bookings/:bookingId/edit"
          element={user ? <EditBookingForm /> : <Navigate to="/auth" replace />}
        />
        
        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;