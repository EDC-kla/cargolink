import { Booking } from "@/types/database.types";
import BookingsList from "./BookingsList";

interface MyBookingsProps {
  bookings: any[];
}

const MyBookings = ({ bookings }: MyBookingsProps) => {
  return (
    <div className="space-y-6">
      <BookingsList bookings={bookings} />
    </div>
  );
};

export default MyBookings;