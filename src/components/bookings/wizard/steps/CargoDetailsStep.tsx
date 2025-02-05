
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { BookingFormData } from "../BookingWizard";
import { Shipment } from "@/types/database.types";
import { Card } from "@/components/ui/card";
import {
  AlertCircle,
  Package,
  Thermometer,
  Scale,
  Box,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface CargoDetailsStepProps {
  data: BookingFormData;
  onChange: (data: Partial<BookingFormData>) => void;
  shipment: Shipment;
}

const CargoDetailsStep = ({ data, onChange, shipment }: CargoDetailsStepProps) => {
  const handleDimensionsChange = (field: keyof typeof data.cargo_dimensions, value: number) => {
    onChange({
      cargo_dimensions: {
        ...data.cargo_dimensions,
        [field]: value,
      },
    });
  };

  const handleTemperatureChange = (field: "min" | "max", value: number) => {
    onChange({
      temperature_requirements: {
        ...(data.temperature_requirements || { unit: 'C' }),
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Available Space</AlertTitle>
        <AlertDescription>
          This shipment has {shipment.available_space} CBM available.
          Your booking must not exceed this amount.
        </AlertDescription>
      </Alert>

      <Card className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="space_booked">Space Required (CBM)</Label>
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-gray-400" />
              <Input
                id="space_booked"
                type="number"
                min={1}
                max={shipment.available_space}
                value={data.space_booked}
                onChange={(e) => onChange({ space_booked: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cargo_packaging_type">Packaging Type</Label>
            <Select
              value={data.cargo_packaging_type}
              onValueChange={(value) => onChange({ cargo_packaging_type: value })}
            >
              <SelectTrigger id="cargo_packaging_type">
                <SelectValue placeholder="Select packaging type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pallets">Pallets</SelectItem>
                <SelectItem value="boxes">Boxes</SelectItem>
                <SelectItem value="containers">Containers</SelectItem>
                <SelectItem value="bulk">Bulk</SelectItem>
                <SelectItem value="drums">Drums</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cargo_type">Cargo Type</Label>
          <Input
            id="cargo_type"
            value={data.cargo_type}
            onChange={(e) => onChange({ cargo_type: e.target.value })}
            placeholder="e.g., Electronics, Textiles, Machinery"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cargo_description">Cargo Description</Label>
          <Input
            id="cargo_description"
            value={data.cargo_description}
            onChange={(e) => onChange({ cargo_description: e.target.value })}
            placeholder="Detailed description of your cargo"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Dimensions</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="length" className="text-xs">Length (cm)</Label>
                <Input
                  id="length"
                  type="number"
                  value={data.cargo_dimensions.length}
                  onChange={(e) => handleDimensionsChange("length", Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="width" className="text-xs">Width (cm)</Label>
                <Input
                  id="width"
                  type="number"
                  value={data.cargo_dimensions.width}
                  onChange={(e) => handleDimensionsChange("width", Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="height" className="text-xs">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={data.cargo_dimensions.height}
                  onChange={(e) => handleDimensionsChange("height", Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="weight" className="text-xs">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={data.cargo_dimensions.weight}
                  onChange={(e) => handleDimensionsChange("weight", Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Temperature Requirements</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="temp_min" className="text-xs">Min (°C)</Label>
                <Input
                  id="temp_min"
                  type="number"
                  value={data.temperature_requirements?.min ?? ""}
                  onChange={(e) => handleTemperatureChange("min", Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="temp_max" className="text-xs">Max (°C)</Label>
                <Input
                  id="temp_max"
                  type="number"
                  value={data.temperature_requirements?.max ?? ""}
                  onChange={(e) => handleTemperatureChange("max", Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Special Requirements</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="fragile"
                checked={data.special_handling.includes("fragile")}
                onCheckedChange={(checked) => {
                  const newHandling = checked
                    ? [...data.special_handling, "fragile"]
                    : data.special_handling.filter((h) => h !== "fragile");
                  onChange({ special_handling: newHandling });
                }}
              />
              <Label htmlFor="fragile" className="cursor-pointer">Fragile</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="perishable"
                checked={data.special_handling.includes("perishable")}
                onCheckedChange={(checked) => {
                  const newHandling = checked
                    ? [...data.special_handling, "perishable"]
                    : data.special_handling.filter((h) => h !== "perishable");
                  onChange({ special_handling: newHandling });
                }}
              />
              <Label htmlFor="perishable" className="cursor-pointer">Perishable</Label>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CargoDetailsStep;
