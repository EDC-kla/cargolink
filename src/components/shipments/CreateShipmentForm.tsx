import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { shipmentService } from "@/services/shipmentService";
import ShipmentFormFields from "./ShipmentFormFields";
import { Shipment, ShipmentStatus, TransportMode } from "@/types/database.types";

interface CreateShipmentFormProps {
  onClose: () => void;
  initialData?: Shipment | null;
}

const CreateShipmentForm = ({ onClose, initialData }: CreateShipmentFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    origin: initialData?.origin || "",
    destination: initialData?.destination || "",
    departure_date: initialData?.departure_date || "",
    available_space: initialData?.available_space || 1,
    price_per_cbm: initialData?.price_per_cbm || 1,
    transport_mode: (initialData?.transport_mode || "sea") as TransportMode,
    container_type: initialData?.container_type || "",
    transit_time_days: initialData?.transit_time_days || 0,
    customs_clearance: initialData?.customs_clearance || false,
    door_pickup: initialData?.door_pickup || false,
    door_delivery: initialData?.door_delivery || false,
    min_booking_size: initialData?.min_booking_size || 0,
    status: (initialData?.status || "available") as ShipmentStatus,
    additional_services: initialData?.additional_services || [],
    cargo_restrictions: initialData?.cargo_restrictions || [],
    consolidation_service: initialData?.consolidation_service || false,
    route_frequency: initialData?.route_frequency || "",
    route_tags: initialData?.route_tags || [],
    route_type: initialData?.route_type || "direct",
    notes: initialData?.notes || "",
    preferred_cargo_types: initialData?.preferred_cargo_types || [],
    stops: initialData?.stops || [],
    featured: initialData?.featured || false,
    display_order: initialData?.display_order || 0,
    category: initialData?.category || ""
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
      if (initialData) {
        await shipmentService.updateShipment(initialData.id, formData);
        toast({
          title: "Success",
          description: "Shipment updated successfully",
        });
      } else {
        await shipmentService.createShipment(formData);
        toast({
          title: "Success",
          description: "Shipment created successfully",
        });
      }
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
              {initialData ? "Updating..." : "Creating..."}
            </>
          ) : (
            initialData ? "Update Shipment" : "Create Shipment"
          )}
        </Button>
      </div>
    </form>
  );
};

export default CreateShipmentForm;