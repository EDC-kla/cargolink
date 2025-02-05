import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";

interface DateStepProps {
  value: string;
  onChange: (value: string) => void;
}

const DateStep = ({ value, onChange }: DateStepProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="departure_date">When are you departing?</Label>
      <div className="flex items-center space-x-2">
        <Calendar className="h-4 w-4 text-gray-400" />
        <Input
          id="departure_date"
          type="datetime-local"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          min={new Date().toISOString().slice(0, 16)}
        />
      </div>
    </div>
  );
};

export default DateStep;