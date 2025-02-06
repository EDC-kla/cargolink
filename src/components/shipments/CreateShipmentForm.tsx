interface CreateShipmentFormProps {
  onClose: () => void;
  shipmentData?: Shipment;
}

const CreateShipmentForm = ({ onClose, shipmentData }: CreateShipmentFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    origin: shipmentData?.origin || "",
    destination: shipmentData?.destination || "",
    departure_date: shipmentData?.departure_date || "",
    available_space: shipmentData?.available_space || 1,
    price_per_cbm: shipmentData?.price_per_cbm || 1,
    transport_mode: shipmentData?.transport_mode || "sea" as TransportMode,
    container_type: shipmentData?.container_type || "",
    transit_time_days: shipmentData?.transit_time_days || 0,
    customs_clearance: shipmentData?.customs_clearance || false,
    door_pickup: shipmentData?.door_pickup || false,
    door_delivery: shipmentData?.door_delivery || false,
    min_booking_size: shipmentData?.min_booking_size || 0,
    status: shipmentData?.status || "available" as ShipmentStatus,
    additional_services: shipmentData?.additional_services || [],
    cargo_restrictions: shipmentData?.cargo_restrictions || [],
    consolidation_service: shipmentData?.consolidation_service || false,
    route_frequency: shipmentData?.route_frequency || "",
    route_tags: shipmentData?.route_tags || [],
    route_type: shipmentData?.route_type || "direct",
    notes: shipmentData?.notes || "",
    preferred_cargo_types: shipmentData?.preferred_cargo_types || [],
    stops: shipmentData?.stops || [],
    featured: shipmentData?.featured || false,
    display_order: shipmentData?.display_order || 0,
    category: shipmentData?.category || "",
    accepted_cargo_types: shipmentData?.accepted_cargo_types || [],
    max_piece_dimensions: shipmentData?.max_piece_dimensions || {
      length: 0,
      width: 0,
      height: 0,
      weight: 0
    },
    hazmat_accepted: shipmentData?.hazmat_accepted || false,
    temperature_controlled: shipmentData?.temperature_controlled || false,
    temperature_range: shipmentData?.temperature_range || {
      min: null,
      max: null,
      unit: 'C' as const
    },
    special_handling_options: shipmentData?.special_handling_options || [],
    required_cargo_docs: shipmentData?.required_cargo_docs || []
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
