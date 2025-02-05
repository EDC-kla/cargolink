
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ArrowRight, Building2, UserCircle, Briefcase } from "lucide-react";
import { shipmentService } from "@/services/api";

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<"profile" | "role" | "completed">("profile");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company_name: "",
    contact_person: "",
    phone: "",
    company_type: [] as string[],
  });

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const profile = await shipmentService.getProfile(user.id);
      if (profile.onboarding_completed) {
        navigate("/marketplace");
      } else {
        setCurrentStep(profile.onboarding_step as "profile" | "role" | "completed");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleProfileSubmit = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      await shipmentService.updateProfile({
        id: user.id,
        ...formData,
        onboarding_step: "role",
      });

      setCurrentStep("role");
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

  const handleRoleSelection = async (role: "buyer" | "seller") => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Insert role (the trigger will handle this)
      await shipmentService.updateProfile({
        id: user.id,
        onboarding_step: "completed",
        onboarding_completed: true,
      });

      toast({
        title: "Welcome!",
        description: "Your account has been set up successfully.",
      });

      navigate("/marketplace");
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

  const renderProfileStep = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6">Tell us about your business</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Company Name</label>
          <Input
            value={formData.company_name}
            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
            placeholder="Enter your company name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contact Person</label>
          <Input
            value={formData.contact_person}
            onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
            placeholder="Enter contact person name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <Input
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Enter phone number"
            type="tel"
            required
          />
        </div>
        <Button 
          onClick={handleProfileSubmit}
          disabled={loading || !formData.company_name || !formData.contact_person || !formData.phone}
          className="w-full"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderRoleStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">How will you use our platform?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 hover:border-primary cursor-pointer transition-all" onClick={() => handleRoleSelection("buyer")}>
          <UserCircle className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-lg font-semibold mb-2">I want to book cargo space</h3>
          <p className="text-sm text-gray-600">Find and book available cargo space for your shipments</p>
        </Card>
        <Card className="p-6 hover:border-primary cursor-pointer transition-all" onClick={() => handleRoleSelection("seller")}>
          <Building2 className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-lg font-semibold mb-2">I want to offer cargo space</h3>
          <p className="text-sm text-gray-600">List your available cargo space and manage bookings</p>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Briefcase className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome aboard!</h2>
          <p className="mt-2 text-sm text-gray-600">Let's get your account set up</p>
        </div>
        {currentStep === "profile" && renderProfileStep()}
        {currentStep === "role" && renderRoleStep()}
      </div>
    </div>
  );
};

export default Onboarding;
