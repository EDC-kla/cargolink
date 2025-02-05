import { supabase } from "@/integrations/supabase/client";
import { Shipment, TransportMode, RouteStop } from "@/types/database.types";

export const transformShipmentResponse = (data: any): Shipment => {
  return {
    ...data,
    transport_mode: data.transport_mode as TransportMode,
    stops: Array.isArray(data.stops) ? data.stops.map((stop: any) => ({
      location: stop.location,
      arrival_date: stop.arrival_date,
      departure_date: stop.departure_date,
      stop_type: stop.stop_type,
      notes: stop.notes
    })) : [],
    additional_services: data.additional_services || [],
    cargo_restrictions: data.cargo_restrictions || [],
    route_tags: data.route_tags || [],
    preferred_cargo_types: data.preferred_cargo_types || []
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
    const { data, error } = await supabase
      .from('shipments')
      .insert([shipment])
      .select()
      .single();

    if (error) throw error;
    return transformShipmentResponse(data);
  },

  updateShipment: async (id: string, updates: Partial<Omit<Shipment, 'id' | 'created_at'>>) => {
    const { data, error } = await supabase
      .from('shipments')
      .update(updates)
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