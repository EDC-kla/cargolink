import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CargoDimensions } from "@/types/database.types";

interface CargoDetailsStepProps {
  formData: {
    cargo_dimensions: CargoDimensions;
    onChange: (field: string, value: any) => void;
  };
}

const CargoDetailsStep = ({ formData, onChange }: CargoDetailsStepProps) => {
  const initialDimensions: CargoDimensions = {
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
    weight_unit: 'kg',
    dimension_unit: 'm'
  };

  const [dimensions, setDimensions] = useState<CargoDimensions>(initialDimensions);

  const handleDimensionChange = (field: keyof CargoDimensions, value: any) => {
    const newDimensions = { ...dimensions, [field]: value };
    setDimensions(newDimensions);
    onChange("cargo_dimensions", newDimensions);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="length">Length</Label>
          <Input
            id="length"
            type="number"
            value={dimensions.length}
            onChange={(e) => handleDimensionChange("length", Number(e.target.value))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="width">Width</Label>
          <Input
            id="width"
            type="number"
            value={dimensions.width}
            onChange={(e) => handleDimensionChange("width", Number(e.target.value))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Height</Label>
          <Input
            id="height"
            type="number"
            value={dimensions.height}
            onChange={(e) => handleDimensionChange("height", Number(e.target.value))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Weight</Label>
          <Input
            id="weight"
            type="number"
            value={dimensions.weight}
            onChange={(e) => handleDimensionChange("weight", Number(e.target.value))}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="weight_unit">Weight Unit</Label>
          <select
            id="weight_unit"
            value={dimensions.weight_unit}
            onChange={(e) => handleDimensionChange("weight_unit", e.target.value)}
          >
            <option value="kg">Kilograms</option>
            <option value="lbs">Pounds</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dimension_unit">Dimension Unit</Label>
          <select
            id="dimension_unit"
            value={dimensions.dimension_unit}
            onChange={(e) => handleDimensionChange("dimension_unit", e.target.value)}
          >
            <option value="m">Meters</option>
            <option value="cm">Centimeters</option>
            <option value="in">Inches</option>
            <option value="ft">Feet</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CargoDetailsStep;
