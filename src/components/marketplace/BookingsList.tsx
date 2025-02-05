import { Booking } from "@/types/database.types";
import { Badge } from "@/components/ui/badge";
import { Calendar, Package, MapPin, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface BookingsListProps {
  bookings: any[];
}

const BookingsList = ({ bookings }: BookingsListProps) => {
  const navigate = useNavigate();

  if (!bookings?.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        You haven't made any bookings yet.
      </div>
    );
  }

  const getBadgeVariant = (status: string, isDraft: boolean) => {
    if (isDraft) return 'secondary';
    switch (status) {
      case 'confirmed':
        return 'default';
      case 'pending':
        return 'secondary';
      default:
        return 'destructive';
    }
  };

  const handleContinueBooking = (booking: Booking) => {
    navigate(`/bookings/${booking.id}/edit`);
  };

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
            
            <div className="flex flex-col items-end space-y-2">
              <Badge 
                variant={getBadgeVariant(booking.status, booking.is_draft)}
                className="capitalize"
              >
                {booking.is_draft ? 'Draft' : booking.status}
              </Badge>

              {booking.is_draft && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleContinueBooking(booking)}
                  className="flex items-center space-x-1"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Continue Editing
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingsList;