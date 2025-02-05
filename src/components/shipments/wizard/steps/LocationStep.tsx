import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";

interface LocationStepProps {
  origin: string;
  destination: string;
  onChange: (field: string, value: string) => void;
}

const LocationStep = ({ origin, destination, onChange }: LocationStepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="origin">Origin Location</Label>
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <Input
            id="origin"
            value={origin}
            onChange={(e) => onChange("origin", e.target.value)}
            required
            placeholder="e.g., Shanghai, China"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="destination">Destination Location</Label>
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <Input
            id="destination"
            value={destination}
            onChange={(e) => onChange("destination", e.target.value)}
            required
            placeholder="e.g., Los Angeles, USA"
          />
        </div>
      </div>
    </div>
  );
};

export default LocationStep;