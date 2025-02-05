import { useState } from "react";
import { Shipment } from "@/types/database.types";
import ShipmentsGrid from "./ShipmentsGrid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateShipmentForm from "@/components/shipments/CreateShipmentForm";

interface MyShipmentsProps {
  shipments: Shipment[] | undefined;
  onRefetch: () => void;
}

const MyShipments = ({ shipments, onRefetch }: MyShipmentsProps) => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Create New Shipment
        </button>
      </div>

      <ShipmentsGrid 
        shipments={shipments}
        showBookButton={false}
        onBookSpace={() => {}}
      />

      <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Shipment</DialogTitle>
          </DialogHeader>
          <CreateShipmentForm
            onClose={() => {
              setShowCreateForm(false);
              onRefetch();
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyShipments;