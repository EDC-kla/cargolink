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
import CreateShipmentWizard from "@/components/shipments/wizard/CreateShipmentWizard";
import MarketplaceHeader from "@/components/marketplace/MarketplaceHeader";
import BookingsList from "@/components/marketplace/BookingsList";
import TransportModeFilters from "@/components/marketplace/TransportModeFilters";
import ShipmentsGrid from "@/components/marketplace/ShipmentsGrid";
import BookingDialog from "@/components/marketplace/BookingDialog";

const Marketplace = () => {
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [transportMode, setTransportMode] = useState<'all' | 'sea' | 'air'>('all');
  
  const { data: allShipments, isLoading: isLoadingAll, refetch: refetchAll } = useQuery({
    queryKey: ['shipments', transportMode],
    queryFn: async () => {
      const shipments = await shipmentService.listShipments();
      return transportMode === 'all' 
        ? shipments 
        : shipments.filter(s => s.transport_mode === transportMode);
    },
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
          <TabsList className="w-full justify-start border-b pb-px">
            <TabsTrigger value="marketplace">Available Shipments</TabsTrigger>
            <TabsTrigger value="my-shipments">My Listed Shipments</TabsTrigger>
            <TabsTrigger value="my-bookings">My Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace">
            <TransportModeFilters 
              transportMode={transportMode}
              onTransportModeChange={setTransportMode}
            />
            <ShipmentsGrid 
              shipments={allShipments}
              onBookSpace={setSelectedShipment}
            />
          </TabsContent>

          <TabsContent value="my-shipments">
            <ShipmentsGrid 
              shipments={userShipments}
              onBookSpace={setSelectedShipment}
              showBookButton={false}
            />
          </TabsContent>

          <TabsContent value="my-bookings">
            <BookingsList bookings={userBookings} />
          </TabsContent>
        </Tabs>

        <BookingDialog 
          shipment={selectedShipment}
          onClose={() => setSelectedShipment(null)}
          onBookingComplete={refetchAll}
        />

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