
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface MarketplaceHeaderProps {
  onCreateShipment: () => void;
}

const MarketplaceHeader = ({ onCreateShipment }: MarketplaceHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-primary">Cargo Buddy Bridge</h1>
      <Button 
        className="flex items-center gap-2"
        onClick={onCreateShipment}
      >
        <Plus className="h-4 w-4" />
        Post a Shipment
      </Button>
    </div>
  );
};

export default MarketplaceHeader;
