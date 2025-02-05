import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CargoType, IncotermType } from "@/types/database.types";

interface ServicesStepProps {
  formData: {
    customs_clearance: boolean;
    door_pickup: boolean;
    door_delivery: boolean;
    consolidation_service: boolean;
    additional_services: string[];
    cargo_restrictions: string[];
    preferred_cargo_types: CargoType[];
    incoterms?: IncotermType;
  };
  onChange: (field: string, value: any) => void;
}

const ServicesStep = ({ formData, onChange }: ServicesStepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Core Services</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="customs_clearance"
              checked={formData.customs_clearance}
              onCheckedChange={(checked) => onChange("customs_clearance", checked)}
            />
            <div>
              <Label htmlFor="customs_clearance" className="cursor-pointer">Customs Clearance</Label>
              <p className="text-sm text-muted-foreground">Handle customs documentation and clearance</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox
              id="door_pickup"
              checked={formData.door_pickup}
              onCheckedChange={(checked) => onChange("door_pickup", checked)}
            />
            <div>
              <Label htmlFor="door_pickup" className="cursor-pointer">Door Pickup</Label>
              <p className="text-sm text-muted-foreground">Collect cargo from shipper's location</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox
              id="door_delivery"
              checked={formData.door_delivery}
              onCheckedChange={(checked) => onChange("door_delivery", checked)}
            />
            <div>
              <Label htmlFor="door_delivery" className="cursor-pointer">Door Delivery</Label>
              <p className="text-sm text-muted-foreground">Deliver cargo to consignee's location</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox
              id="consolidation_service"
              checked={formData.consolidation_service}
              onCheckedChange={(checked) => onChange("consolidation_service", checked)}
            />
            <div>
              <Label htmlFor="consolidation_service" className="cursor-pointer">Consolidation Service</Label>
              <p className="text-sm text-muted-foreground">Combine multiple shipments into one container</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="incoterms">Incoterms</Label>
        <Select
          value={formData.incoterms}
          onValueChange={(value) => onChange("incoterms", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Incoterms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EXW">EXW - Ex Works</SelectItem>
            <SelectItem value="FCA">FCA - Free Carrier</SelectItem>
            <SelectItem value="FOB">FOB - Free on Board</SelectItem>
            <SelectItem value="CIF">CIF - Cost, Insurance & Freight</SelectItem>
            <SelectItem value="DAP">DAP - Delivered at Place</SelectItem>
            <SelectItem value="DDP">DDP - Delivered Duty Paid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Preferred Cargo Types</Label>
        <div className="grid grid-cols-2 gap-4">
          {["general", "hazmat", "reefer", "oversized", "bulk", "liquid"].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`cargo_type_${type}`}
                checked={formData.preferred_cargo_types.includes(type as CargoType)}
                onCheckedChange={(checked) => {
                  const types = checked
                    ? [...formData.preferred_cargo_types, type as CargoType]
                    : formData.preferred_cargo_types.filter(t => t !== type);
                  onChange("preferred_cargo_types", types);
                }}
              />
              <Label htmlFor={`cargo_type_${type}`} className="capitalize cursor-pointer">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Cargo Restrictions</Label>
        <Input
          placeholder="Enter restrictions (comma separated)"
          value={formData.cargo_restrictions.join(", ")}
          onChange={(e) => {
            const restrictions = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
            onChange("cargo_restrictions", restrictions);
          }}
        />
      </div>
    </div>
  );
};

export default ServicesStep;