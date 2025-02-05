export type Shipment = {
  id: string;
  origin: string;
  destination: string;
  departure_date: string;
  available_space: number;
  price_per_cbm: number;
  status: string | null;
  created_at: string;
  created_by: string | null;
  transport_mode: string;
  container_type: string | null;
  transit_time_days: number | null;
  cargo_restrictions: string[] | null;
  additional_services: string[] | null;
  customs_clearance: boolean | null;
  door_pickup: boolean | null;
  door_delivery: boolean | null;
  route_frequency: string | null;
  consolidation_service: boolean | null;
  min_booking_size: number | null;
  notes: string | null;
  featured: boolean | null;
  display_order: number | null;
  category: string | null;
  route_type: string | null;
  route_tags: string[] | null;
  preferred_cargo_types: string[] | null;
  stops: any[] | null; // Changed to any[] to accommodate different types in the stops array
};

export type Booking = {
  id: string;
  shipment_id: string | null;
  user_id: string | null;
  space_booked: number;
  status: string | null;
  created_at: string;
  cargo_type: string | null;
  cargo_value: number | null;
  cargo_description: string | null;
  special_handling: string[] | null;
  insurance_required: boolean | null;
  pickup_address: string | null;
  delivery_address: string | null;
  cargo_packaging_type: string | null;
  cargo_dimensions: {
    length: number;
    width: number;
    height: number;
    weight: number;
  } | null;
  hazmat_details: {
    class: string;
    un_number: string;
    proper_shipping_name: string;
  } | null;
  required_certificates: string[] | null;
  customs_broker: string | null;
  payment_terms: string | null;
  customs_declaration_number: string | null;
  estimated_delivery_date: string | null;
  actual_delivery_date: string | null;
  tracking_number: string | null;
  shipping_documents: {
    type: string;
    url: string;
  }[] | null;
  booking_notes: string | null;
  temperature_requirements: {
    min: number;
    max: number;
    unit: 'C' | 'F';
  } | null;
  shipment?: Shipment;
};

export type Profile = {
  id: string;
  company_name: string | null;
  contact_person: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
  company_type: string[] | null;
  services_offered: string[] | null;
  years_in_business: number | null;
  registration_number: string | null;
  service_regions: string[] | null;
  website: string | null;
  office_address: string | null;
  verified: boolean | null;
  onboarding_completed: boolean | null;
  onboarding_step: string | null;
};
