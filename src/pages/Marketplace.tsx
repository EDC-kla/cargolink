
import { Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { shipmentService } from "@/services/api";
import { supabase } from "@/integrations/supabase/client";
import AvailableShipments from "@/components/marketplace/AvailableShipments";
import { useState, useEffect } from "react";

const Marketplace = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const { data: shipments = [], refetch } = useQuery({
    queryKey: ['shipments'],
    queryFn: shipmentService.listShipments
  });

  useEffect(() => {
    const getUserId = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    getUserId();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={
            <AvailableShipments 
              shipments={shipments} 
              onRefetch={refetch}
            />
          } />
        </Routes>
      </div>
    </div>
  );
};

export default Marketplace;

