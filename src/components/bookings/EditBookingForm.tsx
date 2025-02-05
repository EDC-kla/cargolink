import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { bookingService } from "@/services/api";
import { supabase } from "@/integrations/supabase/client";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import BookingSpaceInput from "./BookingSpaceInput";
import PriceCalculation from "./PriceCalculation";
import { BookingFormData } from "./wizard/BookingWizard";
import { Booking, Shipment, BookingStatus, RouteStop } from "@/types/database.types";

const EditBookingForm = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [spaceRequired, setSpaceRequired] = useState<number>(0);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        if (!bookingId) {
          throw new Error("Booking ID is required");
        }

        const { data: bookingData, error: bookingError } = await supabase
          .from('bookings')
          .select(`
            *,
            shipment:shipments (*)
          `)
          .eq('id', bookingId)
          .maybeSingle();

        if (bookingError) throw bookingError;
        if (!bookingData) throw new Error("Booking not found");
        
        const transformedBooking = {
          ...bookingData,
          cargo_dimensions: typeof bookingData.cargo_dimensions === 'string' 
            ? JSON.parse(bookingData.cargo_dimensions)
            : bookingData.cargo_dimensions || { length: 0, width: 0, height: 0, weight: 0 },
          temperature_requirements: bookingData.temperature_requirements
            ? typeof bookingData.temperature_requirements === 'string'
              ? JSON.parse(bookingData.temperature_requirements)
              : bookingData.temperature_requirements
            : null,
          hazmat_details: bookingData.hazmat_details
            ? typeof bookingData.hazmat_details === 'string'
              ? JSON.parse(bookingData.hazmat_details)
              : bookingData.hazmat_details
            : null,
          shipping_documents: bookingData.shipping_documents
            ? typeof bookingData.shipping_documents === 'string'
              ? JSON.parse(bookingData.shipping_documents)
              : bookingData.shipping_documents || []
            : [],
          special_handling: bookingData.special_handling || [],
          required_certificates: bookingData.required_certificates || [],
          status: bookingData.status as BookingStatus,
        } as Booking;

        const transformedShipment = bookingData.shipment ? {
          ...bookingData.shipment,
          stops: Array.isArray(bookingData.shipment.stops)
            ? bookingData.shipment.stops.map((stop: any) => ({
                location: stop.location || '',
                stop_type: stop.stop_type || 'port',
                arrival_date: stop.arrival_date,
                departure_date: stop.departure_date,
                notes: stop.notes
              } as RouteStop))
            : [] as RouteStop[]
        } as Shipment : null;
        
        setBooking(transformedBooking);
        setShipment(transformedShipment);
        setSpaceRequired(bookingData.space_booked);
      } catch (error: any) {
        setError(error.message);
        toast({
          title: "Error loading booking",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBookingData();
    }
  }, [bookingId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking || !shipment) return;

    try {
      setLoading(true);
      const updatedBookingData: Partial<BookingFormData> & { 
        status: BookingStatus;
        is_draft: boolean;
      } = {
        space_booked: spaceRequired,
        status: "pending" as BookingStatus,
        is_draft: false,
      };

      await bookingService.updateBooking(booking.id, updatedBookingData);

      toast({
        title: "Booking updated",
        description: "Your booking has been updated successfully.",
      });
      navigate("/marketplace/bookings");
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAsDraft = async () => {
    if (!booking) return;

    try {
      setLoading(true);
      const updatedBookingData: Partial<BookingFormData> & {
        status: BookingStatus;
        is_draft: boolean;
      } = {
        space_booked: spaceRequired,
        status: "draft" as BookingStatus,
        is_draft: true,
      };

      await bookingService.updateBooking(booking.id, updatedBookingData);

      toast({
        title: "Draft saved",
        description: "Your booking has been saved as a draft.",
      });
      navigate("/marketplace/bookings");
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!booking || !shipment) {
    return <div>Booking not found</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <BookingSpaceInput
        spaceRequired={spaceRequired}
        availableSpace={shipment.available_space + booking.space_booked}
        onChange={setSpaceRequired}
        disabled={loading}
      />

      <PriceCalculation
        pricePerCbm={shipment.price_per_cbm}
        totalPrice={spaceRequired * shipment.price_per_cbm}
      />

      <div className="flex justify-end space-x-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleSaveAsDraft}
          disabled={loading}
        >
          Save as Draft
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => navigate("/marketplace/bookings")}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Booking"}
        </Button>
      </div>
    </form>
  );
};

export default EditBookingForm;