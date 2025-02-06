
import { Package, CircleDollarSign, Clock } from "lucide-react";

interface ShipmentDetailsProps {
  availableSpace: number;
  pricePerCbm: number;
  transitTimeDays?: number | null;
}

const ShipmentDetails = ({ availableSpace, pricePerCbm, transitTimeDays }: ShipmentDetailsProps) => {
  return (
    <div className="space-y-3 border-t border-gray-100 pt-4">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center text-gray-600">
          <Package className="h-4 w-4 mr-2" />
          <span>Available Space</span>
        </div>
        <span className="font-medium">{availableSpace} CBM</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center text-gray-600">
          <CircleDollarSign className="h-4 w-4 mr-2" />
          <span>Price per CBM</span>
        </div>
        <span className="font-medium">${pricePerCbm}</span>
      </div>
      {transitTimeDays && (
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span>Transit Time</span>
          </div>
          <span className="font-medium">{transitTimeDays} days</span>
        </div>
      )}
    </div>
  );
};

export default ShipmentDetails;
