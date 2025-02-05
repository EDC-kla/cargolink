
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
