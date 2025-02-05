import { Shipment } from "@/types/database.types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Ship, Package, Clock, DollarSign, Edit } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface ShipmentCardProps {
  shipment: Shipment;
  onBookSpace?: (shipment: Shipment) => void;
  showBookButton?: boolean;
  onEdit?: (shipment: Shipment) => void;
  showEditButton?: boolean;
}

const ShipmentCard = ({ 
  shipment, 
  onBookSpace, 
  showBookButton = true,
  onEdit,
  showEditButton = false 
}: ShipmentCardProps) => {
  return (
    <Card className="p-6 space-y-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Ship className="h-5 w-5 text-primary" />
            {shipment.vessel_name || "Vessel TBD"}
          </h3>
          <p className="text-sm text-muted-foreground">
            Voyage: {shipment.voyage_number || "TBD"}
          </p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-primary">
            ${shipment.price_per_cbm}/CBM
          </div>
          <div className="text-sm text-muted-foreground">
            {shipment.available_space} CBM available
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            From: {shipment.port_of_loading || shipment.origin}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            To: {shipment.port_of_discharge || shipment.destination}
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            ETD: {formatDate(shipment.departure_date)}
          </div>
          {shipment.estimated_arrival && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              ETA: {formatDate(shipment.estimated_arrival)}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="flex items-center text-sm text-muted-foreground">
            <Package className="h-4 w-4 mr-2" />
            {shipment.container_size || shipment.container_type || "LCL"}
          </div>
          {shipment.incoterms && (
            <div className="flex items-center text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4 mr-2" />
              {shipment.incoterms}
            </div>
          )}
        </div>
        <div className="space-y-1">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            Transit: {shipment.transit_time_days} days
          </div>
          {shipment.cutoff_date && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              Cutoff: {formatDate(shipment.cutoff_date)}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-2">
        {showEditButton && onEdit && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(shipment)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        )}
        {showBookButton && onBookSpace && (
          <Button
            size="sm"
            onClick={() => onBookSpace(shipment)}
          >
            Book Space
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ShipmentCard;