
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { PackageSearch, AlertTriangle, Ruler, Scale, ThermometerIcon } from "lucide-react";
import { CargoDimensions, Shipment } from "@/types/database.types";
import TemperatureRequirementsInput from "./cargo/TemperatureRequirementsInput";

interface CargoDetailsStepProps {
  formData: {
    cargo_dimensions: CargoDimensions;
    cargo_type: string;
    cargo_description: string;
    temperature_requirements?: {
      min: number;
      max: number;
      unit: 'C' | 'F';
    };
  };
  onChange: (data: Partial<typeof CargoDetailsStepProps['formData']>) => void;
  shipment: Shipment;
}

const CargoDetailsStep = ({ formData, onChange, shipment }: CargoDetailsStepProps) => {
  const [showTemperatureFields, setShowTemperatureFields] = useState(false);

  const cargoTypes = [
    { value: "general", label: "General Cargo" },
    { value: "perishable", label: "Perishable Goods" },
    { value: "fragile", label: "Fragile Items" },
    { value: "hazardous", label: "Hazardous Materials" },
    { value: "valuable", label: "High-Value Items" },
    { value: "temperature_controlled", label: "Temperature Controlled" },
  ];

  const handleCargoTypeChange = (value: string) => {
    onChange({ cargo_type: value });
    setShowTemperatureFields(value === "temperature_controlled");
  };

  return (
    <div className="space-y-6">
      {formData.cargo_type === "hazardous" && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Hazardous materials require additional documentation and special handling. Our team will contact you for details.
          </AlertDescription>
        </Alert>
      )}

      <Card className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <PackageSearch className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-medium">Cargo Information</h3>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cargo_type">Type of Cargo</Label>
              <Select 
                value={formData.cargo_type} 
                onValueChange={handleCargoTypeChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select cargo type" />
                </SelectTrigger>
                <SelectContent>
                  {cargoTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cargo_description">Cargo Description</Label>
              <Textarea
                id="cargo_description"
                value={formData.cargo_description}
                onChange={(e) => onChange({ cargo_description: e.target.value })}
                placeholder="Please provide a detailed description of your cargo"
                rows={3}
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Ruler className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-medium">Dimensions & Weight</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="length">Length ({formData.cargo_dimensions.dimension_unit})</Label>
            <div className="flex items-center gap-2">
              <Input
                id="length"
                type="number"
                value={formData.cargo_dimensions.length}
                onChange={(e) => onChange({
                  cargo_dimensions: {
                    ...formData.cargo_dimensions,
                    length: Number(e.target.value)
                  }
                })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="width">Width ({formData.cargo_dimensions.dimension_unit})</Label>
            <Input
              id="width"
              type="number"
              value={formData.cargo_dimensions.width}
              onChange={(e) => onChange({
                cargo_dimensions: {
                  ...formData.cargo_dimensions,
                  width: Number(e.target.value)
                }
              })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Height ({formData.cargo_dimensions.dimension_unit})</Label>
            <Input
              id="height"
              type="number"
              value={formData.cargo_dimensions.height}
              onChange={(e) => onChange({
                cargo_dimensions: {
                  ...formData.cargo_dimensions,
                  height: Number(e.target.value)
                }
              })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Weight ({formData.cargo_dimensions.weight_unit})</Label>
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-muted-foreground" />
              <Input
                id="weight"
                type="number"
                value={formData.cargo_dimensions.weight}
                onChange={(e) => onChange({
                  cargo_dimensions: {
                    ...formData.cargo_dimensions,
                    weight: Number(e.target.value)
                  }
                })}
              />
            </div>
          </div>
        </div>
      </Card>

      {showTemperatureFields && (
        <Card className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <ThermometerIcon className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-medium">Temperature Requirements</h3>
          </div>

          <TemperatureRequirementsInput
            requirements={formData.temperature_requirements || { min: 0, max: 0, unit: 'C' }}
            onChange={(requirements) => onChange({ temperature_requirements: requirements })}
            allowedRange={shipment.temperature_range ? JSON.parse(shipment.temperature_range as string) : undefined}
          />
        </Card>
      )}
    </div>
  );
};

export default CargoDetailsStep;
