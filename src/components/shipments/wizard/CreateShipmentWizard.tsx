import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import LocationStep from "./steps/LocationStep";
import DateStep from "./steps/DateStep";
import SpaceStep from "./steps/SpaceStep";
import ReviewStep from "./steps/ReviewStep";
import WizardProgress from "./WizardProgress";

interface CreateShipmentWizardProps {
  onClose: () => void;
}

type ShipmentFormData = {
  origin: string;
  destination: string;
  departure_date: string;
  available_space: number;
  price_per_cbm: number;
};

const CreateShipmentWizard = ({ onClose }: CreateShipmentWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ShipmentFormData>({
    origin: "",
    destination: "",
    departure_date: "",
    available_space: 1,
    price_per_cbm: 1,
  });

  const steps = [
    {
      title: "Location",
      component: (
        <LocationStep
          origin={formData.origin}
          destination={formData.destination}
          onChange={(field, value) => setFormData({ ...formData, [field]: value })}
        />
      ),
    },
    {
      title: "Date",
      component: (
        <DateStep
          value={formData.departure_date}
          onChange={(value) => setFormData({ ...formData, departure_date: value })}
        />
      ),
    },
    {
      title: "Space & Price",
      component: (
        <SpaceStep
          availableSpace={formData.available_space}
          pricePerCbm={formData.price_per_cbm}
          onChange={(field, value) => setFormData({ ...formData, [field]: value })}
        />
      ),
    },
    {
      title: "Review",
      component: <ReviewStep formData={formData} />,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to create a shipment",
        variant: "destructive",
      });
      return;
    }

    const departureDate = new Date(formData.departure_date);
    if (departureDate < new Date()) {
      toast({
        title: "Invalid date",
        description: "Departure date must be in the future",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase
        .from("shipments")
        .insert([
          {
            ...formData,
            created_by: user.id,
          },
        ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Shipment created successfully",
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="space-y-6">
      <WizardProgress currentStep={currentStep} steps={steps} />
      
      <div className="min-h-[300px]">
        {steps[currentStep].component}
      </div>

      <div className="flex justify-between pt-4 border-t">
        <div>
          {currentStep > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={loading}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
        </div>
        <div className="flex space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          {isLastStep ? (
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Shipment"
              )}
            </Button>
          ) : (
            <Button onClick={handleNext} disabled={loading}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateShipmentWizard;