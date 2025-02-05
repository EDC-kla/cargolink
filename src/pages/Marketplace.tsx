import { useQuery } from "@tanstack/react-query";
import { shipmentService } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Package, Truck, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import BookingForm from "@/components/BookingForm";
import CreateShipmentForm from "@/components/CreateShipmentForm";
import { useState } from "react";
import { Shipment } from "@/types/database.types";
import { supabase } from "@/integrations/supabase/client";

const Marketplace = () => {
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const { data: allShipments, isLoading: isLoadingAll, error: errorAll, refetch: refetchAll } = useQuery({
    queryKey: ['shipments'],
    queryFn: shipmentService.listShipments,
  });

  const { data: userShipments, isLoading: isLoadingUser, error: errorUser } = useQuery({
    queryKey: ['user-shipments'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      const { data, error } = await supabase
        .from('shipments')
        .select('*')
        .eq('created_by', user.id);
      if (error) throw error;
      return data;
    },
  });

  const { data: userBookings, isLoading: isLoadingBookings, error: errorBookings } = useQuery({
    queryKey: ['user-bookings'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          shipment:shipments (*)
        `)
        .eq('user_id', user.id);
      if (error) throw error;
      return data;
    },
  });

  if (isLoadingAll || isLoadingUser || isLoadingBookings) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (errorAll || errorUser || errorBookings) {
    toast({
      title: "Error",
      description: "Failed to load data. Please try again later.",
      variant: "destructive",
    });
    return null;
  }

  const renderShipmentCard = (shipment: Shipment, showBookButton = true) => (
    <div
      key={shipment.id}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-secondary" />
          <div>
            <p className="text-sm text-gray-500">Route</p>
            <p className="font-medium text-primary">
              {shipment.origin} → {shipment.destination}
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600">
            {new Date(shipment.departure_date).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Package className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600">
            {shipment.available_space} CBM available
          </span>
        </div>
        <div className="text-lg font-semibold text-secondary">
          ${shipment.price_per_cbm}/CBM
        </div>
      </div>

      {showBookButton && (
        <Button 
          className="w-full bg-primary hover:bg-primary/90"
          onClick={() => setSelectedShipment(shipment)}
        >
          Book Space
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Cargo Buddy Bridge</h1>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setShowCreateForm(true)}
          >
            <Plus className="h-4 w-4" />
            Post a Shipment
          </Button>
        </div>

        <Tabs defaultValue="marketplace" className="space-y-6">
          <TabsList>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="my-shipments">My Shipments</TabsTrigger>
            <TabsTrigger value="my-bookings">My Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allShipments?.map((shipment) => renderShipmentCard(shipment))}
          </TabsContent>

          <TabsContent value="my-shipments" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userShipments?.map((shipment) => renderShipmentCard(shipment, false))}
            {userShipments?.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">
                You haven't created any shipments yet.
              </div>
            )}
          </TabsContent>

          <TabsContent value="my-bookings">
            <div className="space-y-4">
              {userBookings?.map((booking) => (
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
              {userBookings?.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  You haven't made any bookings yet.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <Dialog open={!!selectedShipment} onOpenChange={() => setSelectedShipment(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book Shipping Space</DialogTitle>
            </DialogHeader>
            {selectedShipment && (
              <BookingForm
                shipmentId={selectedShipment.id}
                availableSpace={selectedShipment.available_space}
                pricePerCbm={selectedShipment.price_per_cbm}
                onClose={() => {
                  setSelectedShipment(null);
                  refetchAll();
                }}
              />
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Shipment</DialogTitle>
            </DialogHeader>
            <CreateShipmentForm
              onClose={() => {
                setShowCreateForm(false);
                refetchAll();
              }}
            />
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Marketplace;