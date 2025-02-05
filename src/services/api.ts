import { supabase } from '@/lib/supabase';
import { Shipment, Booking, Profile } from '@/types/database.types';

export const shipmentService = {
  async listShipments() {
    const { data, error } = await supabase
      .from('shipments')
      .select('*')
      .order('departure_date', { ascending: true });
    
    if (error) throw error;
    return data as Shipment[];
  },

  async createShipment(shipment: Omit<Shipment, 'id' | 'created_at' | 'created_by'>) {
    const { data, error } = await supabase
      .from('shipments')
      .insert([shipment])
      .select()
      .single();
    
    if (error) throw error;
    return data as Shipment;
  },

  async bookSpace(booking: Omit<Booking, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('bookings')
      .insert([booking])
      .select()
      .single();
    
    if (error) throw error;
    return data as Booking;
  },

  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data as Profile;
  },

  async updateProfile(profile: Partial<Profile> & { id: string }) {
    const { data, error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', profile.id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Profile;
  }
};