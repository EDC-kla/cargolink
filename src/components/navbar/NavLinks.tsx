import { Link } from "react-router-dom";
import { User } from "@supabase/supabase-js";

interface NavLinksProps {
  user: User | null;
}

const NavLinks = ({ user }: NavLinksProps) => {
  if (!user) return null;
  
  return (
    <div className="hidden sm:flex space-x-4">
      <Link
        to="/dashboard"
        className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
      >
        Dashboard
      </Link>
      <Link
        to="/marketplace"
        className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
      >
        Marketplace
      </Link>
    </div>
  );
};

export default NavLinks;