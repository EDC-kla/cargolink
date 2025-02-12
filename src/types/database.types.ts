
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

// Base type for JSON objects
export type Json = 
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

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
  arrival_date: string;
  departure_date: string;
  stop_type: 'port' | 'terminal' | 'warehouse' | 'customs';
  notes?: string;
}

export interface EquipmentDetails {
  type: string;
  capacity: number;
  features: string[];
  maintenance_status?: string;
  last_inspection_date?: string;
}

export interface ServiceLevelAgreement {
  delivery_guarantee?: boolean;
  compensation_terms?: string;
  service_standards: string[];
  performance_metrics: Record<string, number>;
}

export interface LiabilityCoverage {
  coverage_amount: number;
  coverage_type: string;
  exclusions: string[];
  deductible?: number;
}

export interface ScheduleReliabilityMetrics {
  on_time_performance: number;
  delay_frequency: number;
  average_delay_hours?: number;
  historical_performance?: Record<string, number>;
}

export interface VesselTrackingInfo {
  vessel_id?: string;
  current_position?: { lat: number; lng: number };
  speed?: number;
  heading?: number;
  last_port?: string;
  next_port?: string;
}

export interface ServiceSchedule {
  departure_frequency: string;
  transit_times: Record<string, number>;
  key_milestones: Array<{ point: string; estimated_time: string }>;
}

export interface CarrierInsuranceInfo {
  provider: string;
  policy_number: string;
  coverage_amount: number;
  expiry_date: string;
  covered_risks: string[];
}

export interface CustomsComplianceInfo {
  customs_broker?: string;
  broker_license?: string;
  clearance_requirements: string[];
  documentation_status: Record<string, string>;
}

export interface TradeComplianceDetails {
  export_license_required: boolean;
  import_license_required: boolean;
  restricted_parties_status: string;
  trade_agreements: string[];
}

export interface PackagingSpecifications {
  type: string;
  material: string;
  dimensions: CargoDimensions;
  special_requirements: string[];
}

export interface RegulatoryRequirements {
  certificates_required: string[];
  compliance_status: Record<string, boolean>;
  regulatory_bodies: string[];
  expiry_dates: Record<string, string>;
}

export interface ExportControlDetails {
  classification: string;
  license_required: boolean;
  restrictions: string[];
  destination_requirements: Record<string, string>;
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
  max_piece_dimensions?: Json;
  hazmat_accepted?: boolean;
  temperature_controlled?: boolean;
  temperature_range?: Json;
  special_handling_options?: string[];
  required_cargo_docs?: string[];
  description?: string;
  carrier_notes?: string;
  cancellation_policy?: string;
  booking_deadline?: string;
  created_at?: string;
  created_by?: string;
  vessel_type?: string;
  equipment_details?: Json;
  service_level_agreement?: Json;
  carrier_certifications?: string[];
  liability_coverage?: Json;
  schedule_reliability_metrics?: Json;
  intermodal_services?: string[];
  vessel_tracking_info?: Json;
  service_schedule?: Json;
  carrier_insurance_info?: Json;
  equipment_specifications?: Json;
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
  booking_preferences?: Json;
  communication_preferences?: string[];
  cargo_packaging_type?: string;
  cargo_dimensions?: Json;
  hazmat_details?: Json;
  required_certificates?: string[];
  customs_broker?: string;
  payment_terms?: string;
  customs_declaration_number?: string;
  estimated_delivery_date?: string;
  actual_delivery_date?: string;
  tracking_number?: string;
  shipping_documents?: Json;
  booking_notes?: string;
  temperature_requirements?: Json;
  step_progress?: number;
  last_modified?: string;
  is_draft?: boolean;
  incoterms?: IncotermType;
  container_size?: ContainerSizeType;
  bill_of_lading_number?: string;
  customs_status?: string;
  container_number?: string[];
  insurance_value?: number;
  insurance_coverage?: Json;
  created_at?: string;
  shipper_certifications?: string[];
  shipping_history?: Json;
  cargo_classification_codes?: string[];
  handling_codes?: string[];
  dangerous_goods_class?: string;
  customs_compliance_info?: Json;
  trade_compliance_details?: Json;
  cargo_insurance_details?: Json;
  packaging_specifications?: Json;
  regulatory_requirements?: Json;
  export_control_details?: Json;
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
