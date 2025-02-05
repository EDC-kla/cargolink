export type Shipment = {
  id: string;
  origin: string;
  destination: string;
  departure_date: string;
  available_space: number;
  price_per_cbm: number;
  status: 'available' | 'full' | 'in_transit' | 'delivered';
  created_at: string;
  created_by: string;
};

export type Booking = {
  id: string;
  shipment_id: string;
  user_id: string;
  space_booked: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
};

export type Profile = {
  id: string;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  country: string;
  created_at: string;
};