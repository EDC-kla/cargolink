import { DollarSign } from "lucide-react";

interface PriceCalculationProps {
  pricePerCbm: number;
  totalPrice: number;
}

const PriceCalculation = ({ pricePerCbm, totalPrice }: PriceCalculationProps) => {
  return (
    <div className="space-y-2 border rounded-lg p-4">
      <div className="flex items-center justify-between text-sm">
        <span>Price per CBM:</span>
        <div className="flex items-center">
          <DollarSign className="h-4 w-4" />
          <span>{pricePerCbm.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex items-center justify-between font-semibold">
        <span>Total Price:</span>
        <div className="flex items-center">
          <DollarSign className="h-4 w-4" />
          <span>{totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculation;