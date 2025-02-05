import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Package } from "lucide-react";
import { CargoDimensions } from "@/types/database.types";

interface CargoDimensionsInputProps {
  dimensions: CargoDimensions;
  maxDimensions?: {
    length: number;
    width: number;
    height: number;
    weight: number;
  };
  onChange: (dimensions: CargoDimensions) => void;
  disabled?: boolean;
}

const CargoDimensionsInput = ({ dimensions, maxDimensions, onChange, disabled }: CargoDimensionsInputProps) => {
  const handleChange = (field: keyof CargoDimensions, value: number) => {
    onChange({
      ...dimensions,
      [field]: value,
      weight_unit: dimensions.weight_unit || 'kg',
      dimension_unit: dimensions.dimension_unit || 'm'
    });
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-gray-500" />
          <Label>Cargo Dimensions</Label>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="length">Length (m)</Label>
            <Input
              id="length"
              type="number"
              value={dimensions.length || 0}
              onChange={(e) => handleChange("length", Number(e.target.value))}
              min={0}
              max={maxDimensions?.length}
              disabled={disabled}
            />
            {maxDimensions?.length && (
              <p className="text-xs text-gray-500 mt-1">Max: {maxDimensions.length}m</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="width">Width (m)</Label>
            <Input
              id="width"
              type="number"
              value={dimensions.width || 0}
              onChange={(e) => handleChange("width", Number(e.target.value))}
              min={0}
              max={maxDimensions?.width}
              disabled={disabled}
            />
            {maxDimensions?.width && (
              <p className="text-xs text-gray-500 mt-1">Max: {maxDimensions.width}m</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="height">Height (m)</Label>
            <Input
              id="height"
              type="number"
              value={dimensions.height || 0}
              onChange={(e) => handleChange("height", Number(e.target.value))}
              min={0}
              max={maxDimensions?.height}
              disabled={disabled}
            />
            {maxDimensions?.height && (
              <p className="text-xs text-gray-500 mt-1">Max: {maxDimensions.height}m</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={dimensions.weight || 0}
              onChange={(e) => handleChange("weight", Number(e.target.value))}
              min={0}
              max={maxDimensions?.weight}
              disabled={disabled}
            />
            {maxDimensions?.weight && (
              <p className="text-xs text-gray-500 mt-1">Max: {maxDimensions.weight}kg</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CargoDimensionsInput;