
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Shipment } from "@/types/database.types";
import BookingWizard from "@/components/bookings/wizard/BookingWizard";

interface BookingDialogProps {
  shipment: Shipment | null;
  onClose: () => void;
  onBookingComplete: () => void;
}

const BookingDialog = ({ shipment, onClose, onBookingComplete }: BookingDialogProps) => {
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
        />
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
