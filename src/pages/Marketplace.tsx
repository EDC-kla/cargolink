import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { shipmentService } from "@/services/api";
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
import { supabase } from "@/integrations/supabase/client";
import { Shipment } from "@/types/database.types";
import BookingForm from "@/components/BookingForm";
import CreateShipmentWizard from "@/components/shipments/wizard/CreateShipmentWizard";
import MarketplaceHeader from "@/components/marketplace/MarketplaceHeader";
import ShipmentCard from "@/components/marketplace/ShipmentCard";
import BookingsList from "@/components/marketplace/BookingsList";

const Marketplace = () => {
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const { data: allShipments, isLoading: isLoadingAll, error: errorAll, refetch: refetchAll } = useQuery({
    queryKey: ['shipments'],
    queryFn: shipmentService.listShipments,
  });

  const { data: userShipments, isLoading: isLoadingUser } = useQuery({
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

  const { data: userBookings, isLoading: isLoadingBookings } = useQuery({
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <MarketplaceHeader onCreateShipment={() => setShowCreateForm(true)} />

        <Tabs defaultValue="marketplace" className="space-y-6">
          <TabsList>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="my-shipments">My Shipments</TabsTrigger>
            <TabsTrigger value="my-bookings">My Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allShipments?.map((shipment) => (
              <ShipmentCard 
                key={shipment.id}
                shipment={shipment}
                onBookSpace={setSelectedShipment}
              />
            ))}
          </TabsContent>

          <TabsContent value="my-shipments" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userShipments?.map((shipment) => (
              <ShipmentCard 
                key={shipment.id}
                shipment={shipment}
                showBookButton={false}
              />
            ))}
            {userShipments?.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">
                You haven't created any shipments yet.
              </div>
            )}
          </TabsContent>

          <TabsContent value="my-bookings">
            <BookingsList bookings={userBookings} />
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
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Shipment</DialogTitle>
            </DialogHeader>
            <CreateShipmentWizard
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
