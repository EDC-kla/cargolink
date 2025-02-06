
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shipment } from "@/types/database.types";
import { formatDate } from "@/lib/utils";
import { Ship, Plane, Edit, Clock, Package, CircleDollarSign, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface ShipmentCardProps {
  shipment: Shipment;
  showBookButton?: boolean;
  onEdit?: (shipment: Shipment) => void;
  showEditButton?: boolean;
  isAuthenticated?: boolean;
}

const ShipmentCard = ({ 
  shipment,
  showBookButton = true,
  onEdit,
  showEditButton = false,
  isAuthenticated = false,
}: ShipmentCardProps) => {
  const navigate = useNavigate();
  const TransportIcon = shipment.transport_mode === 'sea' ? Ship : Plane;

  const handleBookClick = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book cargo space",
      });
      navigate("/auth", { state: { from: `/book/${shipment.id}` } });
      return;
    }
    
    navigate(`/book/${shipment.id}`);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow bg-white">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <TransportIcon className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary capitalize">
                {shipment.transport_mode} Freight
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-500 mt-1 shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {shipment.origin}
                  </h3>
                  <p className="text-sm text-gray-500">Port of Loading</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-500 mt-1 shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {shipment.destination}
                  </h3>
                  <p className="text-sm text-gray-500">Port of Discharge</p>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-3 text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>Departure: {formatDate(shipment.departure_date)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <Package className="h-4 w-4 mr-2" />
              <span>Available Space</span>
            </div>
            <span className="font-medium">{shipment.available_space} CBM</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <CircleDollarSign className="h-4 w-4 mr-2" />
              <span>Price per CBM</span>
            </div>
            <span className="font-medium">${shipment.price_per_cbm}</span>
          </div>
          {shipment.transit_time_days && (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                <span>Transit Time</span>
              </div>
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
