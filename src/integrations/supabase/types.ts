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
          booking_preferences: Json | null
          cargo_description: string | null
          cargo_type: string | null
          cargo_value: number | null
          communication_preferences: string[] | null
          created_at: string
          delivery_address: string | null
          id: string
          insurance_required: boolean | null
          pickup_address: string | null
          shipment_id: string | null
          space_booked: number
          special_handling: string[] | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          booking_preferences?: Json | null
          cargo_description?: string | null
          cargo_type?: string | null
          cargo_value?: number | null
          communication_preferences?: string[] | null
          created_at?: string
          delivery_address?: string | null
          id?: string
          insurance_required?: boolean | null
          pickup_address?: string | null
          shipment_id?: string | null
          space_booked: number
          special_handling?: string[] | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          booking_preferences?: Json | null
          cargo_description?: string | null
          cargo_type?: string | null
          cargo_value?: number | null
          communication_preferences?: string[] | null
          created_at?: string
          delivery_address?: string | null
          id?: string
          insurance_required?: boolean | null
          pickup_address?: string | null
          shipment_id?: string | null
          space_booked?: number
          special_handling?: string[] | null
          status?: string | null
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
      shipments: {
        Row: {
          additional_services: string[] | null
          available_space: number
          cargo_restrictions: string[] | null
          consolidation_service: boolean | null
          container_type: string | null
          created_at: string
          created_by: string | null
          customs_clearance: boolean | null
          departure_date: string
          destination: string
          door_delivery: boolean | null
          door_pickup: boolean | null
          id: string
          min_booking_size: number | null
          notes: string | null
          origin: string
          preferred_cargo_types: string[] | null
          price_per_cbm: number
          route_frequency: string | null
          route_tags: string[] | null
          route_type: string | null
          status: string | null
          stops: Json[] | null
          transit_time_days: number | null
          transport_mode: string
        }
        Insert: {
          additional_services?: string[] | null
          available_space: number
          cargo_restrictions?: string[] | null
          consolidation_service?: boolean | null
          container_type?: string | null
          created_at?: string
          created_by?: string | null
          customs_clearance?: boolean | null
          departure_date: string
          destination: string
          door_delivery?: boolean | null
          door_pickup?: boolean | null
          id?: string
          min_booking_size?: number | null
          notes?: string | null
          origin: string
          preferred_cargo_types?: string[] | null
          price_per_cbm: number
          route_frequency?: string | null
          route_tags?: string[] | null
          route_type?: string | null
          status?: string | null
          stops?: Json[] | null
          transit_time_days?: number | null
          transport_mode?: string
        }
        Update: {
          additional_services?: string[] | null
          available_space?: number
          cargo_restrictions?: string[] | null
          consolidation_service?: boolean | null
          container_type?: string | null
          created_at?: string
          created_by?: string | null
          customs_clearance?: boolean | null
          departure_date?: string
          destination?: string
          door_delivery?: boolean | null
          door_pickup?: boolean | null
          id?: string
          min_booking_size?: number | null
          notes?: string | null
          origin?: string
          preferred_cargo_types?: string[] | null
          price_per_cbm?: number
          route_frequency?: string | null
          route_tags?: string[] | null
          route_type?: string | null
          status?: string | null
          stops?: Json[] | null
          transit_time_days?: number | null
          transport_mode?: string
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
