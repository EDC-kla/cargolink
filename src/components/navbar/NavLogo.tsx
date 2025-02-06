import { Link } from "react-router-dom";
import { Package } from "lucide-react";

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-primary">
      <Package className="h-6 w-6" />
      <span>Shipment App</span>
    </Link>
  );
};

export default NavLogo;