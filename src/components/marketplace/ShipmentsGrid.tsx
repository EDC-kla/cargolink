import { Shipment } from "@/types/database.types";
import ShipmentCard from "./ShipmentCard";

interface ShipmentsGridProps {
  shipments: Shipment[] | undefined;
  showBookButton?: boolean;
  onEdit?: (shipment: Shipment) => void;
  showEditButton?: boolean;
  onBookSpace?: (shipment: Shipment) => void;
}

const ShipmentsGrid = ({ 
  shipments,
  showBookButton = true,
  onEdit,
  showEditButton = false,
  onBookSpace = () => {}
}: ShipmentsGridProps) => {
  if (!shipments?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No shipments found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {shipments.map((shipment) => (
        <ShipmentCard
          key={shipment.id}
          shipment={shipment}
          showBookButton={showBookButton}
          onEdit={onEdit}
          showEditButton={showEditButton}
          onBookSpace={() => onBookSpace(shipment)}
        />
      ))}
    </div>
  );
};

export default ShipmentsGrid;