
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { shipmentService } from "@/services/api";
import ShipmentFormFields from "@/components/shipments/ShipmentFormFields";

interface CreateShipmentFormProps {
  onClose: () => void;
}

const CreateShipmentForm = ({ onClose }: CreateShipmentFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departure_date: "",
    available_space: 1,
    price_per_cbm: 1,
    transport_mode: "sea",
    container_type: "",
    transit_time_days: 0,
    customs_clearance: false,
    door_pickup: false,
    door_delivery: false,
    min_booking_size: 0,
    status: "available",
    additional_services: [],
    cargo_restrictions: [],
    consolidation_service: false,
    route_frequency: "",
    route_tags: [],
    route_type: "direct",
    notes: "",
    preferred_cargo_types: [],
    stops: [] as string[],
    featured: false,
    display_order: 0,
    category: ""
  });

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const departureDate = new Date(formData.departure_date);
    if (departureDate < new Date()) {
      toast({
        title: "Invalid date",
        description: "Departure date must be in the future",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      await shipmentService.createShipment(formData);

      toast({
        title: "Success",
        description: "Shipment created successfully",
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ShipmentFormFields
        formData={formData}
        onChange={handleFieldChange}
        disabled={loading}
      />

      <div className="flex justify-end space-x-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Shipment"
          )}
        </Button>
      </div>
    </form>
  );
};

export default CreateShipmentForm;
