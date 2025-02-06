
import { MapPin } from "lucide-react";

interface LocationInfoProps {
  location: string;
  port: string | null;
  label: string;
}

const LocationInfo = ({ location, port, label }: LocationInfoProps) => {
  return (
    <div className="flex items-start gap-2">
      <MapPin className="h-4 w-4 text-gray-500 mt-1 shrink-0" />
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          {location}
        </h3>
        <p className="text-sm text-gray-500">
          {port || label}
        </p>
      </div>
    </div>
  );
};

export default LocationInfo;
