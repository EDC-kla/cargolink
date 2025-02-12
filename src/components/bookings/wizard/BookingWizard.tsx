
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Shipment } from "@/types/database.types";
import CargoDetailsStep from "./steps/CargoDetailsStep";
import LogisticsDetailsStep from "./steps/LogisticsDetailsStep";
import CustomsDetailsStep from "./steps/CustomsDetailsStep";
import ReviewStep from "./steps/ReviewStep";
import { motion, AnimatePresence } from "framer-motion";
import { bookingService } from "@/services/api";
import { toast } from "@/hooks/use-toast";
import { Check, ArrowLeft, ArrowRight } from "lucide-react";

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
    weight_unit: 'kg' | 'lbs';
    dimension_unit: 'm' | 'cm' | 'in' | 'ft';
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
    cargo_dimensions: { 
      length: 0, 
      width: 0, 
      height: 0, 
      weight: 0,
      weight_unit: 'kg',
      dimension_unit: 'm'
    },
    special_handling: [],
    pickup_address: "",
    delivery_address: "",
    insurance_required: false,
    required_certificates: [],
    payment_terms: "prepaid",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      if (onAuthRequired) {
        await onAuthRequired();
      }
      await bookingService.bookSpace({
        shipment_id: shipment.id,
        ...formData,
        status: 'pending',
      });
      toast({
        title: "Booking submitted successfully! 🎉",
        description: "We'll notify you once the carrier reviews your booking.",
      });
      onComplete();
    } catch (error: any) {
      toast({
        title: "Error submitting booking",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [
    {
      title: "Cargo Details",
      description: "Tell us about your cargo",
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
      description: "Pickup and delivery information",
      component: (
        <LogisticsDetailsStep
          data={formData}
          onChange={(data) => setFormData({ ...formData, ...data })}
        />
      ),
    },
    {
      title: "Documentation",
      description: "Required documents and customs info",
      component: (
        <CustomsDetailsStep
          data={formData}
          onChange={(data) => setFormData({ ...formData, ...data })}
        />
      ),
    },
    {
      title: "Review & Confirm",
      description: "Verify your booking details",
      component: (
        <ReviewStep
          data={formData}
          shipment={shipment}
          onSubmit={handleSubmit}
          isSubmitting={submitting}
        />
      ),
    },
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{steps[currentStep].title}</h2>
            <p className="text-muted-foreground">{steps[currentStep].description}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <Progress value={progress} className="w-32 h-2" />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex items-center gap-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 
                    ${index <= currentStep 
                      ? 'border-primary bg-primary text-white' 
                      : 'border-gray-300 text-gray-400'
                    }`}
                >
                  {index < currentStep ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div 
                    className={`w-16 h-0.5 ${
                      index < currentStep ? 'bg-primary' : 'bg-gray-300'
                    }`} 
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Card className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {steps[currentStep].component}
          </motion.div>
        </AnimatePresence>
      </Card>

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
          disabled={submitting}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {currentStep === 0 ? "Cancel" : "Previous"}
        </Button>
        
        {currentStep < steps.length - 1 ? (
          <Button
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={submitting}
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={submitting}
            className="min-w-[120px]"
          >
            {submitting ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Submitting...
              </div>
            ) : (
              <>
                Confirm Booking
                <Check className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingWizard;
