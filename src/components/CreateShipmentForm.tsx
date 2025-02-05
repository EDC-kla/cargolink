
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Calendar, Package, DollarSign, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { shipmentService } from "@/services/api";

interface CreateShipmentFormProps {
  onClose: () => void;
}

const CreateShipmentForm = ({ onClose }: CreateShipmentFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departure_date: "",
    available_space: 1,
    price_per_cbm: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate departure date is in the future
    const departureDate = new Date(formData.departure_date);
    if (departureDate < new Date()) {
      toast({
        title: "Invalid date",
        description: "Departure date must be in the future",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      await shipmentService.createShipment(formData);

      toast({
        title: "Success",
        description: "Shipment created successfully",
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="origin">Origin Location</Label>
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <Input
            id="origin"
            value={formData.origin}
            onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
            required
            placeholder="e.g., Shanghai, China"
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="destination">Destination Location</Label>
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <Input
            id="destination"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            required
            placeholder="e.g., Los Angeles, USA"
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="departure_date">Departure Date</Label>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <Input
            id="departure_date"
            type="datetime-local"
            value={formData.departure_date}
            onChange={(e) => setFormData({ ...formData, departure_date: e.target.value })}
            required
            min={new Date().toISOString().slice(0, 16)}
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="available_space">Available Space (CBM)</Label>
        <div className="flex items-center space-x-2">
          <Package className="h-4 w-4 text-gray-400" />
          <Input
            id="available_space"
            type="number"
            min={1}
            value={formData.available_space}
            onChange={(e) => setFormData({ ...formData, available_space: Number(e.target.value) })}
            required
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price_per_cbm">Price per CBM ($)</Label>
        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4 text-gray-400" />
          <Input
            id="price_per_cbm"
            type="number"
            min={1}
            value={formData.price_per_cbm}
            onChange={(e) => setFormData({ ...formData, price_per_cbm: Number(e.target.value) })}
            required
            disabled={loading}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Shipment"
          )}
        </Button>
      </div>
    </form>
  );
};

export default CreateShipmentForm;
