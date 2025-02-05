import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { shipmentService } from '@/services/api';
import { Shipment, ShipmentStatus, TransportMode } from "@/types/database.types";

export const useShipmentForm = (onClose: () => void) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<Shipment, "id" | "created_at" | "created_by">>({
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
    additional_services: [],
    cargo_restrictions: [],
    consolidation_service: false,
    route_frequency: "",
    route_tags: [],
    route_type: "direct",
    notes: "",
    preferred_cargo_types: [],
    stops: [],
    featured: false,
    display_order: 0,
    category: "",
    accepted_cargo_types: [],
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
    special_handling_options: [],
    required_cargo_docs: []
  });

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const isValid = (step: number) => {
    switch (step) {
      case 0: // Location
        return formData.origin && formData.destination;
      case 1: // Transport
        return formData.transport_mode && formData.container_type;
      case 2: // Date
        return formData.departure_date;
      case 3: // Space & Price
        return formData.available_space > 0 && formData.price_per_cbm > 0;
      case 4: // Review
        return true;
      default:
        return false;
    }
  };

  const submitShipment = async () => {
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
    updateFormData,
    submitShipment,
    isValid,
    handleSubmit: submitShipment,
  };
};