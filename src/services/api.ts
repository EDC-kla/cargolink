import { supabase } from '@/integrations/supabase/client';
import { Shipment, Booking, Profile, BookingStatus, ShipmentStatus, RouteStop, CargoType } from '@/types/database.types';
import { BookingFormData } from '@/components/bookings/wizard/BookingWizard';

const transformShipmentResponse = (data: any): Shipment => ({
  ...data,
  stops: Array.isArray(data.stops)
    ? data.stops.map((stop: any) => ({
        location: stop.location || '',
        stop_type: stop.stop_type || 'port',
        arrival_date: stop.arrival_date,
        departure_date: stop.departure_date,
        notes: stop.notes
      } as RouteStop))
    : [] as RouteStop[],
  preferred_cargo_types: (data.preferred_cargo_types || []) as CargoType[],
  status: data.status as ShipmentStatus
});

export const shipmentService = {
  async listShipments() {
    const { data, error } = await supabase
      .from('shipments')
      .select('*')
      .order('departure_date', { ascending: true });
    
    if (error) throw error;
    return data.map(transformShipmentResponse);
  },

  async getShipment(id: string) {
    const { data, error } = await supabase
      .from('shipments')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return transformShipmentResponse(data);
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
      .insert([{
        ...shipment,
        created_by: user.id,
        stops: shipment.stops.map(stop => ({
          location: stop.location,
          stop_type: stop.stop_type,
          arrival_date: stop.arrival_date,
          departure_date: stop.departure_date,
          notes: stop.notes
        }))
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating shipment:', error);
      throw new Error(error.message);
    }
    return transformShipmentResponse(data);
  },

  async updateShipment(id: string, updates: Partial<Shipment>) {
    const { data, error } = await supabase
      .from('shipments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as unknown as Shipment;
  },

  async deleteShipment(id: string) {
    const { error } = await supabase
      .from('shipments')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async updateBooking(id: string, updates: Partial<BookingFormData> & { status: BookingStatus; is_draft: boolean }) {
    const { data, error } = await supabase
      .from('bookings')
      .update({
        ...updates,
        cargo_dimensions: updates.cargo_dimensions 
          ? JSON.stringify(updates.cargo_dimensions)
          : undefined,
        temperature_requirements: updates.temperature_requirements 
          ? JSON.stringify(updates.temperature_requirements)
          : undefined
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return transformBookingResponse(data) as Booking;
  },

  async bookSpace(booking: BookingFormData & { shipment_id: string; status: string }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('bookings')
      .insert([{ 
        ...booking,
        user_id: user.id,
        cargo_dimensions: JSON.stringify(booking.cargo_dimensions),
        temperature_requirements: booking.temperature_requirements 
          ? JSON.stringify(booking.temperature_requirements)
          : null
      }])
      .select()
      .single();
    
    if (error) throw error;
    return transformBookingResponse(data) as Booking;
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
    return data.map(booking => ({
      ...transformBookingResponse(booking),
      shipment: booking.shipment as Shipment
    })) as (Booking & { shipment: Shipment })[];
  },

  async updateBookingStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return transformBookingResponse(data) as Booking;
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

function transformBookingResponse(data: any): Booking {
  return {
    ...data,
    cargo_dimensions: typeof data.cargo_dimensions === 'string' 
      ? JSON.parse(data.cargo_dimensions)
      : data.cargo_dimensions || { length: 0, width: 0, height: 0, weight: 0 },
    temperature_requirements: data.temperature_requirements
      ? typeof data.temperature_requirements === 'string'
        ? JSON.parse(data.temperature_requirements)
        : data.temperature_requirements
      : null,
    special_handling: data.special_handling || [],
    required_certificates: data.required_certificates || [],
    status: data.status as BookingStatus
  };
}
