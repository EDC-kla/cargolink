import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { bookingService } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import BookingSpaceInput from "./BookingSpaceInput";
import PriceCalculation from "./PriceCalculation";
import { BookingFormData } from "./wizard/BookingWizard";

interface BookingFormProps {
  shipmentId: string;
  availableSpace: number;
  pricePerCbm: number;
  onClose: () => void;
}

const BookingForm = ({ shipmentId, availableSpace, pricePerCbm, onClose }: BookingFormProps) => {
  const [spaceRequired, setSpaceRequired] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to book a shipment",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (spaceRequired <= 0) {
      setError("Space required must be greater than 0");
      return;
    }

    if (spaceRequired > availableSpace) {
      setError(`Requested space (${spaceRequired} CBM) exceeds available space (${availableSpace} CBM)`);
      return;
    }

    try {
      setLoading(true);
      const initialBookingData: BookingFormData & { shipment_id: string; status: string } = {
        shipment_id: shipmentId,
        space_booked: spaceRequired,
        status: "pending",
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
        payment_terms: "prepaid"
      };

      await bookingService.bookSpace(initialBookingData);

      toast({
        title: "Booking submitted",
        description: "Your booking request has been submitted successfully. You can track its status in My Bookings.",
      });
      onClose();
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = spaceRequired * pricePerCbm;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <BookingSpaceInput
        spaceRequired={spaceRequired}
        availableSpace={availableSpace}
        onChange={setSpaceRequired}
        disabled={loading}
      />

      <PriceCalculation
        pricePerCbm={pricePerCbm}
        totalPrice={totalPrice}
      />

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Book Space"}
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;
