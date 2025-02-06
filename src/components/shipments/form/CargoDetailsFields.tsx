import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CargoType } from "@/types/database.types";

interface CargoDetailsFieldsProps {
  formData: {
    accepted_cargo_types: string[];
    hazmat_accepted: boolean;
    max_piece_dimensions: {
      length: number;
      width: number;
      height: number;
      weight: number;
    };
    temperature_controlled: boolean;
    temperature_range: {
      min: number | null;
      max: number | null;
      unit: 'C' | 'F';
    };
  };
  onChange: (field: string, value: any) => void;
  disabled?: boolean;
}

const CargoDetailsFields = ({ formData, onChange, disabled }: CargoDetailsFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Maximum Piece Dimensions</Label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="length">Length (m)</Label>
            <Input
              id="length"
              type="number"
              min={0}
              value={formData.max_piece_dimensions.length}
              onChange={(e) => onChange("max_piece_dimensions", {
                ...formData.max_piece_dimensions,
                length: Number(e.target.value)
              })}
              disabled={disabled}
            />
          </div>
          <div>
            <Label htmlFor="width">Width (m)</Label>
            <Input
              id="width"
              type="number"
              min={0}
              value={formData.max_piece_dimensions.width}
              onChange={(e) => onChange("max_piece_dimensions", {
                ...formData.max_piece_dimensions,
                width: Number(e.target.value)
              })}
              disabled={disabled}
            />
          </div>
          <div>
            <Label htmlFor="height">Height (m)</Label>
            <Input
              id="height"
              type="number"
              min={0}
              value={formData.max_piece_dimensions.height}
              onChange={(e) => onChange("max_piece_dimensions", {
                ...formData.max_piece_dimensions,
                height: Number(e.target.value)
              })}
              disabled={disabled}
            />
          </div>
          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              min={0}
              value={formData.max_piece_dimensions.weight}
              onChange={(e) => onChange("max_piece_dimensions", {
                ...formData.max_piece_dimensions,
                weight: Number(e.target.value)
              })}
              disabled={disabled}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="hazmat_accepted"
          checked={formData.hazmat_accepted}
          onCheckedChange={(checked) => onChange("hazmat_accepted", checked)}
          disabled={disabled}
        />
        <Label htmlFor="hazmat_accepted">Accept Hazardous Materials</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="temperature_controlled"
          checked={formData.temperature_controlled}
          onCheckedChange={(checked) => onChange("temperature_controlled", checked)}
          disabled={disabled}
        />
        <Label htmlFor="temperature_controlled">Temperature Controlled</Label>
      </div>

      {formData.temperature_controlled && (
        <div className="space-y-2">
          <Label>Temperature Range (°C)</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="temp_min">Minimum</Label>
              <Input
                id="temp_min"
                type="number"
                value={formData.temperature_range.min || 0}
                onChange={(e) => onChange("temperature_range", {
                  ...formData.temperature_range,
                  min: Number(e.target.value)
                })}
                disabled={disabled}
              />
            </div>
            <div>
              <Label htmlFor="temp_max">Maximum</Label>
              <Input
                id="temp_max"
                type="number"
                value={formData.temperature_range.max || 0}
                onChange={(e) => onChange("temperature_range", {
                  ...formData.temperature_range,
                  max: Number(e.target.value)
                })}
                disabled={disabled}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CargoDetailsFields;