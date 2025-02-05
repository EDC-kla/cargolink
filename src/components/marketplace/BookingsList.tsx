import { Booking } from "@/types/database.types";

interface BookingsListProps {
  bookings: (Booking & { shipment: any })[] | undefined;
}

const BookingsList = ({ bookings }: BookingsListProps) => {
  if (!bookings?.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        You haven't made any bookings yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">
                {booking.shipment.origin} → {booking.shipment.destination}
              </h3>
              <p className="text-gray-500">
                Departure: {new Date(booking.shipment.departure_date).toLocaleDateString()}
              </p>
              <p className="text-gray-500">
                Space Booked: {booking.space_booked} CBM
              </p>
              <p className="text-gray-500">
                Total Cost: ${booking.space_booked * booking.shipment.price_per_cbm}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm capitalize ${
              booking.status === 'confirmed' 
                ? 'bg-green-100 text-green-800'
                : booking.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {booking.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingsList;