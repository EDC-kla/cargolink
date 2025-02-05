import { Calendar, MapPin, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { shipmentService } from "@/services/api";
import { toast } from "@/components/ui/use-toast";

const ShipmentList = () => {
  const { data: shipments, isLoading, error } = useQuery({
    queryKey: ['shipments'],
    queryFn: shipmentService.listShipments,
  });

  if (isLoading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <p className="text-center">Loading shipments...</p>
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
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">
          Available Consolidated Shipments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shipments?.map((shipment) => (
            <div
              key={shipment.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
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
                  <span className="text-gray-600">{new Date(shipment.departure_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{shipment.available_space} CBM available</span>
                </div>
                <div className="text-lg font-semibold text-secondary">
                  ${shipment.price_per_cbm}/CBM
                </div>
              </div>

              <Button 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => {
                  toast({
                    title: "Coming Soon",
                    description: "Booking functionality will be available soon!",
                  });
                }}
              >
                Book Space
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShipmentList;