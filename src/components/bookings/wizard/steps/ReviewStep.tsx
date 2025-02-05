
import { BookingFormData } from "../BookingWizard";
import { Shipment } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Package,
  Truck,
  FileText,
  DollarSign,
  AlertCircle,
} from "lucide-react";

interface ReviewStepProps {
  data: BookingFormData;
  shipment: Shipment;
  onSubmit: () => void;
}

const ReviewStep = ({ data, shipment, onSubmit }: ReviewStepProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const totalPrice = data.space_booked * shipment.price_per_cbm;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4 space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Package className="h-4 w-4" />
            Cargo Details
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Space Required:</span>
              <span>{data.space_booked} CBM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Cargo Type:</span>
              <span>{data.cargo_type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Packaging:</span>
              <span>{data.cargo_packaging_type}</span>
            </div>
            {data.temperature_requirements && (
              <div className="flex justify-between">
                <span className="text-gray-500">Temperature:</span>
                <span>
                  {data.temperature_requirements.min}°C to {data.temperature_requirements.max}°C
                </span>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-4 space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Logistics Details
          </h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-500">Pickup Address:</span>
              <p className="mt-1">{data.pickup_address}</p>
            </div>
            <div>
              <span className="text-gray-500">Delivery Address:</span>
              <p className="mt-1">{data.delivery_address}</p>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Insurance:</span>
              <span>{data.insurance_required ? "Required" : "Not Required"}</span>
            </div>
          </div>
        </Card>

        <Card className="p-4 space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documentation
          </h3>
          <div className="space-y-2 text-sm">
            {data.customs_broker && (
              <div className="flex justify-between">
                <span className="text-gray-500">Customs Broker:</span>
                <span>{data.customs_broker}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Terms:</span>
              <span>{data.payment_terms}</span>
            </div>
            {data.required_certificates.length > 0 && (
              <div>
                <span className="text-gray-500">Required Certificates:</span>
                <ul className="mt-1 list-disc list-inside">
                  {data.required_certificates.map((cert) => (
                    <li key={cert}>{cert}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-4 space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Price Calculation
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Price per CBM:</span>
              <span>{formatCurrency(shipment.price_per_cbm)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Space Required:</span>
              <span>{data.space_booked} CBM</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total Price:</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
          </div>
        </Card>
      </div>

      {data.booking_notes && (
        <Card className="p-4 space-y-2">
          <h3 className="font-semibold flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Special Instructions
          </h3>
          <p className="text-sm">{data.booking_notes}</p>
        </Card>
      )}

      <div className="flex justify-end">
        <Button onClick={onSubmit} className="w-full md:w-auto">
          Confirm Booking
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;
