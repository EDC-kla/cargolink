import { supabase } from "@/integrations/supabase/client";
import { Shipment, TransportMode, RouteStop } from "@/types/database.types";

// Helper function to convert RouteStop to JSON-compatible format
const convertRouteStopToJson = (stop: RouteStop) => ({
  location: stop.location,
  arrival_date: stop.arrival_date,
  departure_date: stop.departure_date,
  stop_type: stop.stop_type,
  notes: stop.notes
});

// Helper function to convert JSON to RouteStop
const convertJsonToRouteStop = (json: any): RouteStop => ({
  location: json.location,
  arrival_date: json.arrival_date,
  departure_date: json.departure_date,
  stop_type: json.stop_type,
  notes: json.notes
});

// Helper to ensure valid date or null
const ensureValidDate = (date: string | null | undefined): string | null => {
  if (!date) return null;
  const parsedDate = new Date(date);
  return isNaN(parsedDate.getTime()) ? null : parsedDate.toISOString();
};

export const transformShipmentResponse = (data: any): Shipment => {
  return {
    ...data,
    transport_mode: data.transport_mode as TransportMode,
    departure_date: ensureValidDate(data.departure_date) || new Date().toISOString(),
    cutoff_date: ensureValidDate(data.cutoff_date),
    estimated_arrival: ensureValidDate(data.estimated_arrival),
    stops: Array.isArray(data.stops) 
      ? data.stops.map(convertJsonToRouteStop)
      : [],
    additional_services: data.additional_services || [],
    cargo_restrictions: data.cargo_restrictions || [],
    route_tags: data.route_tags || [],
    preferred_cargo_types: data.preferred_cargo_types || [],
    carrier_certifications: data.carrier_certifications || [],
    intermodal_services: data.intermodal_services || [],
    equipment_details: data.equipment_details || null,
    service_level_agreement: data.service_level_agreement || null,
    liability_coverage: data.liability_coverage || null,
    schedule_reliability_metrics: data.schedule_reliability_metrics || null,
    vessel_tracking_info: data.vessel_tracking_info || null,
    service_schedule: data.service_schedule || null,
    carrier_insurance_info: data.carrier_insurance_info || null,
    equipment_specifications: data.equipment_specifications || null
  };
};

export const shipmentService = {
  listShipments: async () => {
    const { data, error } = await supabase
      .from('shipments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(transformShipmentResponse);
  },

  getShipment: async (id: string) => {
    const { data, error } = await supabase
      .from('shipments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return transformShipmentResponse(data);
  },

  createShipment: async (shipment: Omit<Shipment, 'id' | 'created_at'>) => {
    // Ensure dates are in ISO format
    const formattedShipment = {
      ...shipment,
      departure_date: ensureValidDate(shipment.departure_date),
      cutoff_date: ensureValidDate(shipment.cutoff_date),
      estimated_arrival: ensureValidDate(shipment.estimated_arrival),
      stops: shipment.stops?.map(convertRouteStopToJson)
    };

    const { data, error } = await supabase
      .from('shipments')
      .insert([formattedShipment])
      .select()
      .single();

    if (error) throw error;
    return transformShipmentResponse(data);
  },

  updateShipment: async (id: string, updates: Partial<Omit<Shipment, 'id' | 'created_at'>>) => {
    // Ensure dates are in ISO format
    const formattedUpdates = {
      ...updates,
      departure_date: updates.departure_date ? ensureValidDate(updates.departure_date) : undefined,
      cutoff_date: updates.cutoff_date ? ensureValidDate(updates.cutoff_date) : undefined,
      estimated_arrival: updates.estimated_arrival ? ensureValidDate(updates.estimated_arrival) : undefined,
      stops: updates.stops?.map(convertRouteStopToJson)
    };

    const { data, error } = await supabase
      .from('shipments')
      .update(formattedUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return transformShipmentResponse(data);
  },

  deleteShipment: async (id: string) => {
    const { error } = await supabase
      .from('shipments')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  getUserShipments: async (userId: string) => {
    const { data, error } = await supabase
      .from('shipments')
      .select('*')
      .eq('created_by', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(transformShipmentResponse);
  }
};
