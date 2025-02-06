
import { Shipment } from "@/types/database.types";
import ShipmentCard from "./ShipmentCard";
import { Loader2 } from "lucide-react";

interface ShipmentsGridProps {
  shipments: Shipment[] | undefined;
  showBookButton?: boolean;
  onEdit?: (shipment: Shipment) => void;
  showEditButton?: boolean;
  isAuthenticated?: boolean;
  isLoading?: boolean;
}

const ShipmentsGrid = ({ 
  shipments,
  showBookButton = true,
  onEdit,
  showEditButton = false,
  isAuthenticated = false,
  isLoading = false,
}: ShipmentsGridProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!shipments?.length) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Available Space Found</h3>
        <p className="text-gray-500">Try adjusting your search criteria or check back later</p>
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
