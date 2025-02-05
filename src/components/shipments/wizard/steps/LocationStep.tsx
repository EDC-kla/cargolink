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
        <Label htmlFor="origin">Where are you shipping from?</Label>
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <Input
            id="origin"
            value={origin}
            onChange={(e) => onChange("origin", e.target.value)}
            required
            placeholder="e.g., Shanghai, China"
            className="flex-1"
          />
        </div>
      </div>

      <div className="relative py-4">
        <div className="absolute left-2 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-gray-200" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="destination">Where are you shipping to?</Label>
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <Input
            id="destination"
            value={destination}
            onChange={(e) => onChange("destination", e.target.value)}
            required
            placeholder="e.g., Los Angeles, USA"
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};

export default LocationStep;