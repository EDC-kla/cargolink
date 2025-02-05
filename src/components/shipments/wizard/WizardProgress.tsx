import { Check } from "lucide-react";

interface WizardProgressProps {
  currentStep: number;
  steps: { title: string }[];
}

const WizardProgress = ({ currentStep, steps }: WizardProgressProps) => {
  return (
    <div className="flex justify-between">
      {steps.map((step, index) => (
        <div
          key={step.title}
          className="flex items-center"
        >
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                ${
                  index < currentStep
                    ? "bg-primary border-primary text-white"
                    : index === currentStep
                    ? "border-primary text-primary"
                    : "border-gray-300 text-gray-300"
                }`}
            >
              {index < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span
              className={`text-sm mt-1 
                ${
                  index <= currentStep
                    ? "text-primary font-medium"
                    : "text-gray-400"
                }`}
            >
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-[2px] w-full mx-2 mt-4
                ${
                  index < currentStep
                    ? "bg-primary"
                    : "bg-gray-300"
                }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default WizardProgress;