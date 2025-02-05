import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { shipmentService } from "@/services/api";
import BookingWizard from "@/components/bookings/wizard/BookingWizard";
import { supabase } from "@/integrations/supabase/client";

const BookingPage = () => {
  const { shipmentId } = useParams();
  const navigate = useNavigate();

  const { data: shipment, isLoading } = useQuery({
    queryKey: ['shipment', shipmentId],
    queryFn: () => shipmentService.getShipment(shipmentId!),
    enabled: !!shipmentId,
  });

  const handleBookingStart = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth", { state: { returnTo: `/marketplace/book/${shipmentId}` } });
      return;
    }
  };

  if (isLoading || !shipment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Book Space</h1>
        <BookingWizard
          shipment={shipment}
          onComplete={() => navigate("/marketplace/bookings")}
          onCancel={() => navigate("/marketplace")}
          onAuthRequired={handleBookingStart}
        />
      </div>
    </div>
  );
};

export default BookingPage;