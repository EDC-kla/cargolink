
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { shipmentService } from '@/services/api';

export const useShipmentForm = (onClose: () => void) => {
  const [currentStep, setCurrentStep] = useState(0);
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
    stops: [] as string[],  // Explicitly type as string[]
    featured: false,        // Add missing property
    display_order: 0,       // Add missing property
    category: ""           // Add missing property
  });

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to create a shipment",
        variant: "destructive",
      });
      return;
    }

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
      console.error('Error creating shipment:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    currentStep,
    setCurrentStep,
    loading,
    formData,
    handleFieldChange,
    handleSubmit,
  };
};

