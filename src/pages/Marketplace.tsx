
import { Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { shipmentService } from "@/services/api";
import { supabase } from "@/integrations/supabase/client";
import AvailableShipments from "@/components/marketplace/AvailableShipments";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const Marketplace = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const { data: shipments = [], isLoading, refetch } = useQuery({
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={
            <AvailableShipments 
              shipments={shipments} 
              onRefetch={refetch}
              isAuthenticated={!!userId}
            />
          } />
        </Routes>
      </div>
    </div>
  );
};

export default Marketplace;
