
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { BookingFormData } from "../BookingWizard";
import { Card } from "@/components/ui/card";
import { MapPin, Truck, AlertTriangle } from "lucide-react";

interface LogisticsDetailsStepProps {
  data: BookingFormData;
  onChange: (data: Partial<BookingFormData>) => void;
}

const LogisticsDetailsStep = ({ data, onChange }: LogisticsDetailsStepProps) => {
  return (
    <div className="space-y-6">
      <Card className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pickup_address">Pickup Address</Label>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <Textarea
                id="pickup_address"
                value={data.pickup_address}
                onChange={(e) => onChange({ pickup_address: e.target.value })}
                placeholder="Enter complete pickup address"
                className="resize-none"
                rows={3}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="delivery_address">Delivery Address</Label>
            <div className="flex items-center space-x-2">
              <Truck className="h-4 w-4 text-gray-400" />
              <Textarea
                id="delivery_address"
                value={data.delivery_address}
                onChange={(e) => onChange({ delivery_address: e.target.value })}
                placeholder="Enter complete delivery address"
                className="resize-none"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="insurance_required"
              checked={data.insurance_required}
              onCheckedChange={(checked) => 
                onChange({ insurance_required: checked as boolean })
              }
            />
            <div className="space-y-1">
              <Label 
                htmlFor="insurance_required" 
                className="cursor-pointer"
              >
                Cargo Insurance Required
              </Label>
              <p className="text-sm text-muted-foreground">
                Protect your cargo against loss or damage during transit
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="booking_notes">Special Instructions</Label>
          <Textarea
            id="booking_notes"
            value={data.booking_notes || ""}
            onChange={(e) => onChange({ booking_notes: e.target.value })}
            placeholder="Any special instructions for pickup or delivery"
            rows={4}
          />
        </div>
      </Card>
    </div>
  );
};

export default LogisticsDetailsStep;
