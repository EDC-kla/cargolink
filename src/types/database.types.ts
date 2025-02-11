// Enums
export type TransportMode = 'sea' | 'air' | 'rail' | 'road';
export type ShipmentStatus = 'available' | 'booked' | 'in_transit' | 'completed' | 'cancelled';
export type BookingStatus = 'draft' | 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'documents_complete' | 'pending_documents';
export type CargoType = 'general' | 'hazardous' | 'perishable' | 'fragile' | 'valuable' | 'oversized' | 'temperature_controlled' | 'liquid_bulk' | 'dry_bulk' | 'vehicles' | 'livestock';
export type ContainerSizeType = '20GP' | '40GP' | '40HC' | '45HC' | 'LCL';
export type IncotermType = 'EXW' | 'FCA' | 'FAS' | 'FOB' | 'CFR' | 'CIF' | 'CPT' | 'CIP' | 'DAP' | 'DPU' | 'DDP';
export type SpecialHandlingType = 
  | 'lift_gate'
  | 'inside_delivery'
  | 'appointment_required'
  | 'notify_recipient'
  | 'signature_required'
  | 'handle_with_care'
  | 'keep_upright'
  | 'do_not_stack'
  | 'protect_from_heat'
  | 'protect_from_moisture';

// Interfaces for complex types
export interface CargoDimensions {
  length: number;
  width: number;
  height: number;
  weight: number;
  weight_unit?: 'kg' | 'lbs';
  dimension_unit?: 'm' | 'cm' | 'in' | 'ft';
}

export interface CargoTemperatureRequirements {
  min: number;
  max: number;
  unit: 'C' | 'F';
}

export interface HazmatDetails {
  class: string;
  un_number: string;
  proper_shipping_name: string;
}

export interface InsuranceCoverage {
  general_damage: boolean;
  theft: boolean;
  loss: boolean;
  temperature_deviation?: boolean;
  hazmat_incident?: boolean;
}

export interface RouteStop {
  location: string;
  arrival_date?: string;
  departure_date?: string;
  stop_type?: 'port' | 'terminal' | 'warehouse';
  notes?: string;
}

// Database JSON types
export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
export interface JsonObject {
  [key: string]: JsonValue;
}

// Main interfaces
export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  departure_date: string;
  available_space: number;
  price_per_cbm: number;
  transport_mode: TransportMode;
  container_type: string;
  transit_time_days: number;
  customs_clearance: boolean;
  door_pickup: boolean;
  door_delivery: boolean;
  min_booking_size: number;
  status: ShipmentStatus;
  additional_services: string[];
  cargo_restrictions: string[];
  consolidation_service: boolean;
  route_frequency?: string;
  route_tags: string[];
  route_type?: string;
  notes?: string;
  preferred_cargo_types: CargoType[];
  stops?: RouteStop[];
  featured?: boolean;
  display_order?: number;
  category?: string;
  vessel_name?: string;
  voyage_number?: string;
  container_size?: ContainerSizeType;
  incoterms?: IncotermType;
  cutoff_date?: string;
  estimated_arrival?: string;
  port_of_loading?: string;
  port_of_discharge?: string;
  accepted_cargo_types?: string[];
  max_piece_dimensions?: JsonObject;
  hazmat_accepted?: boolean;
  temperature_controlled?: boolean;
  temperature_range?: JsonObject;
  special_handling_options?: string[];
  required_cargo_docs?: string[];
  description?: string;
  carrier_notes?: string;
  cancellation_policy?: string;
  booking_deadline?: string;
  created_at?: string;
  created_by?: string;
}

export interface Booking {
  id: string;
  shipment_id?: string;
  user_id?: string;
  space_booked: number;
  status?: BookingStatus;
  cargo_type?: string;
  cargo_value?: number;
  cargo_description?: string;
  special_handling?: SpecialHandlingType[];
  insurance_required?: boolean;
  pickup_address?: string;
  delivery_address?: string;
  booking_preferences?: JsonObject;
  communication_preferences?: string[];
  cargo_packaging_type?: string;
  cargo_dimensions?: JsonObject;  // Changed from CargoDimensions to JsonObject
  hazmat_details?: JsonObject;  // Changed from HazmatDetails to JsonObject
  required_certificates?: string[];
  customs_broker?: string;
  payment_terms?: string;
  customs_declaration_number?: string;
  estimated_delivery_date?: string;
  actual_delivery_date?: string;
  tracking_number?: string;
  shipping_documents?: JsonObject;
  booking_notes?: string;
  temperature_requirements?: JsonObject;  // Changed from CargoTemperatureRequirements to JsonObject
  step_progress?: number;
  last_modified?: string;
  is_draft?: boolean;
  incoterms?: IncotermType;
  container_size?: ContainerSizeType;
  bill_of_lading_number?: string;
  customs_status?: string;
  container_number?: string[];
  insurance_value?: number;
  insurance_coverage?: JsonObject;  // Changed from InsuranceCoverage to JsonObject
  created_at?: string;
}

export interface Profile {
  id: string;
  company_name?: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  company_type?: string[];
  services_offered?: string[];
  years_in_business?: number;
  registration_number?: string;
  service_regions?: string[];
  website?: string;
  office_address?: string;
  verified?: boolean;
  onboarding_completed?: boolean;
  onboarding_step?: string;
  created_at?: string;
}
