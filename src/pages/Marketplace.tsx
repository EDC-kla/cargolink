import { useQuery } from "@tanstack/react-query";
import { shipmentService } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Package, Truck } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BookingForm from "@/components/BookingForm";
import CreateShipmentForm from "@/components/CreateShipmentForm";
import { useState } from "react";
import { Shipment } from "@/types/database.types";

const Marketplace = () => {
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const { data: shipments, isLoading, error, refetch } = useQuery({
    queryKey: ['shipments'],
    queryFn: shipmentService.listShipments,
  });

  if (isLoading) {
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

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load shipments. Please try again later.",
      variant: "destructive",
    });
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Available Shipments</h1>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setShowCreateForm(true)}
          >
            <Truck className="h-4 w-4" />
            Post a Shipment
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shipments?.map((shipment) => (
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

              <Button 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => setSelectedShipment(shipment)}
              >
                Book Space
              </Button>
            </div>
          ))}
        </div>

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
                  refetch();
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
                refetch();
              }}
            />
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Marketplace;