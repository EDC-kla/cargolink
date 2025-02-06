import { useState } from "react";
import { Shipment } from "@/types/database.types";
import TransportModeFilters from "./TransportModeFilters";
import ShipmentsGrid from "./ShipmentsGrid";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AvailableShipmentsProps {
  shipments: Shipment[] | undefined;
  onRefetch: () => void;
}

const AvailableShipments = ({ shipments, onRefetch }: AvailableShipmentsProps) => {
  const navigate = useNavigate();
  const [transportMode, setTransportMode] = useState<'all' | 'sea' | 'air'>('all');

  const filteredShipments = transportMode === 'all' 
    ? shipments 
    : shipments?.filter(s => s.transport_mode === transportMode);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <TransportModeFilters 
          transportMode={transportMode}
          onTransportModeChange={setTransportMode}
        />
        <Button 
          onClick={() => navigate("/create-shipment")}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          List New Shipment
        </Button>
      </div>
      
      <ShipmentsGrid 
        shipments={filteredShipments}
        showBookButton={true}
      />
    </div>
  );
};

export default AvailableShipments;