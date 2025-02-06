import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Calendar, Package, DollarSign } from "lucide-react";
import { TransportMode } from "@/types/database.types";

interface BasicShipmentFieldsProps {
  formData: {
    origin: string;
    destination: string;
    departure_date: string;
    available_space: number;
    price_per_cbm: number;
    transport_mode: TransportMode;
  };
  onChange: (field: string, value: any) => void;
  disabled?: boolean;
}

const BasicShipmentFields = ({ formData, onChange, disabled }: BasicShipmentFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="origin">Origin Location</Label>
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <Input
            id="origin"
            value={formData.origin}
            onChange={(e) => onChange("origin", e.target.value)}
            required
            placeholder="e.g., Shanghai, China"
            disabled={disabled}
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
            placeholder="e.g., Los Angeles, USA"
            disabled={disabled}
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
            disabled={disabled}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="available_space">Available Space (CBM)</Label>
        <div className="flex items-center space-x-2">
          <Package className="h-4 w-4 text-gray-400" />
          <Input
            id="available_space"
            type="number"
            min={1}
            value={formData.available_space}
            onChange={(e) => onChange("available_space", Number(e.target.value))}
            required
            disabled={disabled}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price_per_cbm">Price per CBM ($)</Label>
        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4 text-gray-400" />
          <Input
            id="price_per_cbm"
            type="number"
            min={1}
            value={formData.price_per_cbm}
            onChange={(e) => onChange("price_per_cbm", Number(e.target.value))}
            required
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicShipmentFields;