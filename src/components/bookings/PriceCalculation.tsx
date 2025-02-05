
import { Label } from "@/components/ui/label";

interface PriceCalculationProps {
  pricePerCbm: number;
  totalPrice: number;
}

const PriceCalculation = ({ pricePerCbm, totalPrice }: PriceCalculationProps) => {
  return (
    <div className="space-y-2">
      <Label>Price Calculation</Label>
      <div className="bg-secondary/10 p-4 rounded-lg space-y-2">
        <div className="flex justify-between">
          <span>Price per CBM:</span>
          <span>${pricePerCbm.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total Price:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculation;
