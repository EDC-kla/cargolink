
import { Link } from "react-router-dom";
import { Plane, Ship } from "lucide-react";

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="relative">
        <Ship className="h-6 w-6 text-primary absolute -left-1 opacity-50" />
        <Plane className="h-6 w-6 text-primary transform -rotate-45" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-primary tracking-tight">GogoCargo</span>
        <span className="text-xs text-muted-foreground -mt-1">Connecting African Trade</span>
      </div>
    </Link>
  );
};

export default NavLogo;
