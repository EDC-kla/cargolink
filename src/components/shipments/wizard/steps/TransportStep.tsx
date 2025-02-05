import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Ship, Plane, Clock, Package } from "lucide-react";

interface TransportStepProps {
  transportMode: string;
  transitTimeDays: number | null;
  containerType: string | null;
  minBookingSize: number | null;
  customsClearance: boolean;
  doorPickup: boolean;
  doorDelivery: boolean;
  onChange: (field: string, value: any) => void;
}

const TransportStep = ({
  transportMode,
  transitTimeDays,
  containerType,
  minBookingSize,
  customsClearance,
  doorPickup,
  doorDelivery,
  onChange,
}: TransportStepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>How would you like to transport?</Label>
        <RadioGroup
          value={transportMode}
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
        <Label htmlFor="transit_time">Transit Time (Days)</Label>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <Input
            id="transit_time"
            type="number"
            min={1}
            value={transitTimeDays || ""}
            onChange={(e) => onChange("transit_time_days", Number(e.target.value))}
            placeholder="e.g., 14"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="container_type">Container Type</Label>
        <Input
          id="container_type"
          value={containerType || ""}
          onChange={(e) => onChange("container_type", e.target.value)}
          placeholder="e.g., 20ft Standard"
          className="flex-1"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="min_booking_size">Minimum Booking Size (CBM)</Label>
        <div className="flex items-center space-x-2">
          <Package className="h-4 w-4 text-gray-400" />
          <Input
            id="min_booking_size"
            type="number"
            min={0}
            step={0.1}
            value={minBookingSize || ""}
            onChange={(e) => onChange("min_booking_size", Number(e.target.value))}
            placeholder="e.g., 1"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label>Additional Services</Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="customs_clearance"
              checked={customsClearance}
              onCheckedChange={(checked) => onChange("customs_clearance", checked)}
            />
            <Label htmlFor="customs_clearance" className="cursor-pointer">Customs Clearance</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="door_pickup"
              checked={doorPickup}
              onCheckedChange={(checked) => onChange("door_pickup", checked)}
            />
            <Label htmlFor="door_pickup" className="cursor-pointer">Door Pickup</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="door_delivery"
              checked={doorDelivery}
              onCheckedChange={(checked) => onChange("door_delivery", checked)}
            />
            <Label htmlFor="door_delivery" className="cursor-pointer">Door Delivery</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportStep;