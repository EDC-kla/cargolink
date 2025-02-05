import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shipment } from "@/types/database.types";
import { formatDate } from "@/lib/utils";
import { Ship, Plane, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ShipmentCardProps {
  shipment: Shipment;
  showBookButton?: boolean;
  onEdit?: (shipment: Shipment) => void;
  showEditButton?: boolean;
  onBookSpace?: (shipment: Shipment) => void;
}

const ShipmentCard = ({ 
  shipment,
  showBookButton = true,
  onEdit,
  showEditButton = false,
  onBookSpace
}: ShipmentCardProps) => {
  const navigate = useNavigate();
  const TransportIcon = shipment.transport_mode === 'sea' ? Ship : Plane;

  const handleBookClick = () => {
    if (onBookSpace) {
      onBookSpace(shipment);
    } else {
      navigate(`/marketplace/book/${shipment.id}`);
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">{shipment.origin} → {shipment.destination}</h3>
            <p className="text-sm text-muted-foreground">
              Departure: {formatDate(shipment.departure_date)}
            </p>
          </div>
          <TransportIcon className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Available Space:</span>
            <span className="font-medium">{shipment.available_space} CBM</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Price per CBM:</span>
            <span className="font-medium">${shipment.price_per_cbm}</span>
          </div>
          {shipment.transit_time_days && (
            <div className="flex justify-between text-sm">
              <span>Transit Time:</span>
              <span className="font-medium">{shipment.transit_time_days} days</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        {showBookButton && (
          <Button 
            className="flex-1" 
            onClick={handleBookClick}
          >
            Book Space
          </Button>
        )}
        {showEditButton && onEdit && (
          <Button 
            variant="outline"
            onClick={() => onEdit(shipment)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ShipmentCard;