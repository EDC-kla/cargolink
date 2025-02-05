import { useState } from "react";
import { Shipment } from "@/types/database.types";
import TransportModeFilters from "./TransportModeFilters";
import ShipmentsGrid from "./ShipmentsGrid";
import BookingDialog from "./BookingDialog";

interface AvailableShipmentsProps {
  shipments: Shipment[] | undefined;
  onRefetch: () => void;
}

const AvailableShipments = ({ shipments, onRefetch }: AvailableShipmentsProps) => {
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [transportMode, setTransportMode] = useState<'all' | 'sea' | 'air'>('all');

  const filteredShipments = transportMode === 'all' 
    ? shipments 
    : shipments?.filter(s => s.transport_mode === transportMode);

  return (
    <div className="space-y-6">
      <TransportModeFilters 
        transportMode={transportMode}
        onTransportModeChange={setTransportMode}
      />
      
      <ShipmentsGrid 
        shipments={filteredShipments}
        onBookSpace={setSelectedShipment}
      />

      <BookingDialog 
        shipment={selectedShipment}
        onClose={() => setSelectedShipment(null)}
        onBookingComplete={onRefetch}
      />
    </div>
  );
};

export default AvailableShipments;