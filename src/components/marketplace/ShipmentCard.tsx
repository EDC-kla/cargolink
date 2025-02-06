
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shipment } from "@/types/database.types";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import TransportHeader from "./shipment-card/TransportHeader";
import LocationInfo from "./shipment-card/LocationInfo";
import DateInfo from "./shipment-card/DateInfo";
import ShipmentDetails from "./shipment-card/ShipmentDetails";
import ServicesInfo from "./shipment-card/ServicesInfo";
import CargoRestrictions from "./shipment-card/CargoRestrictions";
import FeaturedBadge from "./shipment-card/FeaturedBadge";

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
    <Card className={cn(
      "hover:shadow-lg transition-shadow bg-white relative",
      isFeatured && "border-primary border-2"
    )}>
      {isFeatured && <FeaturedBadge />}
      
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <TransportHeader 
              transportMode={shipment.transport_mode}
              status={shipment.status}
            />

            <div className="space-y-3">
              <LocationInfo
                location={shipment.origin}
                port={shipment.port_of_loading}
                label="Port of Loading"
              />
              <LocationInfo
                location={shipment.destination}
                port={shipment.port_of_discharge}
                label="Port of Discharge"
              />
            </div>

            <DateInfo
              departureDate={shipment.departure_date}
              estimatedArrival={shipment.estimated_arrival}
            />
          </div>
        </div>

        <ShipmentDetails
          availableSpace={shipment.available_space}
          pricePerCbm={shipment.price_per_cbm}
          transitTimeDays={shipment.transit_time_days}
        />

        <ServicesInfo
          specialHandling={shipment.special_handling_options}
          additionalServices={shipment.additional_services}
        />

        <CargoRestrictions
          restrictions={shipment.cargo_restrictions}
        />
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
