import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const ShipmentsNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { label: "Available Shipments", path: "/marketplace/available" },
    { label: "My Listed Shipments", path: "/marketplace/my-shipments" },
    { label: "My Bookings", path: "/marketplace/bookings" },
  ];

  return (
    <nav className="border-b pb-px overflow-x-auto flex-nowrap">
      <div className="flex space-x-6">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={cn(
              "text-lg whitespace-nowrap pb-2 px-1",
              "hover:text-primary transition-colors",
              "border-b-2 -mb-px",
              currentPath === item.path
                ? "border-primary text-primary"
                : "border-transparent text-gray-500"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default ShipmentsNav;