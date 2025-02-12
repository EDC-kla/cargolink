
import { supabase } from '@/integrations/supabase/client';
import { Booking, BookingStatus, Shipment } from '@/types/database.types';
import { BookingFormData } from '@/components/bookings/wizard/BookingWizard';
import { transformShipmentResponse } from './shipmentService';

function transformBookingResponse(data: any): Booking {
  return {
    ...data,
    cargo_dimensions: typeof data.cargo_dimensions === 'string' 
      ? JSON.parse(data.cargo_dimensions)
      : data.cargo_dimensions || { length: 0, width: 0, height: 0, weight: 0, weight_unit: 'kg', dimension_unit: 'm' },
    temperature_requirements: data.temperature_requirements
      ? typeof data.temperature_requirements === 'string'
        ? JSON.parse(data.temperature_requirements)
        : data.temperature_requirements
      : null,
    special_handling: data.special_handling || [],
    required_certificates: data.required_certificates || [],
    shipper_certifications: data.shipper_certifications || [],
    cargo_classification_codes: data.cargo_classification_codes || [],
    handling_codes: data.handling_codes || [],
    customs_compliance_info: data.customs_compliance_info || null,
    trade_compliance_details: data.trade_compliance_details || null,
    cargo_insurance_details: data.cargo_insurance_details || null,
    packaging_specifications: data.packaging_specifications || null,
    regulatory_requirements: data.regulatory_requirements || null,
    export_control_details: data.export_control_details || null,
    status: data.status as BookingStatus
  };
}

export const bookingService = {
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
      .select(`
        *,
        shipment:shipments (*)
      `)
      .single();
    
    if (error) throw error;
    return {
      ...transformBookingResponse(data),
      shipment: data.shipment ? transformShipmentResponse(data.shipment) : null
    } as Booking & { shipment: Shipment | null };
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
      .select(`
        *,
        shipment:shipments (*)
      `)
      .single();
    
    if (error) throw error;
    return {
      ...transformBookingResponse(data),
      shipment: data.shipment ? transformShipmentResponse(data.shipment) : null
    } as Booking & { shipment: Shipment | null };
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
      shipment: booking.shipment ? transformShipmentResponse(booking.shipment) : null
    })) as (Booking & { shipment: Shipment | null })[];
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
  }
};
