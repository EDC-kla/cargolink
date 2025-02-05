
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { shipmentService } from "@/services/api";
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
import { Card } from "@/components/ui/card";
import { Package, Ship, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Marketplace = () => {
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [transportMode, setTransportMode] = useState<'all' | 'sea' | 'air'>('all');
  
  const { data: allShipments, isLoading: isLoadingAll, refetch: refetchAll } = useQuery({
    queryKey: ['shipments', transportMode],
    queryFn: async () => {
      const shipments = await shipmentService.listShipments();
      
      // Transform the raw data to match the Shipment type exactly
      const transformedShipments = shipments.map(shipment => {
        const transformedStops = Array.isArray(shipment.stops) 
          ? shipment.stops.map(stop => 
              // Convert any type of stop value to string
              typeof stop === 'object' ? JSON.stringify(stop) : String(stop)
            )
          : [];

        return {
          ...shipment,
          stops: transformedStops,
          // Ensure these fields exist with default values if they're null
          featured: shipment.featured ?? false,
          display_order: shipment.display_order ?? 0,
          category: shipment.category ?? "standard",
          // Ensure other nullable fields have their default values
          cargo_restrictions: shipment.cargo_restrictions ?? [],
          additional_services: shipment.additional_services ?? [],
          route_tags: shipment.route_tags ?? [],
          preferred_cargo_types: shipment.preferred_cargo_types ?? [],
        } satisfies Shipment;
      });

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
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const featuredShipments = allShipments?.filter(s => s.featured) || [];

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

      {/* Featured Shipments */}
      {featuredShipments.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold mb-4">Featured Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredShipments.map((shipment) => (
              <motion.div
                key={shipment.id}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedShipment(shipment)}>
                  <div className="flex items-center space-x-4 mb-4">
                    {shipment.transport_mode === 'sea' ? (
                      <Ship className="h-10 w-10 text-blue-500" />
                    ) : (
                      <Package className="h-10 w-10 text-purple-500" />
                    )}
                    <div>
                      <h3 className="font-semibold text-lg">{shipment.origin} → {shipment.destination}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(shipment.departure_date).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm bg-gray-50 p-2 rounded">
                      <span>Available Space:</span>
                      <span className="font-medium">{shipment.available_space} CBM</span>
                    </div>
                    <div className="flex justify-between text-sm bg-gray-50 p-2 rounded">
                      <span>Price per CBM:</span>
                      <span className="font-medium text-primary">${shipment.price_per_cbm}</span>
                    </div>
                    <div className="flex items-center justify-end text-sm text-primary mt-2">
                      View Details <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <Tabs defaultValue="marketplace" className="mt-8">
        <TabsList className="w-full justify-start border-b pb-px overflow-x-auto flex-nowrap">
          <TabsTrigger value="marketplace" className="text-lg whitespace-nowrap">Available Shipments</TabsTrigger>
          <TabsTrigger value="my-shipments" className="text-lg whitespace-nowrap">My Listed Shipments</TabsTrigger>
          <TabsTrigger value="my-bookings" className="text-lg whitespace-nowrap">My Bookings</TabsTrigger>
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
