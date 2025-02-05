import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { shipmentService } from "@/services/api";
import AvailableShipments from "@/components/marketplace/AvailableShipments";
import MyShipments from "@/components/marketplace/MyShipments";
import MyBookings from "@/components/marketplace/MyBookings";
import ShipmentsNav from "@/components/marketplace/ShipmentsNav";
import EditBookingForm from "@/components/bookings/EditBookingForm";
import BookingForm from "@/components/bookings/BookingForm";

const BookingRoute = () => {
  const { shipmentId } = useParams();
  const navigate = useNavigate();
  
  const { data: shipment } = useQuery({
    queryKey: ['shipment', shipmentId],
    queryFn: () => shipmentService.getShipment(shipmentId || ''),
    enabled: !!shipmentId,
  });

  if (!shipment) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">Loading shipment details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <BookingForm
        shipmentId={shipmentId || ''}
        availableSpace={shipment.available_space}
        pricePerCbm={shipment.price_per_cbm}
        onClose={() => navigate('/marketplace')}
      />
    </div>
  );
};

const Marketplace = () => {
  const navigate = useNavigate();

  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Marketplace</h1>
        <ShipmentsNav />
      </div>

      <div className="bg-background rounded-lg shadow">
        <div className="p-6">
          <Routes>
            <Route 
              path="/" 
              element={<AvailableShipments />} 
            />
            <Route 
              path="/my-shipments" 
              element={
                <MyShipments 
                  userId={userData?.user?.id}
                />
              } 
            />
            <Route 
              path="/bookings" 
              element={<MyBookings />} 
            />
            <Route
              path="/bookings/:bookingId/edit"
              element={<EditBookingForm />}
            />
            <Route
              path="/book/:shipmentId"
              element={<BookingRoute />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;