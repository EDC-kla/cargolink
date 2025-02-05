interface ReviewStepProps {
  formData: {
    origin: string;
    destination: string;
    departure_date: string;
    available_space: number;
    price_per_cbm: number;
  };
}

const ReviewStep = ({ formData }: ReviewStepProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Review Your Shipment Details</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">From</span>
          <span className="font-medium">{formData.origin}</span>
        </div>
        
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">To</span>
          <span className="font-medium">{formData.destination}</span>
        </div>
        
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Departure</span>
          <span className="font-medium">{formatDate(formData.departure_date)}</span>
        </div>
        
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Available Space</span>
          <span className="font-medium">{formData.available_space} CBM</span>
        </div>
        
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Price per CBM</span>
          <span className="font-medium">${formData.price_per_cbm}</span>
        </div>
        
        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Total Value</span>
          <span className="font-medium text-primary">
            ${formData.available_space * formData.price_per_cbm}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;