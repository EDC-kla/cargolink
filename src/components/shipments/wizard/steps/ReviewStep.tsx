import { Ship, Plane } from "lucide-react";

interface ReviewStepProps {
  formData: {
    origin: string;
    destination: string;
    departure_date: string;
    available_space: number;
    price_per_cbm: number;
    transport_mode: string;
    container_type: string | null;
    transit_time_days: number | null;
    customs_clearance: boolean;
    door_pickup: boolean;
    door_delivery: boolean;
    min_booking_size: number | null;
  };
}

const ReviewStep = ({ formData }: ReviewStepProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const TransportIcon = formData.transport_mode === 'sea' ? Ship : Plane;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Review Your Shipment Details</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">From</span>
          <span className="font-medium">{formData.origin}</span>
        </div>
        
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">To</span>
          <span className="font-medium">{formData.destination}</span>
        </div>
        
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Transport Mode</span>
          <span className="font-medium flex items-center">
            <TransportIcon className="w-4 h-4 mr-2" />
            {formData.transport_mode === 'sea' ? 'Sea Freight' : 'Air Freight'}
          </span>
        </div>

        {formData.container_type && (
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Container Type</span>
            <span className="font-medium">{formData.container_type}</span>
          </div>
        )}
        
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Departure</span>
          <span className="font-medium">{formatDate(formData.departure_date)}</span>
        </div>

        {formData.transit_time_days && (
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Transit Time</span>
            <span className="font-medium">{formData.transit_time_days} days</span>
          </div>
        )}
        
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Available Space</span>
          <span className="font-medium">{formData.available_space} CBM</span>
        </div>

        {formData.min_booking_size && (
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Minimum Booking</span>
            <span className="font-medium">{formData.min_booking_size} CBM</span>
          </div>
        )}
        
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Price per CBM</span>
          <span className="font-medium">${formData.price_per_cbm}</span>
        </div>
        
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Total Value</span>
          <span className="font-medium text-primary">
            ${formData.available_space * formData.price_per_cbm}
          </span>
        </div>

        <div className="py-2 border-b">
          <span className="text-gray-600">Additional Services</span>
          <div className="mt-2 space-y-1">
            {formData.customs_clearance && (
              <div className="text-sm">✓ Customs Clearance</div>
            )}
            {formData.door_pickup && (
              <div className="text-sm">✓ Door Pickup</div>
            )}
            {formData.door_delivery && (
              <div className="text-sm">✓ Door Delivery</div>
            )}
            {!formData.customs_clearance && !formData.door_pickup && !formData.door_delivery && (
              <div className="text-sm text-gray-500">No additional services selected</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;