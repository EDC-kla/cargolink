
import { Ship, Plane, CheckCircle2 } from "lucide-react";

interface TransportHeaderProps {
  transportMode: 'sea' | 'air';
  status?: string;
}

const TransportHeader = ({ transportMode, status }: TransportHeaderProps) => {
  const TransportIcon = transportMode === 'sea' ? Ship : Plane;

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
