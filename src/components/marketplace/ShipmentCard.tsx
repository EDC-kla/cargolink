
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shipment } from "@/types/database.types";
import { formatDate } from "@/lib/utils";
import { Ship, Plane, Edit, Clock, Package, CircleDollarSign, MapPin, AlertTriangle, Truck, CheckCircle2, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

interface ShipmentCardProps {
  shipment: Shipment;
  showBookButton?: boolean;
  onEdit?: (shipment: Shipment) => void;
  showEditButton?: boolean;
  isAuthenticated?: boolean;
  isFeatured?: boolean;
}

const ShipmentCard = ({ 
  shipment,
  showBookButton = true,
  onEdit,
  showEditButton = false,
  isAuthenticated = false,
  isFeatured = false,
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'text-green-500';
      case 'limited':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <Card className={cn(
      "hover:shadow-lg transition-shadow bg-white relative",
      isFeatured && "border-primary border-2"
    )}>
      {isFeatured && (
        <div className="absolute -top-3 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
          <Star className="w-4 h-4" />
          Featured
        </div>
      )}
      
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <TransportIcon className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary capitalize">
                {shipment.transport_mode} Freight
              </span>
              <span className={`ml-auto ${getStatusColor(shipment.status || 'available')}`}>
                <CheckCircle2 className="h-5 w-5" />
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-500 mt-1 shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {shipment.origin}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {shipment.port_of_loading || 'Port of Loading'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-500 mt-1 shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {shipment.destination}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {shipment.port_of_discharge || 'Port of Discharge'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                <span>Departure: {formatDate(shipment.departure_date)}</span>
              </div>
              {shipment.estimated_arrival && (
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Estimated Arrival: {formatDate(shipment.estimated_arrival)}</span>
                </div>
              )}
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

        {(shipment.special_handling_options?.length > 0 || shipment.additional_services?.length > 0) && (
          <div className="mt-4">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  <Truck className="h-4 w-4 mr-2" />
                  View Services
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                {shipment.special_handling_options?.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-sm font-medium mb-1">Special Handling</h4>
                    <div className="text-sm text-gray-500">
                      {shipment.special_handling_options.join(', ')}
                    </div>
                  </div>
                )}
                {shipment.additional_services?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Additional Services</h4>
                    <div className="text-sm text-gray-500">
                      {shipment.additional_services.join(', ')}
                    </div>
                  </div>
                )}
              </HoverCardContent>
            </HoverCard>
          </div>
        )}

        {shipment.cargo_restrictions?.length > 0 && (
          <div className="mt-4 p-3 bg-yellow-50 rounded-md">
            <div className="flex items-center text-yellow-800 text-sm">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span className="font-medium">Cargo Restrictions</span>
            </div>
            <p className="mt-1 text-sm text-yellow-700">
              {shipment.cargo_restrictions.join(', ')}
            </p>
          </div>
        )}
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
