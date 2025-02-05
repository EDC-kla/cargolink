
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookingFormData } from "../BookingWizard";
import { Card } from "@/components/ui/card";
import { FileText, DollarSign } from "lucide-react";

interface CustomsDetailsStepProps {
  data: BookingFormData;
  onChange: (data: Partial<BookingFormData>) => void;
}

const CustomsDetailsStep = ({ data, onChange }: CustomsDetailsStepProps) => {
  return (
    <div className="space-y-6">
      <Card className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="customs_broker">Customs Broker</Label>
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-gray-400" />
              <Input
                id="customs_broker"
                value={data.customs_broker || ""}
                onChange={(e) => onChange({ customs_broker: e.target.value })}
                placeholder="Enter customs broker name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customs_declaration_number">Declaration Number</Label>
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-gray-400" />
              <Input
                id="customs_declaration_number"
                value={data.customs_declaration_number || ""}
                onChange={(e) => onChange({ customs_declaration_number: e.target.value })}
                placeholder="Enter declaration number if available"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cargo_value">Cargo Value</Label>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-gray-400" />
            <Input
              id="cargo_value"
              type="number"
              min={0}
              value={data.cargo_value}
              onChange={(e) => onChange({ cargo_value: Number(e.target.value) })}
              placeholder="Enter cargo value"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="payment_terms">Payment Terms</Label>
          <Select
            value={data.payment_terms}
            onValueChange={(value) => onChange({ payment_terms: value })}
          >
            <SelectTrigger id="payment_terms">
              <SelectValue placeholder="Select payment terms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="prepaid">Prepaid</SelectItem>
              <SelectItem value="collect">Collect</SelectItem>
              <SelectItem value="30_days">Net 30 Days</SelectItem>
              <SelectItem value="60_days">Net 60 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Required Certificates</Label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "origin", label: "Certificate of Origin" },
              { id: "inspection", label: "Inspection Certificate" },
              { id: "conformity", label: "Certificate of Conformity" },
              { id: "analysis", label: "Certificate of Analysis" }
            ].map((cert) => (
              <div key={cert.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={cert.id}
                  checked={data.required_certificates.includes(cert.id)}
                  onChange={(e) => {
                    const newCerts = e.target.checked
                      ? [...data.required_certificates, cert.id]
                      : data.required_certificates.filter((c) => c !== cert.id);
                    onChange({ required_certificates: newCerts });
                  }}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor={cert.id} className="cursor-pointer">
                  {cert.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CustomsDetailsStep;
