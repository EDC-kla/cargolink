import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Package } from "lucide-react";
import { Shipment } from "@/types/database.types";

interface ShipmentCardProps {
  shipment: Shipment;
  showBookButton?: boolean;
  onBookSpace?: (shipment: Shipment) => void;
}

const ShipmentCard = ({ shipment, showBookButton = true, onBookSpace }: ShipmentCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-secondary" />
          <div>
            <p className="text-sm text-gray-500">Route</p>
            <p className="font-medium text-primary">
              {shipment.origin} → {shipment.destination}
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600">
            {new Date(shipment.departure_date).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Package className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600">
            {shipment.available_space} CBM available
          </span>
        </div>
        <div className="text-lg font-semibold text-secondary">
          ${shipment.price_per_cbm}/CBM
        </div>
      </div>

      {showBookButton && onBookSpace && (
        <Button 
          className="w-full bg-primary hover:bg-primary/90"
          onClick={() => onBookSpace(shipment)}
        >
          Book Space
        </Button>
      )}
    </div>
  );
};

export default ShipmentCard;