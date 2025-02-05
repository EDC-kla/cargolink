import { Check } from "lucide-react";

interface Step {
  number: number;
  title: string;
}

interface WizardProgressProps {
  currentStep: number;
  steps: Step[];
}

const WizardProgress = ({ currentStep, steps }: WizardProgressProps) => {
  return (
    <div className="relative">
      <div className="absolute top-5 w-full h-0.5 bg-gray-200">
        <div
          className="absolute h-full bg-primary transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>

      <div className="relative flex justify-between">
        {steps.map((step) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div
              key={step.number}
              className="flex flex-col items-center"
            >
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  transition-colors duration-300
                  ${isCompleted ? "bg-primary" : isCurrent ? "bg-primary" : "bg-gray-200"}
                `}
              >
                {isCompleted ? (
                  <Check className="h-6 w-6 text-white" />
                ) : (
                  <span className={`text-sm font-medium ${isCurrent ? "text-white" : "text-gray-600"}`}>
                    {step.number}
                  </span>
                )}
              </div>
              <span className="mt-2 text-sm font-medium text-gray-600">
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WizardProgress;