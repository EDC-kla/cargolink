import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { shipmentService } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface BookingFormProps {
  shipmentId: string;
  availableSpace: number;
  pricePerCbm: number;
  onClose: () => void;
}

const BookingForm = ({ shipmentId, availableSpace, pricePerCbm, onClose }: BookingFormProps) => {
  const [spaceRequired, setSpaceRequired] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    if (spaceRequired > availableSpace) {
      toast({
        title: "Invalid space requirement",
        description: "Requested space exceeds available space",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      await shipmentService.bookSpace({
        shipment_id: shipmentId,
        user_id: user.id,
        space_booked: spaceRequired,
        status: "pending"
      });

      toast({
        title: "Booking submitted",
        description: "Your booking request has been submitted successfully",
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

  const totalPrice = spaceRequired * pricePerCbm;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="space">Space Required (CBM)</Label>
        <div className="flex items-center space-x-2">
          <Package className="h-4 w-4 text-gray-400" />
          <Input
            id="space"
            type="number"
            min={1}
            max={availableSpace}
            value={spaceRequired}
            onChange={(e) => setSpaceRequired(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Available space: {availableSpace} CBM
        </p>
      </div>

      <div className="space-y-2">
        <Label>Price Calculation</Label>
        <div className="bg-secondary/10 p-4 rounded-lg space-y-2">
          <div className="flex justify-between">
            <span>Price per CBM:</span>
            <span>${pricePerCbm}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total Price:</span>
            <span>${totalPrice}</span>
          </div>
        </div>
      </div>

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