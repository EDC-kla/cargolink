
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Package, Store, Home, Menu, X, Settings, User, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const AppSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const getAuthStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    getAuthStatus();
  }, []);

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard", requiresAuth: true },
    { icon: Store, label: "Marketplace", path: "/marketplace", requiresAuth: false },
    { icon: Package, label: "My Shipments", path: "/marketplace/my-shipments", requiresAuth: true },
    { icon: User, label: "Profile", path: "/profile", requiresAuth: true },
    { icon: Settings, label: "Settings", path: "/settings", requiresAuth: true },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const filteredMenuItems = menuItems.filter(item => 
    !item.requiresAuth || (item.requiresAuth && isAuthenticated)
  );

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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 20 }}
            className={cn(
              "fixed left-0 top-0 z-40 h-full w-[280px] bg-white/80 backdrop-blur-md border-r border-gray-200 p-6 shadow-lg",
              !isOpen && "hidden lg:block"
            )}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center space-x-2 mb-8">
                <Package className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-primary">Cargo Buddy</span>
              </div>

              <nav className="flex-grow space-y-1">
                {filteredMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200",
                        "hover:bg-accent/50 text-gray-600 hover:text-primary group",
                        isActive && "bg-accent text-primary font-medium"
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className={cn(
                        "h-4 w-4 opacity-0 -translate-x-2 transition-all duration-200",
                        "group-hover:opacity-100 group-hover:translate-x-0",
                        isActive && "opacity-100 translate-x-0"
                      )} />
                    </Link>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppSidebar;
