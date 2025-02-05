import { Booking } from "@/types/database.types";
import BookingsList from "./BookingsList";
import { useEffect, useState } from "react";
import { shipmentService } from "@/services/api";
import { toast } from "@/hooks/use-toast";

const MyBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userBookings = await shipmentService.listUserBookings();
        setBookings(userBookings);
      } catch (error: any) {
        toast({
          title: "Error loading bookings",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading your bookings...</div>;
  }

  return (
    <div className="space-y-6">
      <BookingsList bookings={bookings} />
    </div>
  );
};

export default MyBookings;