
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
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-xl border border-gray-100">
        <div className="max-w-md text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Available Space Found
          </h3>
          <p className="text-gray-600 mb-6">
            We couldn't find any cargo space matching your criteria. Try adjusting your search filters or check back later for new listings.
          </p>
          <div className="space-y-4 text-sm text-gray-500">
            <p>You can try:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Adjusting your date range</li>
              <li>Broadening your location search</li>
              <li>Changing cargo size requirements</li>
              <li>Trying different transport modes</li>
            </ul>
          </div>
        </div>
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
