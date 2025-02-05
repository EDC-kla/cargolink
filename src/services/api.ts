
import { supabase } from '@/integrations/supabase/client';
import { Shipment, Booking, Profile } from '@/types/database.types';
import { BookingFormData } from '@/components/bookings/wizard/BookingWizard';

export const shipmentService = {
  async listShipments() {
    const { data, error } = await supabase
      .from('shipments')
      .select('*')
      .order('departure_date', { ascending: true });
    
    if (error) throw error;
    return data as Shipment[];
  },

  async getShipment(id: string) {
    const { data, error } = await supabase
      .from('shipments')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Shipment;
  },

  async createShipment(shipment: Omit<Shipment, 'id' | 'created_at' | 'created_by'>) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id);

    if (!roles?.some(r => r.role === 'seller' || r.role === 'buyer')) {
      throw new Error('You must be a seller or buyer to create shipments');
    }

    const { data, error } = await supabase
      .from('shipments')
      .insert([{ ...shipment, created_by: user.id }])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating shipment:', error);
      throw new Error(error.message);
    }
    return data as Shipment;
  },

  async updateShipment(id: string, updates: Partial<Shipment>) {
    const { data, error } = await supabase
      .from('shipments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Shipment;
  },

  async deleteShipment(id: string) {
    const { error } = await supabase
      .from('shipments')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async bookSpace(booking: BookingFormData & { shipment_id: string; status: string }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('bookings')
      .insert([{ 
        ...booking,
        user_id: user.id,
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data as Booking;
  },

  async listUserBookings() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        shipment:shipments (*)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as (Booking & { shipment: Shipment })[];
  },

  async updateBookingStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)
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
