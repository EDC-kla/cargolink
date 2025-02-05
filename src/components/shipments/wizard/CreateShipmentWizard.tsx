
import { useShipmentForm } from "./hooks/useShipmentForm";
import WizardProgress from "./WizardProgress";
import WizardNavigation from "./components/WizardNavigation";
import LocationStep from "./steps/LocationStep";
import DateStep from "./steps/DateStep";
import SpaceStep from "./steps/SpaceStep";
import TransportStep from "./steps/TransportStep";
import ReviewStep from "./steps/ReviewStep";
import { motion, AnimatePresence } from "framer-motion";

<lov-add-dependency>framer-motion@latest</lov-add-dependency>

interface CreateShipmentWizardProps {
  onClose: () => void;
}

const CreateShipmentWizard = ({ onClose }: CreateShipmentWizardProps) => {
  const {
    currentStep,
    setCurrentStep,
    loading,
    formData,
    handleFieldChange,
    handleSubmit,
  } = useShipmentForm(onClose);

  const steps = [
    {
      title: "Location",
      component: (
        <LocationStep
          origin={formData.origin}
          destination={formData.destination}
          onChange={handleFieldChange}
        />
      ),
    },
    {
      title: "Transport",
      component: (
        <TransportStep
          transportMode={formData.transport_mode}
          transitTimeDays={formData.transit_time_days}
          containerType={formData.container_type}
          minBookingSize={formData.min_booking_size}
          customsClearance={formData.customs_clearance}
          doorPickup={formData.door_pickup}
          doorDelivery={formData.door_delivery}
          onChange={handleFieldChange}
        />
      ),
    },
    {
      title: "Date",
      component: (
        <DateStep
          value={formData.departure_date}
          onChange={(value) => handleFieldChange("departure_date", value)}
        />
      ),
    },
    {
      title: "Space & Price",
      component: (
        <SpaceStep
          availableSpace={formData.available_space}
          pricePerCbm={formData.price_per_cbm}
          onChange={handleFieldChange}
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

  return (
    <div className="space-y-6">
      <WizardProgress currentStep={currentStep} steps={steps} />
      
      <div className="min-h-[400px] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            {steps[currentStep].component}
          </motion.div>
        </AnimatePresence>
      </div>

      <WizardNavigation
        currentStep={currentStep}
        totalSteps={steps.length}
        loading={loading}
        onBack={handleBack}
        onNext={handleNext}
        onClose={onClose}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateShipmentWizard;
