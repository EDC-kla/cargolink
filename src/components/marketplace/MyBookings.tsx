import { useEffect, useState } from "react";
import { bookingService } from "@/services/bookingService";
import { toast } from "@/hooks/use-toast";
import BookingsList from "./BookingsList";
import { Booking, Shipment } from "@/types/database.types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const MyBookings = () => {
  const { data: bookings, isLoading, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          shipment:shipments (*)
        `);
      
      if (error) throw error;
      
      // Transform the data to match our types
      return data.map((booking: any) => ({
        ...booking,
        cargo_dimensions: booking.cargo_dimensions ? {
          length: booking.cargo_dimensions.length || 0,
          width: booking.cargo_dimensions.width || 0,
          height: booking.cargo_dimensions.height || 0,
          weight: booking.cargo_dimensions.weight || 0,
          weight_unit: booking.cargo_dimensions.weight_unit || 'kg',
          dimension_unit: booking.cargo_dimensions.dimension_unit || 'm'
        } : {
          length: 0,
          width: 0,
          height: 0,
          weight: 0,
          weight_unit: 'kg',
          dimension_unit: 'm'
        }
      })) as (Booking & { shipment: Shipment | null })[];
    }
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading your bookings...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading bookings: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <BookingsList bookings={bookings || []} />
    </div>
  );
};

export default MyBookings;