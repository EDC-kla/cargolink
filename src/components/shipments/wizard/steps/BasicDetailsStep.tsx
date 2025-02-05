import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Calendar, Ship, Plane } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TransportMode } from "@/types/database.types";

interface BasicDetailsStepProps {
  formData: {
    origin: string;
    destination: string;
    departure_date: string;
    transport_mode: TransportMode;
    vessel_name?: string;
    voyage_number?: string;
  };
  onChange: (field: string, value: any) => void;
}

const BasicDetailsStep = ({ formData, onChange }: BasicDetailsStepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Transport Mode</Label>
        <RadioGroup
          value={formData.transport_mode}
          onValueChange={(value) => onChange("transport_mode", value)}
          className="grid grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
            <RadioGroupItem value="sea" id="sea" />
            <Label htmlFor="sea" className="flex items-center space-x-2 cursor-pointer">
              <Ship className="h-4 w-4" />
              <span>Sea Freight</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
            <RadioGroupItem value="air" id="air" />
            <Label htmlFor="air" className="flex items-center space-x-2 cursor-pointer">
              <Plane className="h-4 w-4" />
              <span>Air Freight</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="origin">Origin Location</Label>
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <Input
            id="origin"
            value={formData.origin}
            onChange={(e) => onChange("origin", e.target.value)}
            required
            placeholder="e.g., Shanghai Port, China"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="destination">Destination Location</Label>
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <Input
            id="destination"
            value={formData.destination}
            onChange={(e) => onChange("destination", e.target.value)}
            required
            placeholder="e.g., Port of Los Angeles, USA"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="departure_date">Departure Date</Label>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <Input
            id="departure_date"
            type="datetime-local"
            value={formData.departure_date}
            onChange={(e) => onChange("departure_date", e.target.value)}
            required
            min={new Date().toISOString().slice(0, 16)}
          />
        </div>
      </div>

      {formData.transport_mode === "sea" && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="vessel_name">Vessel Name</Label>
            <Input
              id="vessel_name"
              value={formData.vessel_name}
              onChange={(e) => onChange("vessel_name", e.target.value)}
              placeholder="e.g., MSC Oscar"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="voyage_number">Voyage Number</Label>
            <Input
              id="voyage_number"
              value={formData.voyage_number}
              onChange={(e) => onChange("voyage_number", e.target.value)}
              placeholder="e.g., ABC123"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicDetailsStep;