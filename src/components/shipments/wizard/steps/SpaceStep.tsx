import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, DollarSign } from "lucide-react";

interface SpaceStepProps {
  availableSpace: number;
  pricePerCbm: number;
  onChange: (field: string, value: number) => void;
}

const SpaceStep = ({ availableSpace, pricePerCbm, onChange }: SpaceStepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="available_space">How much space is available? (CBM)</Label>
        <div className="flex items-center space-x-2">
          <Package className="h-4 w-4 text-gray-400" />
          <Input
            id="available_space"
            type="number"
            min={1}
            value={availableSpace}
            onChange={(e) => onChange("available_space", Number(e.target.value))}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price_per_cbm">What's your price per CBM? ($)</Label>
        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4 text-gray-400" />
          <Input
            id="price_per_cbm"
            type="number"
            min={1}
            value={pricePerCbm}
            onChange={(e) => onChange("price_per_cbm", Number(e.target.value))}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default SpaceStep;