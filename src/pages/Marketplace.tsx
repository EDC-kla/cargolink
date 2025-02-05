import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { shipmentService } from "@/services/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { Shipment } from "@/types/database.types";
import CreateShipmentWizard from "@/components/shipments/wizard/CreateShipmentWizard";
import MarketplaceHeader from "@/components/marketplace/MarketplaceHeader";
import BookingsList from "@/components/marketplace/BookingsList";
import TransportModeFilters from "@/components/marketplace/TransportModeFilters";
import ShipmentsGrid from "@/components/marketplace/ShipmentsGrid";
import BookingDialog from "@/components/marketplace/BookingDialog";
import ShipmentsNav from "@/components/marketplace/ShipmentsNav";
import { Routes, Route, Navigate } from "react-router-dom";

const Marketplace = () => {
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [transportMode, setTransportMode] = useState<'all' | 'sea' | 'air'>('all');
  
  const { data: allShipments, isLoading: isLoadingAll, refetch: refetchAll } = useQuery({
    queryKey: ['shipments', transportMode],
    queryFn: async () => {
      const rawShipments = await shipmentService.listShipments();
      
      const transformedShipments = rawShipments.map(shipment => ({
        ...shipment,
        stops: shipment.stops 
          ? shipment.stops.map(stop => 
              typeof stop === 'object' ? JSON.stringify(stop) : String(stop)
            )
          : null
      })) as Shipment[];

      return transportMode === 'all' 
        ? transformedShipments 
        : transformedShipments.filter(s => s.transport_mode === transportMode);
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
      return data as Shipment[];
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
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  if (isLoadingAll || isLoadingUser || isLoadingBookings) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <MarketplaceHeader onCreateShipment={() => setShowCreateForm(true)} />

      <div className="mt-8">
        <ShipmentsNav />
        
        <div className="mt-6">
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <TransportModeFilters 
                    transportMode={transportMode}
                    onTransportModeChange={setTransportMode}
                  />
                  <ShipmentsGrid 
                    shipments={allShipments}
                    onBookSpace={setSelectedShipment}
                  />
                </>
              } 
            />
            <Route 
              path="/my-shipments" 
              element={
                <ShipmentsGrid 
                  shipments={userShipments}
                  onBookSpace={setSelectedShipment}
                  showBookButton={false}
                />
              } 
            />
            <Route 
              path="/bookings" 
              element={<BookingsList bookings={userBookings} />} 
            />
            <Route path="*" element={<Navigate to="/marketplace" replace />} />
          </Routes>
        </div>
      </div>

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

      <BookingDialog 
        shipment={selectedShipment}
        onClose={() => setSelectedShipment(null)}
        onBookingComplete={refetchAll}
      />
    </div>
  );
};

export default Marketplace;