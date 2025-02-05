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
  shipment?: Shipment;
};

export type Profile = {
  id: string;
  company_name: string | null;
  contact_person: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
};