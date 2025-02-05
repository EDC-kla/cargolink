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
  notes: string | null;
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

export interface Booking {
  id: string;
  shipment_id: string;
  user_id: string;
  space_booked: number;
  status: string;
  created_at: string;
  cargo_type: string | null;
  cargo_value: number | null;
  cargo_description: string | null;
  special_handling: string[];
  insurance_required: boolean;
  pickup_address: string | null;
  delivery_address: string | null;
  booking_preferences: any;
  communication_preferences: string[];
  cargo_packaging_type: string | null;
  cargo_dimensions: {
    length: number;
    width: number;
    height: number;
    weight: number;
  };
  hazmat_details: any;
  required_certificates: string[];
  customs_broker: string | null;
  payment_terms: string | null;
  customs_declaration_number: string | null;
  estimated_delivery_date: string | null;
  actual_delivery_date: string | null;
  tracking_number: string | null;
  shipping_documents: any;
  booking_notes: string | null;
  temperature_requirements: {
    min: number;
    max: number;
    unit: string;
  } | null;
  step_progress: number;
  last_modified: string;
  is_draft: boolean;
  incoterms?: IncotermType;
  container_size?: ContainerSizeType;
  bill_of_lading_number?: string;
  customs_status?: string;
  container_number?: string[];
}

export interface Profile {
  id: string;
  company_name: string | null;
  contact_person: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
  company_type: string[];
  services_offered: string[];
  years_in_business: number | null;
  registration_number: string | null;
  service_regions: string[];
  website: string | null;
  office_address: string | null;
  verified: boolean;
  onboarding_completed: boolean;
  onboarding_step: string;
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