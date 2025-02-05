
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Package, Ship, Plane, Clock, Info } from "lucide-react";
import { Shipment } from "@/types/database.types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";

interface ShipmentCardProps {
  shipment: Shipment;
  showBookButton?: boolean;
  onBookSpace?: (shipment: Shipment) => void;
}

const ShipmentCard = ({ shipment, showBookButton = true, onBookSpace }: ShipmentCardProps) => {
  const TransportIcon = shipment.transport_mode === 'sea' ? Ship : Plane;
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm text-gray-500">Route</p>
            <p className="font-medium text-gray-900">
              {shipment.origin} → {shipment.destination}
            </p>
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <TransportIcon className="h-5 w-5 text-primary" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{shipment.transport_mode === 'sea' ? 'Sea Freight' : 'Air Freight'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">
              {new Date(shipment.departure_date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          {shipment.transit_time_days && (
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">
                {shipment.transit_time_days} days
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Package className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600">
            {shipment.available_space} CBM available
            {shipment.min_booking_size > 0 && (
              <span className="text-gray-400 text-sm">
                {" "}(min. {shipment.min_booking_size} CBM)
              </span>
            )}
          </span>
        </div>
        <div className="text-lg font-semibold text-primary">
          ${shipment.price_per_cbm.toLocaleString()}/CBM
        </div>
        {(shipment.customs_clearance || shipment.door_pickup || shipment.door_delivery) && (
          <div className="flex items-start space-x-2 text-sm text-gray-600 bg-gray-50 rounded-md p-2">
            <Info className="h-4 w-4 text-primary mt-0.5" />
            <div>
              {[
                shipment.customs_clearance && "Customs clearance",
                shipment.door_pickup && "Door pickup",
                shipment.door_delivery && "Door delivery"
              ].filter(Boolean).join(" • ")}
            </div>
          </div>
        )}
      </div>

      {showBookButton && onBookSpace && (
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium"
          onClick={() => onBookSpace(shipment)}
        >
          Book Space
        </Button>
      )}
    </motion.div>
  );
};

export default ShipmentCard;
