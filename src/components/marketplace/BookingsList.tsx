import { Booking } from "@/types/database.types";
import { Badge } from "@/components/ui/badge";
import { Calendar, Package, MapPin } from "lucide-react";

interface BookingsListProps {
  bookings: any[];
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
        <div 
          key={booking.id} 
          className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-900 font-medium">
                  {booking.shipment.origin} → {booking.shipment.destination}
                </span>
              </div>
              
              <div className="space-y-1 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(booking.shipment.departure_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4" />
                  <span>{booking.space_booked} CBM booked</span>
                </div>
              </div>
            </div>
            
            <Badge 
              variant={
                booking.status === 'confirmed' 
                  ? 'success' 
                  : booking.status === 'pending' 
                    ? 'warning' 
                    : 'destructive'
              }
              className="capitalize"
            >
              {booking.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingsList;