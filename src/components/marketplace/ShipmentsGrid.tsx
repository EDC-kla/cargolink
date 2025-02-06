
import { Shipment } from "@/types/database.types";
import ShipmentCard from "./ShipmentCard";

interface ShipmentsGridProps {
  shipments: Shipment[] | undefined;
  showBookButton?: boolean;
  onEdit?: (shipment: Shipment) => void;
  showEditButton?: boolean;
  isAuthenticated?: boolean;
}

const ShipmentsGrid = ({ 
  shipments,
  showBookButton = true,
  onEdit,
  showEditButton = false,
  isAuthenticated = false,
}: ShipmentsGridProps) => {
  if (!shipments?.length) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
        <p className="text-muted-foreground">No shipments found matching your criteria</p>
        <p className="text-sm text-gray-500 mt-2">Try adjusting your search filters</p>
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
          isAuthenticated={isAuthenticated}
        />
      ))}
    </div>
  );
};

export default ShipmentsGrid;
