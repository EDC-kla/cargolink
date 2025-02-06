import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shipment } from "@/types/database.types";
import CargoDetailsStep from "./steps/CargoDetailsStep";
import LogisticsDetailsStep from "./steps/LogisticsDetailsStep";
import CustomsDetailsStep from "./steps/CustomsDetailsStep";
import ReviewStep from "./steps/ReviewStep";
import { motion, AnimatePresence } from "framer-motion";
import { bookingService } from "@/services/api";
import { toast } from "@/hooks/use-toast";

interface BookingWizardProps {
  shipment: Shipment;
  onComplete: () => void;
  onCancel: () => void;
  onAuthRequired?: () => Promise<void>;
}

export type BookingFormData = {
  space_booked: number;
  cargo_type: string;
  cargo_description: string;
  cargo_value: number;
  cargo_packaging_type: string;
  cargo_dimensions: {
    length: number;
    width: number;
    height: number;
    weight: number;
  };
  hazmat_details?: {
    class: string;
    un_number: string;
    proper_shipping_name: string;
  };
  special_handling: string[];
  temperature_requirements?: {
    min: number;
    max: number;
    unit: 'C' | 'F';
  };
  pickup_address: string;
  delivery_address: string;
  insurance_required: boolean;
  required_certificates: string[];
  customs_broker?: string;
  customs_declaration_number?: string;
  payment_terms: string;
  booking_notes?: string;
};

const BookingWizard = ({ shipment, onComplete, onCancel, onAuthRequired }: BookingWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<BookingFormData>({
    space_booked: 1,
    cargo_type: "",
    cargo_description: "",
    cargo_value: 0,
    cargo_packaging_type: "pallets",
    cargo_dimensions: { length: 0, width: 0, height: 0, weight: 0 },
    special_handling: [],
    pickup_address: "",
    delivery_address: "",
    insurance_required: false,
    required_certificates: [],
    payment_terms: "prepaid",
  });

  const handleSubmit = async () => {
    try {
      if (onAuthRequired) {
        await onAuthRequired();
      }
      await bookingService.bookSpace({
        shipment_id: shipment.id,
        ...formData,
        status: 'pending',
      });
      toast({
        title: "Booking submitted successfully",
        description: "Your booking request has been sent.",
      });
      onComplete();
    } catch (error: any) {
      toast({
        title: "Error submitting booking",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const steps = [
    {
      title: "Cargo Details",
      component: (
        <CargoDetailsStep
          formData={formData}
          onChange={(data) => setFormData({ ...formData, ...data })}
          shipment={shipment}
        />
      ),
    },
    {
      title: "Logistics Details",
      component: (
        <LogisticsDetailsStep
          data={formData}
          onChange={(data) => setFormData({ ...formData, ...data })}
        />
      ),
    },
    {
      title: "Customs & Documentation",
      component: (
        <CustomsDetailsStep
          data={formData}
          onChange={(data) => setFormData({ ...formData, ...data })}
        />
      ),
    },
    {
      title: "Review & Confirm",
      component: (
        <ReviewStep
          data={formData}
          shipment={shipment}
          onSubmit={handleSubmit}
        />
      ),
    },
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{steps[currentStep].title}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="min-h-[400px] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            {steps[currentStep].component}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button
          variant="outline"
          onClick={() => {
            if (currentStep === 0) {
              onCancel();
            } else {
              setCurrentStep(currentStep - 1);
            }
          }}
        >
          {currentStep === 0 ? "Cancel" : "Previous"}
        </Button>
        <Button
          onClick={() => {
            if (currentStep < steps.length - 1) {
              setCurrentStep(currentStep + 1);
            }
          }}
          disabled={currentStep === steps.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default BookingWizard;
