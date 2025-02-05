import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Shipment } from "@/types/database.types";
import BookingWizard from "@/components/bookings/wizard/BookingWizard";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface BookingDialogProps {
  shipment: Shipment | null;
  onClose: () => void;
  onBookingComplete: () => void;
}

const BookingDialog = ({ shipment, onClose, onBookingComplete }: BookingDialogProps) => {
  const navigate = useNavigate();

  const handleBookingStart = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth", { state: { returnTo: "/marketplace" } });
      return;
    }
  };

  if (!shipment) return null;

  return (
    <Dialog open={!!shipment} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <BookingWizard
          shipment={shipment}
          onComplete={() => {
            onClose();
            onBookingComplete();
          }}
          onCancel={onClose}
          onAuthRequired={handleBookingStart}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;