
import { Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface DateInfoProps {
  departureDate: string;
  estimatedArrival?: string | null;
}

const DateInfo = ({ departureDate, estimatedArrival }: DateInfoProps) => {
  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center text-sm text-gray-500">
        <Clock className="h-4 w-4 mr-2" />
        <span>Departure: {formatDate(departureDate)}</span>
      </div>
      {estimatedArrival && (
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-2" />
          <span>Estimated Arrival: {formatDate(estimatedArrival)}</span>
        </div>
      )}
    </div>
  );
};

export default DateInfo;
