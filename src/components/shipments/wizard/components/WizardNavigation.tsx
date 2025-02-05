import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, ArrowLeft } from "lucide-react";

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  loading: boolean;
  onBack: () => void;
  onNext: () => void;
  onClose: () => void;
  onSubmit: () => void;
}

const WizardNavigation = ({
  currentStep,
  totalSteps,
  loading,
  onBack,
  onNext,
  onClose,
  onSubmit,
}: WizardNavigationProps) => {
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex justify-between pt-4 border-t">
      <div>
        {currentStep > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
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
          <Button onClick={onSubmit} disabled={loading}>
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
          <Button onClick={onNext} disabled={loading}>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default WizardNavigation;