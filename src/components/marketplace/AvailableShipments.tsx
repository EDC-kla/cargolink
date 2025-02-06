
import { useState } from "react";
import { Shipment } from "@/types/database.types";
import TransportModeFilters from "./TransportModeFilters";
import ShipmentsGrid from "./ShipmentsGrid";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

interface AvailableShipmentsProps {
  shipments: Shipment[] | undefined;
  onRefetch: () => void;
}

const AvailableShipments = ({ shipments, onRefetch }: AvailableShipmentsProps) => {
  const navigate = useNavigate();
  const [transportMode, setTransportMode] = useState<'all' | 'sea' | 'air'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleNewShipment = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please log in to list a new shipment",
      });
      navigate("/auth", { state: { from: "/create-shipment" } });
      return;
    }
    
    navigate("/create-shipment");
  };

  const filteredShipments = shipments
    ?.filter(s => transportMode === 'all' || s.transport_mode === transportMode)
    ?.filter(s => 
      searchQuery === '' || 
      s.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.destination.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="space-y-8">
      <div className="bg-primary/5 py-12 px-4 -mx-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">Find Available Cargo Space</h1>
          
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search by origin or destination"
                className="pl-10 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleNewShipment}
              className="bg-primary hover:bg-primary/90 h-12"
            >
              <Plus className="mr-2 h-5 w-5" />
              List New Shipment
            </Button>
          </div>

          <TransportModeFilters 
            transportMode={transportMode}
            onTransportModeChange={setTransportMode}
          />
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <ShipmentsGrid 
          shipments={filteredShipments}
          showBookButton={true}
        />
      </div>
    </div>
  );
};

export default AvailableShipments;
