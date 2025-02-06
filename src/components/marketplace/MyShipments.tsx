import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ShipmentsGrid from "./ShipmentsGrid";

const MyShipments = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">My Shipments</h2>
        <Button 
          onClick={() => navigate("/create-shipment")}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Shipment
        </Button>
      </div>
      <ShipmentsGrid />
    </div>
  );
};

export default MyShipments;