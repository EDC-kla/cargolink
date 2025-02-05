
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BookingForm from "@/components/BookingForm";
import { Shipment } from "@/types/database.types";

interface BookingDialogProps {
  shipment: Shipment | null;
  onClose: () => void;
  onBookingComplete: () => void;
}

const BookingDialog = ({ shipment, onClose, onBookingComplete }: BookingDialogProps) => {
  if (!shipment) return null;

  return (
    <Dialog open={!!shipment} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Shipping Space</DialogTitle>
        </DialogHeader>
        <BookingForm
          shipmentId={shipment.id}
          availableSpace={shipment.available_space}
          pricePerCbm={shipment.price_per_cbm}
          onClose={() => {
            onClose();
            onBookingComplete();
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
