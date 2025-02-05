import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package } from "lucide-react";

interface BookingSpaceInputProps {
  spaceRequired: number;
  availableSpace: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const BookingSpaceInput = ({ spaceRequired, availableSpace, onChange, disabled }: BookingSpaceInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="space">Space Required (CBM)</Label>
      <div className="flex items-center space-x-2">
        <Package className="h-4 w-4 text-gray-400" />
        <Input
          id="space"
          type="number"
          min={1}
          max={availableSpace}
          value={spaceRequired}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full"
          disabled={disabled}
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Available space: {availableSpace} CBM
      </p>
    </div>
  );
};

export default BookingSpaceInput;