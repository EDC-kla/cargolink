import { Calendar, MapPin, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockShipments = [
  {
    id: 1,
    origin: "Lagos, Nigeria",
    destination: "Dubai, UAE",
    date: "May 15, 2024",
    space: "12 CBM available",
    price: "$45/CBM",
  },
  {
    id: 2,
    origin: "Mombasa, Kenya",
    destination: "Shanghai, China",
    date: "May 20, 2024",
    space: "18 CBM available",
    price: "$52/CBM",
  },
  {
    id: 3,
    origin: "Cape Town, South Africa",
    destination: "Rotterdam, Netherlands",
    date: "May 25, 2024",
    space: "8 CBM available",
    price: "$48/CBM",
  },
];

const ShipmentList = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">
          Available Consolidated Shipments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockShipments.map((shipment) => (
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
                  <span className="text-gray-600">{shipment.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{shipment.space}</span>
                </div>
                <div className="text-lg font-semibold text-secondary">
                  {shipment.price}
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90">
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