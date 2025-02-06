import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { shipmentService } from "@/services/api";
import { TransportMode, ShipmentStatus } from "@/types/database.types";
import BasicShipmentFields from "./form/BasicShipmentFields";
import CargoDetailsFields from "./form/CargoDetailsFields";

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
    transport_mode: "sea" as TransportMode,
    container_type: "",
    transit_time_days: 0,
    customs_clearance: false,
    door_pickup: false,
    door_delivery: false,
    min_booking_size: 0,
    status: "available" as ShipmentStatus,
    additional_services: [] as string[],
    cargo_restrictions: [] as string[],
    consolidation_service: false,
    route_frequency: "",
    route_tags: [] as string[],
    route_type: "direct",
    notes: "",
    preferred_cargo_types: [] as string[],
    stops: [] as any[],
    featured: false,
    display_order: 0,
    category: "",
    accepted_cargo_types: [] as string[],
    max_piece_dimensions: {
      length: 0,
      width: 0,
      height: 0,
      weight: 0
    },
    hazmat_accepted: false,
    temperature_controlled: false,
    temperature_range: {
      min: null,
      max: null,
      unit: 'C' as const
    },
    special_handling_options: [] as string[],
    required_cargo_docs: [] as string[]
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
      <div className="space-y-6">
        <BasicShipmentFields
          formData={formData}
          onChange={handleFieldChange}
          disabled={loading}
        />
        
        <CargoDetailsFields
          formData={formData}
          onChange={handleFieldChange}
          disabled={loading}
        />
      </div>

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