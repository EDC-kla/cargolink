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
  const [editingShipment, setEditingShipment] = useState<Shipment | null>(null);

  const handleEdit = (shipment: Shipment) => {
    setEditingShipment(shipment);
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
    setEditingShipment(null);
    onRefetch();
  };

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
        onEdit={handleEdit}
        showEditButton={true}
      />

      <Dialog open={showCreateForm || !!editingShipment} onOpenChange={(open) => {
        if (!open) handleCloseForm();
      }}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingShipment ? 'Edit Shipment' : 'Create New Shipment'}
            </DialogTitle>
          </DialogHeader>
          <CreateShipmentForm
            initialData={editingShipment}
            onClose={handleCloseForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyShipments;