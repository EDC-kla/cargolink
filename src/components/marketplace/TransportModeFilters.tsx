
import { Ship, Plane } from "lucide-react";

interface TransportModeFiltersProps {
  transportMode: 'all' | 'sea' | 'air';
  onTransportModeChange: (mode: 'all' | 'sea' | 'air') => void;
}

const TransportModeFilters = ({ transportMode, onTransportModeChange }: TransportModeFiltersProps) => {
  return (
    <div className="mb-6 flex items-center space-x-4">
      <button
        onClick={() => onTransportModeChange('all')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
          transportMode === 'all' ? 'bg-primary text-white' : 'bg-gray-100'
        }`}
      >
        <span>All Modes</span>
      </button>
      <button
        onClick={() => onTransportModeChange('sea')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
          transportMode === 'sea' ? 'bg-primary text-white' : 'bg-gray-100'
        }`}
      >
        <Ship className="h-4 w-4" />
        <span>Sea Freight</span>
      </button>
      <button
        onClick={() => onTransportModeChange('air')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
          transportMode === 'air' ? 'bg-primary text-white' : 'bg-gray-100'
        }`}
      >
        <Plane className="h-4 w-4" />
        <span>Air Freight</span>
      </button>
    </div>
  );
};

export default TransportModeFilters;
