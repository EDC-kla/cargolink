
import { Truck } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

interface ServicesInfoProps {
  specialHandling?: string[] | null;
  additionalServices?: string[] | null;
}

const ServicesInfo = ({ specialHandling, additionalServices }: ServicesInfoProps) => {
  if (!specialHandling?.length && !additionalServices?.length) return null;

  return (
    <div className="mt-4">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline" size="sm" className="w-full">
            <Truck className="h-4 w-4 mr-2" />
            View Services
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          {specialHandling?.length > 0 && (
            <div className="mb-3">
              <h4 className="text-sm font-medium mb-1">Special Handling</h4>
              <div className="text-sm text-gray-500">
                {specialHandling.join(', ')}
              </div>
            </div>
          )}
          {additionalServices?.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-1">Additional Services</h4>
              <div className="text-sm text-gray-500">
                {additionalServices.join(', ')}
              </div>
            </div>
          )}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default ServicesInfo;
