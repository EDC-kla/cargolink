
import { AlertTriangle } from "lucide-react";

interface CargoRestrictionsProps {
  restrictions?: string[] | null;
}

const CargoRestrictions = ({ restrictions }: CargoRestrictionsProps) => {
  if (!restrictions?.length) return null;

  return (
    <div className="mt-4 p-3 bg-yellow-50 rounded-md">
      <div className="flex items-center text-yellow-800 text-sm">
        <AlertTriangle className="h-4 w-4 mr-2" />
        <span className="font-medium">Cargo Restrictions</span>
      </div>
      <p className="mt-1 text-sm text-yellow-700">
        {restrictions.join(', ')}
      </p>
    </div>
  );
};

export default CargoRestrictions;
