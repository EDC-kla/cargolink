import { Shipment } from "@/types/database.types";
import ShipmentCard from "./ShipmentCard";

interface ShipmentsGridProps {
  shipments: Shipment[] | undefined;
  onBookSpace: (shipment: Shipment) => void;
  showBookButton?: boolean;
}

const ShipmentsGrid = ({ shipments, onBookSpace, showBookButton = true }: ShipmentsGridProps) => {
  if (!shipments?.length) {
    return (
      <div className="col-span-full text-center py-8 text-gray-500">
        No shipments available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {shipments.map((shipment) => (
        <ShipmentCard 
          key={shipment.id}
          shipment={shipment}
          onBookSpace={showBookButton ? onBookSpace : undefined}
          showBookButton={showBookButton}
        />
      ))}
    </div>
  );
};

export default ShipmentsGrid;