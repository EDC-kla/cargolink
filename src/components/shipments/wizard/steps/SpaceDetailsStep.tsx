import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, DollarSign } from "lucide-react";
import { ContainerSizeType } from "@/types/database.types";

interface SpaceDetailsStepProps {
  formData: {
    available_space: number;
    price_per_cbm: number;
    container_type: string;
    container_size?: ContainerSizeType;
    min_booking_size: number;
  };
  onChange: (field: string, value: any) => void;
}

const SpaceDetailsStep = ({ formData, onChange }: SpaceDetailsStepProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="container_type">Container Type</Label>
          <Input
            id="container_type"
            value={formData.container_type}
            onChange={(e) => onChange("container_type", e.target.value)}
            placeholder="e.g., Standard Dry"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="container_size">Container Size</Label>
          <Select
            value={formData.container_size}
            onValueChange={(value) => onChange("container_size", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="20GP">20' General Purpose</SelectItem>
              <SelectItem value="40GP">40' General Purpose</SelectItem>
              <SelectItem value="40HC">40' High Cube</SelectItem>
              <SelectItem value="45HC">45' High Cube</SelectItem>
              <SelectItem value="LCL">LCL (Less than Container Load)</SelectItem>
            </SelectContent>
          </Select>
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
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="min_booking_size">Minimum Booking Size (CBM)</Label>
        <div className="flex items-center space-x-2">
          <Package className="h-4 w-4 text-gray-400" />
          <Input
            id="min_booking_size"
            type="number"
            min={0.1}
            step={0.1}
            value={formData.min_booking_size}
            onChange={(e) => onChange("min_booking_size", Number(e.target.value))}
            required
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
          />
        </div>
      </div>
    </div>
  );
};

export default SpaceDetailsStep;