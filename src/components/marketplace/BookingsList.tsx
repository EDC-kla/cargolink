import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Booking } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit, Trash } from "lucide-react";

const BookingsList = () => {
  const navigate = useNavigate();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*, shipment:shipments(*)");
      
      if (error) throw error;
      return data as Booking[];
    },
  });

  const handleDeleteBooking = async (bookingId: string) => {
    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", bookingId);

    if (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const handleContinueBooking = (booking: Booking) => {
    navigate(`/bookings/${booking.id}/edit`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Bookings</h2>
      {isLoading ? (
        <p>Loading bookings...</p>
      ) : bookings && bookings.length > 0 ? (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <Card key={booking.id} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Booking #{booking.id.slice(0, 8)}</h3>
                  <p className="text-sm text-gray-600">
                    Space Booked: {booking.space_booked} CBM
                  </p>
                  <p className="text-sm text-gray-600">
                    Status: {booking.status}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleContinueBooking(booking)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteBooking(booking.id)}
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default BookingsList;