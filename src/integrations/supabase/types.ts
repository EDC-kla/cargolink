export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          actual_delivery_date: string | null
          bill_of_lading_number: string | null
          booking_notes: string | null
          booking_preferences: Json | null
          cargo_description: string | null
          cargo_dimensions: Json | null
          cargo_packaging_type: string | null
          cargo_type: string | null
          cargo_value: number | null
          communication_preferences: string[] | null
          container_number: string[] | null
          container_size:
            | Database["public"]["Enums"]["container_size_type"]
            | null
          created_at: string
          customs_broker: string | null
          customs_declaration_number: string | null
          customs_status: string | null
          delivery_address: string | null
          estimated_delivery_date: string | null
          hazmat_details: Json | null
          id: string
          incoterms: Database["public"]["Enums"]["incoterm_type"] | null
          insurance_required: boolean | null
          is_draft: boolean | null
          last_modified: string | null
          payment_terms: string | null
          pickup_address: string | null
          required_certificates: string[] | null
          shipment_id: string | null
          shipping_documents: Json | null
          space_booked: number
          special_handling: string[] | null
          status: string | null
          step_progress: number | null
          temperature_requirements: Json | null
          tracking_number: string | null
          user_id: string | null
        }
        Insert: {
          actual_delivery_date?: string | null
          bill_of_lading_number?: string | null
          booking_notes?: string | null
          booking_preferences?: Json | null
          cargo_description?: string | null
          cargo_dimensions?: Json | null
          cargo_packaging_type?: string | null
          cargo_type?: string | null
          cargo_value?: number | null
          communication_preferences?: string[] | null
          container_number?: string[] | null
          container_size?:
            | Database["public"]["Enums"]["container_size_type"]
            | null
          created_at?: string
          customs_broker?: string | null
          customs_declaration_number?: string | null
          customs_status?: string | null
          delivery_address?: string | null
          estimated_delivery_date?: string | null
          hazmat_details?: Json | null
          id?: string
          incoterms?: Database["public"]["Enums"]["incoterm_type"] | null
          insurance_required?: boolean | null
          is_draft?: boolean | null
          last_modified?: string | null
          payment_terms?: string | null
          pickup_address?: string | null
          required_certificates?: string[] | null
          shipment_id?: string | null
          shipping_documents?: Json | null
          space_booked: number
          special_handling?: string[] | null
          status?: string | null
          step_progress?: number | null
          temperature_requirements?: Json | null
          tracking_number?: string | null
          user_id?: string | null
        }
        Update: {
          actual_delivery_date?: string | null
          bill_of_lading_number?: string | null
          booking_notes?: string | null
          booking_preferences?: Json | null
          cargo_description?: string | null
          cargo_dimensions?: Json | null
          cargo_packaging_type?: string | null
          cargo_type?: string | null
          cargo_value?: number | null
          communication_preferences?: string[] | null
          container_number?: string[] | null
          container_size?:
            | Database["public"]["Enums"]["container_size_type"]
            | null
          created_at?: string
          customs_broker?: string | null
          customs_declaration_number?: string | null
          customs_status?: string | null
          delivery_address?: string | null
          estimated_delivery_date?: string | null
          hazmat_details?: Json | null
          id?: string
          incoterms?: Database["public"]["Enums"]["incoterm_type"] | null
          insurance_required?: boolean | null
          is_draft?: boolean | null
          last_modified?: string | null
          payment_terms?: string | null
          pickup_address?: string | null
          required_certificates?: string[] | null
          shipment_id?: string | null
          shipping_documents?: Json | null
          space_booked?: number
          special_handling?: string[] | null
          status?: string | null
          step_progress?: number | null
          temperature_requirements?: Json | null
          tracking_number?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          company_name: string | null
          company_type: string[] | null
          contact_person: string | null
          created_at: string
          email: string | null
          id: string
          office_address: string | null
          onboarding_completed: boolean | null
          onboarding_step: string | null
          phone: string | null
          registration_number: string | null
          service_regions: string[] | null
          services_offered: string[] | null
          verified: boolean | null
          website: string | null
          years_in_business: number | null
        }
        Insert: {
          company_name?: string | null
          company_type?: string[] | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id: string
          office_address?: string | null
          onboarding_completed?: boolean | null
          onboarding_step?: string | null
          phone?: string | null
          registration_number?: string | null
          service_regions?: string[] | null
          services_offered?: string[] | null
          verified?: boolean | null
          website?: string | null
          years_in_business?: number | null
        }
        Update: {
          company_name?: string | null
          company_type?: string[] | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          office_address?: string | null
          onboarding_completed?: boolean | null
          onboarding_step?: string | null
          phone?: string | null
          registration_number?: string | null
          service_regions?: string[] | null
          services_offered?: string[] | null
          verified?: boolean | null
          website?: string | null
          years_in_business?: number | null
        }
        Relationships: []
      }
      saved_searches: {
        Row: {
          cargo_type: string[] | null
          created_at: string
          departure_date_range: unknown | null
          destination: string
          id: string
          origin: string
          other_preferences: Json | null
          space_required: number | null
          user_id: string
        }
        Insert: {
          cargo_type?: string[] | null
          created_at?: string
          departure_date_range?: unknown | null
          destination: string
          id?: string
          origin: string
          other_preferences?: Json | null
          space_required?: number | null
          user_id: string
        }
        Update: {
          cargo_type?: string[] | null
          created_at?: string
          departure_date_range?: unknown | null
          destination?: string
          id?: string
          origin?: string
          other_preferences?: Json | null
          space_required?: number | null
          user_id?: string
        }
        Relationships: []
      }
      shipment_documents: {
        Row: {
          created_at: string | null
          created_by: string | null
          document_number: string | null
          document_type: string
          expiry_date: string | null
          id: string
          issue_date: string | null
          shipment_id: string | null
          status: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          document_number?: string | null
          document_type: string
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          shipment_id?: string | null
          status?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          document_number?: string | null
          document_type?: string
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          shipment_id?: string | null
          status?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shipment_documents_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      shipments: {
        Row: {
          accepted_cargo_types: string[] | null
          additional_services: string[] | null
          available_space: number
          cargo_restrictions: string[] | null
          category: string | null
          consolidation_service: boolean | null
          container_size:
            | Database["public"]["Enums"]["container_size_type"]
            | null
          container_type: string | null
          created_at: string
          created_by: string | null
          customs_clearance: boolean | null
          cutoff_date: string | null
          departure_date: string
          destination: string
          display_order: number | null
          door_delivery: boolean | null
          door_pickup: boolean | null
          estimated_arrival: string | null
          featured: boolean | null
          hazmat_accepted: boolean | null
          id: string
          incoterms: Database["public"]["Enums"]["incoterm_type"] | null
          max_piece_dimensions: Json | null
          min_booking_size: number | null
          notes: string | null
          origin: string
          port_of_discharge: string | null
          port_of_loading: string | null
          preferred_cargo_types: string[] | null
          price_per_cbm: number
          required_cargo_docs: string[] | null
          route_frequency: string | null
          route_tags: string[] | null
          route_type: string | null
          special_handling_options: string[] | null
          status: string | null
          stops: Json[] | null
          temperature_controlled: boolean | null
          temperature_range: Json | null
          transit_time_days: number | null
          transport_mode: string
          vessel_name: string | null
          voyage_number: string | null
        }
        Insert: {
          accepted_cargo_types?: string[] | null
          additional_services?: string[] | null
          available_space: number
          cargo_restrictions?: string[] | null
          category?: string | null
          consolidation_service?: boolean | null
          container_size?:
            | Database["public"]["Enums"]["container_size_type"]
            | null
          container_type?: string | null
          created_at?: string
          created_by?: string | null
          customs_clearance?: boolean | null
          cutoff_date?: string | null
          departure_date: string
          destination: string
          display_order?: number | null
          door_delivery?: boolean | null
          door_pickup?: boolean | null
          estimated_arrival?: string | null
          featured?: boolean | null
          hazmat_accepted?: boolean | null
          id?: string
          incoterms?: Database["public"]["Enums"]["incoterm_type"] | null
          max_piece_dimensions?: Json | null
          min_booking_size?: number | null
          notes?: string | null
          origin: string
          port_of_discharge?: string | null
          port_of_loading?: string | null
          preferred_cargo_types?: string[] | null
          price_per_cbm: number
          required_cargo_docs?: string[] | null
          route_frequency?: string | null
          route_tags?: string[] | null
          route_type?: string | null
          special_handling_options?: string[] | null
          status?: string | null
          stops?: Json[] | null
          temperature_controlled?: boolean | null
          temperature_range?: Json | null
          transit_time_days?: number | null
          transport_mode?: string
          vessel_name?: string | null
          voyage_number?: string | null
        }
        Update: {
          accepted_cargo_types?: string[] | null
          additional_services?: string[] | null
          available_space?: number
          cargo_restrictions?: string[] | null
          category?: string | null
          consolidation_service?: boolean | null
          container_size?:
            | Database["public"]["Enums"]["container_size_type"]
            | null
          container_type?: string | null
          created_at?: string
          created_by?: string | null
          customs_clearance?: boolean | null
          cutoff_date?: string | null
          departure_date?: string
          destination?: string
          display_order?: number | null
          door_delivery?: boolean | null
          door_pickup?: boolean | null
          estimated_arrival?: string | null
          featured?: boolean | null
          hazmat_accepted?: boolean | null
          id?: string
          incoterms?: Database["public"]["Enums"]["incoterm_type"] | null
          max_piece_dimensions?: Json | null
          min_booking_size?: number | null
          notes?: string | null
          origin?: string
          port_of_discharge?: string | null
          port_of_loading?: string | null
          preferred_cargo_types?: string[] | null
          price_per_cbm?: number
          required_cargo_docs?: string[] | null
          route_frequency?: string | null
          route_tags?: string[] | null
          route_type?: string | null
          special_handling_options?: string[] | null
          status?: string | null
          stops?: Json[] | null
          temperature_controlled?: boolean | null
          temperature_range?: Json | null
          transit_time_days?: number | null
          transport_mode?: string
          vessel_name?: string | null
          voyage_number?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "buyer" | "seller" | "admin"
      cargo_type:
        | "general"
        | "hazardous"
        | "perishable"
        | "fragile"
        | "valuable"
        | "oversized"
        | "temperature_controlled"
        | "liquid_bulk"
        | "dry_bulk"
        | "vehicles"
        | "livestock"
      container_size_type: "20GP" | "40GP" | "40HC" | "45HC" | "LCL"
      document_type:
        | "bill_of_lading"
        | "commercial_invoice"
        | "packing_list"
        | "certificate_of_origin"
        | "dangerous_goods_declaration"
        | "phytosanitary_certificate"
        | "health_certificate"
        | "export_license"
        | "import_license"
        | "insurance_certificate"
        | "inspection_certificate"
      incoterm_type:
        | "EXW"
        | "FCA"
        | "FAS"
        | "FOB"
        | "CFR"
        | "CIF"
        | "CPT"
        | "CIP"
        | "DAP"
        | "DPU"
        | "DDP"
      special_handling_type:
        | "lift_gate"
        | "inside_delivery"
        | "appointment_required"
        | "notify_recipient"
        | "signature_required"
        | "handle_with_care"
        | "keep_upright"
        | "do_not_stack"
        | "protect_from_heat"
        | "protect_from_moisture"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
