import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { shipmentService } from "@/services/api";
import BookingForm from "@/components/bookings/BookingForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const BookingPage = () => {
  const { shipmentId } = useParams();
  const navigate = useNavigate();

  const { data: shipment, isLoading, error } = useQuery({
    queryKey: ['shipment', shipmentId],
    queryFn: () => shipmentService.getShipment(shipmentId!),
    enabled: !!shipmentId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !shipment) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error ? "Failed to load shipment details" : "Shipment not found"}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Book Space</h2>
      <BookingForm
        shipmentId={shipment.id}
        availableSpace={shipment.available_space}
        pricePerCbm={shipment.price_per_cbm}
        onClose={() => navigate("/marketplace")}
      />
    </div>
  );
};

export default BookingPage;