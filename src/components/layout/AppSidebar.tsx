import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Package, Store, Home, Menu, X, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const AppSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Store, label: "Marketplace", path: "/marketplace" },
    { icon: Package, label: "My Shipments", path: "/marketplace?tab=my-shipments" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", damping: 20 }}
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-[280px] bg-white border-r border-gray-200 p-6 shadow-lg",
          !isOpen && "hidden lg:block"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center space-x-2 mb-8">
            <Package className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">Shipment App</span>
          </div>

          <nav className="flex-grow space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                    "hover:bg-accent text-gray-600 hover:text-primary",
                    isActive && "bg-accent text-primary font-medium"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </motion.div>
    </>
  );
};

export default AppSidebar;