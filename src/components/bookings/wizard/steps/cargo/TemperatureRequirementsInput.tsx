import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Thermometer } from "lucide-react";
import { CargoTemperatureRequirements } from "@/types/database.types";

interface TemperatureRequirementsInputProps {
  requirements: CargoTemperatureRequirements;
  allowedRange?: { min: number; max: number };
  onChange: (requirements: CargoTemperatureRequirements) => void;
  disabled?: boolean;
}

const TemperatureRequirementsInput = ({ 
  requirements, 
  allowedRange, 
  onChange, 
  disabled 
}: TemperatureRequirementsInputProps) => {
  const handleChange = (field: 'min' | 'max', value: number) => {
    onChange({
      ...requirements,
      [field]: value,
      unit: requirements.unit || 'C'
    });
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Thermometer className="h-4 w-4 text-gray-500" />
          <Label>Temperature Requirements</Label>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="min_temp">Minimum (°C)</Label>
            <Input
              id="min_temp"
              type="number"
              value={requirements.min || 0}
              onChange={(e) => handleChange("min", Number(e.target.value))}
              min={allowedRange?.min}
              max={allowedRange?.max}
              disabled={disabled}
            />
            {allowedRange?.min !== undefined && (
              <p className="text-xs text-gray-500 mt-1">Min allowed: {allowedRange.min}°C</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="max_temp">Maximum (°C)</Label>
            <Input
              id="max_temp"
              type="number"
              value={requirements.max || 0}
              onChange={(e) => handleChange("max", Number(e.target.value))}
              min={allowedRange?.min}
              max={allowedRange?.max}
              disabled={disabled}
            />
            {allowedRange?.max !== undefined && (
              <p className="text-xs text-gray-500 mt-1">Max allowed: {allowedRange.max}°C</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TemperatureRequirementsInput;