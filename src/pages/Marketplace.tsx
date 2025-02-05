import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { shipmentService } from "@/services/api";
import AvailableShipments from "@/components/marketplace/AvailableShipments";
import MyShipments from "@/components/marketplace/MyShipments";
import MyBookings from "@/components/marketplace/MyBookings";
import ShipmentsNav from "@/components/marketplace/ShipmentsNav";
import EditBookingForm from "@/components/bookings/EditBookingForm";

const Marketplace = () => {
  const navigate = useNavigate();

  const { data: shipments, isLoading: isLoadingAll } = useQuery({
    queryKey: ['shipments'],
    queryFn: shipmentService.listShipments,
  });

  const { data: { user }, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (!isLoadingUser && !user) {
      navigate("/auth");
    }
  }, [user, isLoadingUser, navigate]);

  if (isLoadingAll || isLoadingUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Marketplace</h1>
        <ShipmentsNav />
      </div>

      <div className="bg-background rounded-lg shadow">
        <div className="p-6">
          <Routes>
            <Route 
              path="/" 
              element={
                <AvailableShipments 
                  shipments={shipments || []}
                />
              } 
            />
            <Route 
              path="/my-shipments" 
              element={
                <MyShipments 
                  shipments={shipments?.filter(s => s.created_by === user?.id) || []}
                />
              } 
            />
            <Route 
              path="/bookings" 
              element={<MyBookings />} 
            />
            <Route
              path="/bookings/:bookingId/edit"
              element={<EditBookingForm />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;