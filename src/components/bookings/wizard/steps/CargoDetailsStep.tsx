import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { BookingFormData } from "../BookingWizard";
import { Shipment, CargoDimensions } from "@/types/database.types";
import CargoDimensionsInput from "./cargo/CargoDimensionsInput";
import TemperatureRequirementsInput from "./cargo/TemperatureRequirementsInput";

interface CargoDetailsStepProps {
  data: BookingFormData;
  onChange: (data: Partial<BookingFormData>) => void;
  shipment: Shipment;
}

const CargoDetailsStep = ({ data, onChange, shipment }: CargoDetailsStepProps) => {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    const errors: string[] = [];
    
    if (data.cargo_type && !shipment.accepted_cargo_types?.includes(data.cargo_type)) {
      errors.push(`This shipment does not accept ${data.cargo_type} cargo type`);
    }

    if (shipment.max_piece_dimensions && data.cargo_dimensions) {
      const max = shipment.max_piece_dimensions;
      const current = data.cargo_dimensions;
      
      if (current.length > max.length) {
        errors.push(`Length exceeds maximum allowed (${max.length}m)`);
      }
      if (current.width > max.width) {
        errors.push(`Width exceeds maximum allowed (${max.width}m)`);
      }
      if (current.height > max.height) {
        errors.push(`Height exceeds maximum allowed (${max.height}m)`);
      }
      if (current.weight > max.weight) {
        errors.push(`Weight exceeds maximum allowed (${max.weight}kg)`);
      }
    }

    setValidationErrors(errors);
  }, [data, shipment]);

  const initialDimensions: CargoDimensions = {
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
    weight_unit: 'kg',
    dimension_unit: 'm'
  };

  return (
    <div className="space-y-6">
      {validationErrors.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Validation Errors</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cargo_type">Cargo Type</Label>
            <Select
              value={data.cargo_type}
              onValueChange={(value) => onChange({ cargo_type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select cargo type" />
              </SelectTrigger>
              <SelectContent>
                {shipment.accepted_cargo_types?.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cargo_value">Cargo Value (USD)</Label>
            <Input
              id="cargo_value"
              type="number"
              min={0}
              value={data.cargo_value || 0}
              onChange={(e) => onChange({ cargo_value: Number(e.target.value) })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cargo_description">Cargo Description</Label>
          <Input
            id="cargo_description"
            value={data.cargo_description || ""}
            onChange={(e) => onChange({ cargo_description: e.target.value })}
            placeholder="Detailed description of your cargo"
          />
        </div>

        <CargoDimensionsInput
          dimensions={data.cargo_dimensions || initialDimensions}
          maxDimensions={shipment.max_piece_dimensions}
          onChange={(dimensions) => onChange({ cargo_dimensions: dimensions })}
        />

        {shipment.temperature_controlled && (
          <TemperatureRequirementsInput
            requirements={data.temperature_requirements || { min: 0, max: 0, unit: 'C' }}
            allowedRange={shipment.temperature_range}
            onChange={(requirements) => onChange({ temperature_requirements: requirements })}
          />
        )}

        <div className="space-y-2">
          <Label>Special Handling Requirements</Label>
          <div className="grid grid-cols-2 gap-2">
            {shipment.special_handling_options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`handling_${option}`}
                  checked={data.special_handling?.includes(option)}
                  onCheckedChange={(checked) => {
                    const newHandling = checked
                      ? [...(data.special_handling || []), option]
                      : (data.special_handling || []).filter((h) => h !== option);
                    onChange({ special_handling: newHandling });
                  }}
                />
                <Label htmlFor={`handling_${option}`} className="cursor-pointer">
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CargoDetailsStep;
