import { Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { shipmentService } from "@/services/api";
import { supabase } from "@/integrations/supabase/client";
import AvailableShipments from "@/components/marketplace/AvailableShipments";
import MyShipments from "@/components/marketplace/MyShipments";
import MyBookings from "@/components/marketplace/MyBookings";
import ShipmentsNav from "@/components/marketplace/ShipmentsNav";

const Marketplace = () => {
  const { data: shipments = [], refetch } = useQuery({
    queryKey: ['shipments'],
    queryFn: shipmentService.listShipments
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Marketplace</h1>
        <ShipmentsNav />
      </div>

      <div className="bg-background rounded-lg shadow">
        <div className="p-6">
          <Routes>
            <Route path="/" element={
              <AvailableShipments 
                shipments={shipments} 
                onRefetch={refetch}
              />
            } />
            <Route path="/my-shipments" element={
              <MyShipments 
                shipments={shipments.filter(s => s.created_by === supabase.auth.getUser()?.id)}
                onRefetch={refetch}
              />
            } />
            <Route path="/bookings" element={<MyBookings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;