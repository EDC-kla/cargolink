import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import BasicDetailsStep from "@/components/shipments/wizard/steps/BasicDetailsStep";
import SpaceDetailsStep from "@/components/shipments/wizard/steps/SpaceDetailsStep";
import ServicesStep from "@/components/shipments/wizard/steps/ServicesStep";
import ReviewStep from "@/components/shipments/wizard/steps/ReviewStep";
import WizardProgress from "@/components/shipments/wizard/WizardProgress";
import { useShipmentForm } from "@/components/shipments/wizard/hooks/useShipmentForm";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const CreateShipment = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const { formData, handleFieldChange, handleSubmit, loading } = useShipmentForm(() => {
    navigate("/marketplace?tab=my-shipments");
  });

  const steps = [
    { number: 1, title: "Basic Details", component: BasicDetailsStep },
    { number: 2, title: "Space Details", component: SpaceDetailsStep },
    { number: 3, title: "Services", component: ServicesStep },
    { number: 4, title: "Review", component: ReviewStep },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormSubmit = async () => {
    try {
      await handleSubmit();
      toast({
        title: "Success",
        description: "Shipment created successfully!",
      });
      navigate("/marketplace?tab=my-shipments");
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to create shipment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6">
            <WizardProgress currentStep={currentStep} steps={steps} />

            <div className="mt-8">
              <CurrentStepComponent
                formData={formData}
                onChange={handleFieldChange}
              />
            </div>

            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1 || loading}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              {currentStep < steps.length ? (
                <Button onClick={handleNext} disabled={loading}>
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleFormSubmit}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Submit
                </Button>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateShipment;