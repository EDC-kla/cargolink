import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SpecialHandlingType } from "@/types/database.types";

interface SpecialHandlingInputProps {
  value: SpecialHandlingType[];
  onChange: (value: SpecialHandlingType[]) => void;
  availableOptions: SpecialHandlingType[];
  disabled?: boolean;
}

const SpecialHandlingInput = ({
  value,
  onChange,
  availableOptions,
  disabled
}: SpecialHandlingInputProps) => {
  const handleToggle = (option: SpecialHandlingType) => {
    const newValue = value.includes(option)
      ? value.filter(v => v !== option)
      : [...value, option];
    onChange(newValue);
  };

  return (
    <div className="space-y-4">
      <Label>Special Handling Requirements</Label>
      <div className="grid grid-cols-2 gap-4">
        {availableOptions.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={option}
              checked={value.includes(option)}
              onCheckedChange={() => handleToggle(option)}
              disabled={disabled}
            />
            <Label htmlFor={option} className="capitalize cursor-pointer">
              {option.replace(/_/g, ' ')}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialHandlingInput;