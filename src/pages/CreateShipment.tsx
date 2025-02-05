import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { shipmentService } from "@/services/api";
import CreateShipmentWizard from "@/components/shipments/wizard/CreateShipmentWizard";

const CreateShipment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    navigate("/marketplace");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Create New Shipment</h1>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow-lg p-6">
        <CreateShipmentWizard onClose={handleClose} />
      </div>
    </div>
  );
};

export default CreateShipment;