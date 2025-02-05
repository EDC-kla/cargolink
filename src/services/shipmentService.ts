import { supabase } from '@/integrations/supabase/client';
import { Shipment, RouteStop, CargoType, ShipmentStatus } from '@/types/database.types';
import { Json } from '@/integrations/supabase/types';

const transformRouteStopsToJson = (stops: RouteStop[]): Json[] => 
  stops.map(stop => ({
    location: stop.location,
    stop_type: stop.stop_type,
    arrival_date: stop.arrival_date,
    departure_date: stop.departure_date,
    notes: stop.notes
  }));

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
        stops: transformRouteStopsToJson(shipment.stops)
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
      .update({
        ...updates,
        stops: updates.stops ? transformRouteStopsToJson(updates.stops) : undefined
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return transformShipmentResponse(data);
  },

  async deleteShipment(id: string) {
    const { error } = await supabase
      .from('shipments')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};