
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { shipmentService } from "@/services/shipmentService";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CalendarClock, MapPin, Ship, Plane, Train, Truck, Package, CircleDollarSign, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import TransportHeader from "@/components/marketplace/shipment-card/TransportHeader";
import LocationInfo from "@/components/marketplace/shipment-card/LocationInfo";
import ShipmentDetails from "@/components/marketplace/shipment-card/ShipmentDetails";
import ServicesInfo from "@/components/marketplace/shipment-card/ServicesInfo";
import CargoRestrictions from "@/components/marketplace/shipment-card/CargoRestrictions";

const ShipmentDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: shipment, isLoading, error } = useQuery({
    queryKey: ['shipment', id],
    queryFn: () => shipmentService.getShipment(id as string),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !shipment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <h2 className="text-xl font-semibold">Error loading shipment details</h2>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Button
          variant="ghost"
          className="mb-6 inline-flex items-center"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Listings
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <Card className="p-6">
              <TransportHeader 
                transportMode={shipment.transport_mode}
                status={shipment.status}
              />
              <div className="mt-4 space-y-4">
                <LocationInfo
                  location={shipment.origin}
                  port={shipment.port_of_loading}
                  label="Port of Loading"
                />
                <LocationInfo
                  location={shipment.destination}
                  port={shipment.port_of_discharge}
                  label="Port of Discharge"
                />
              </div>
            </Card>

            {/* Details Card */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Shipment Details</h3>
              <div className="space-y-4">
                {shipment.description && (
                  <div className="prose max-w-none">
                    <p>{shipment.description}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <CalendarClock className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Departure Date</p>
                      <p className="font-medium">{format(new Date(shipment.departure_date), 'PPP')}</p>
                    </div>
                  </div>
                  
                  {shipment.estimated_arrival && (
                    <div className="flex items-center gap-2">
                      <CalendarClock className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Estimated Arrival</p>
                        <p className="font-medium">{format(new Date(shipment.estimated_arrival), 'PPP')}</p>
                      </div>
                    </div>
                  )}
                </div>

                <ShipmentDetails
                  availableSpace={shipment.available_space}
                  pricePerCbm={shipment.price_per_cbm}
                  transitTimeDays={shipment.transit_time_days}
                />
              </div>
            </Card>

            {/* Services Card */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Services & Requirements</h3>
              <div className="space-y-4">
                <ServicesInfo
                  specialHandling={shipment.special_handling_options}
                  additionalServices={shipment.additional_services}
                />
                <CargoRestrictions
                  restrictions={shipment.cargo_restrictions}
                />
              </div>
            </Card>

            {/* Additional Information */}
            {(shipment.carrier_notes || shipment.cancellation_policy) && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                <div className="space-y-4">
                  {shipment.carrier_notes && (
                    <div>
                      <h4 className="font-medium text-gray-900">Carrier Notes</h4>
                      <p className="mt-1 text-gray-600">{shipment.carrier_notes}</p>
                    </div>
                  )}
                  {shipment.cancellation_policy && (
                    <div>
                      <h4 className="font-medium text-gray-900">Cancellation Policy</h4>
                      <p className="mt-1 text-gray-600">{shipment.cancellation_policy}</p>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Book This Shipment</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Price per CBM</span>
                  <span className="font-semibold">${shipment.price_per_cbm}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Available Space</span>
                  <span className="font-semibold">{shipment.available_space} CBM</span>
                </div>
                {shipment.booking_deadline && (
                  <div className="flex justify-between items-center text-destructive">
                    <span>Booking Deadline</span>
                    <span className="font-semibold">
                      {format(new Date(shipment.booking_deadline), 'PP')}
                    </span>
                  </div>
                )}
                <Button 
                  className="w-full"
                  onClick={() => navigate(`/book/${shipment.id}`)}
                >
                  Book Now
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetailsPage;
