import { Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { shipmentService } from "@/services/api";
import { supabase } from "@/integrations/supabase/client";
import { Shipment } from "@/types/database.types";
import MarketplaceHeader from "@/components/marketplace/MarketplaceHeader";
import ShipmentsNav from "@/components/marketplace/ShipmentsNav";
import AvailableShipments from "@/components/marketplace/AvailableShipments";
import MyShipments from "@/components/marketplace/MyShipments";
import MyBookings from "@/components/marketplace/MyBookings";

const Marketplace = () => {
  const { data: allShipments, isLoading: isLoadingAll, refetch: refetchAll } = useQuery({
    queryKey: ['shipments'],
    queryFn: shipmentService.listShipments,
  });

  const { data: userShipments, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user-shipments'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      const { data, error } = await supabase
        .from('shipments')
        .select('*')
        .eq('created_by', user.id);
      if (error) throw error;
      return data as Shipment[];
    },
  });

  const { data: userBookings, isLoading: isLoadingBookings } = useQuery({
    queryKey: ['user-bookings'],
    queryFn: shipmentService.listUserBookings,
  });

  if (isLoadingAll || isLoadingUser || isLoadingBookings) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <MarketplaceHeader />
      <div className="mt-8">
        <ShipmentsNav />
        <div className="mt-6">
          <Routes>
            <Route 
              path="/" 
              element={<Navigate to="/marketplace/available" replace />} 
            />
            <Route 
              path="/available" 
              element={
                <AvailableShipments 
                  shipments={allShipments}
                  onRefetch={refetchAll}
                />
              } 
            />
            <Route 
              path="/my-shipments" 
              element={
                <MyShipments 
                  shipments={userShipments}
                  onRefetch={refetchAll}
                />
              } 
            />
            <Route 
              path="/bookings" 
              element={
                <MyBookings 
                  bookings={userBookings}
                />
              } 
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;