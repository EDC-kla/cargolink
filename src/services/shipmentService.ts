import { supabase } from "@/integrations/supabase/client";
import { Shipment } from "@/types/database.types";

export const shipmentService = {
  listShipments: async () => {
    const { data, error } = await supabase
      .from('shipments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  getShipment: async (id: string) => {
    const { data, error } = await supabase
      .from('shipments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  createShipment: async (shipment: Partial<Shipment>) => {
    const { data, error } = await supabase
      .from('shipments')
      .insert([shipment])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  updateShipment: async (id: string, updates: Partial<Shipment>) => {
    const { data, error } = await supabase
      .from('shipments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
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
    return data;
  },

  bookSpace: async (bookingData: any) => {
    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select()
      .single();

    if (error) throw error;

    // Update available space in shipment
    const shipment = await shipmentService.getShipment(bookingData.shipment_id);
    const newAvailableSpace = shipment.available_space - bookingData.space_booked;

    await shipmentService.updateShipment(bookingData.shipment_id, {
      available_space: newAvailableSpace
    });

    return data;
  }
};