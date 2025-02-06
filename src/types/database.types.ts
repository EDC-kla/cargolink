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
