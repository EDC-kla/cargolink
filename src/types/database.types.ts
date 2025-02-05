export type ContainerSizeType = '20GP' | '40GP' | '40HC' | '45HC' | 'LCL';
export type IncotermType = 'EXW' | 'FCA' | 'FAS' | 'FOB' | 'CFR' | 'CIF' | 'CPT' | 'CIP' | 'DAP' | 'DPU' | 'DDP';

export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  departure_date: string;
  available_space: number;
  price_per_cbm: number;
  transport_mode: string;
  container_type: string | null;
  transit_time_days: number | null;
  customs_clearance: boolean;
  door_pickup: boolean;
  door_delivery: boolean;
  min_booking_size: number | null;
  status: string;
  additional_services: string[];
  cargo_restrictions: string[];
  consolidation_service: boolean;
  route_frequency: string | null;
  route_type: string;
  stops: string[];
  route_tags: string[];
  preferred_cargo_types: string[];
  featured: boolean;
  display_order: number;
  category: string;
  vessel_name?: string;
  voyage_number?: string;
  container_size?: ContainerSizeType;
  incoterms?: IncotermType;
  cutoff_date?: string;
  estimated_arrival?: string;
  port_of_loading?: string;
  port_of_discharge?: string;
  created_at: string;
  created_by?: string;
}

export interface BookingFormData {
  shipment_id: string;
  space_booked: number;
  cargo_type: string;
  cargo_description: string;
  cargo_value?: number;
  special_handling: string[];
  insurance_required: boolean;
  pickup_address: string;
  delivery_address: string;
  cargo_packaging_type: string;
  cargo_dimensions: {
    length: number;
    width: number;
    height: number;
    weight: number;
  };
  temperature_requirements?: {
    min: number;
    max: number;
    unit: string;
  };
  required_certificates: string[];
  customs_broker?: string;
  payment_terms: string;
  booking_notes?: string;
  incoterms?: IncotermType;
  container_size?: ContainerSizeType;
  bill_of_lading_number?: string;
  customs_status?: string;
  container_number?: string[];
}

export interface ShipmentDocument {
  id: string;
  shipment_id: string;
  document_type: string;
  document_number?: string;
  issue_date?: string;
  expiry_date?: string;
  status?: string;
  url?: string;
  created_at: string;
  created_by?: string;
}