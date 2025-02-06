
import { Ship, Plane, Train, Truck, CheckCircle2 } from "lucide-react";
import { TransportMode } from "@/types/database.types";

interface TransportHeaderProps {
  transportMode: TransportMode;
  status?: string;
}

const TransportHeader = ({ transportMode, status }: TransportHeaderProps) => {
  const getTransportIcon = (mode: TransportMode) => {
    switch (mode) {
      case 'sea':
        return Ship;
      case 'air':
        return Plane;
      case 'rail':
        return Train;
      case 'road':
        return Truck;
      default:
        return Ship;
    }
  };

  const TransportIcon = getTransportIcon(transportMode);

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
    <div className="flex items-center gap-2 mb-3">
      <TransportIcon className="h-5 w-5 text-primary" />
      <span className="text-sm font-medium text-primary capitalize">
        {transportMode} Freight
      </span>
      <span className={`ml-auto ${getStatusColor(status || 'available')}`}>
        <CheckCircle2 className="h-5 w-5" />
      </span>
    </div>
  );
};

export default TransportHeader;

