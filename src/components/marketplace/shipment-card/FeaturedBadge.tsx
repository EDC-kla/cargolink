
import { Star } from "lucide-react";

const FeaturedBadge = () => {
  return (
    <div className="absolute -top-3 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
      <Star className="w-4 h-4" />
      Featured
    </div>
  );
};

export default FeaturedBadge;
