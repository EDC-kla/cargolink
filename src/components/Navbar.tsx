import { Ship } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Ship className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">CargoLink</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">How it Works</Button>
            <Button variant="ghost">Find Shipments</Button>
            <Button variant="default" className="bg-secondary hover:bg-secondary/90">
              List Your Cargo
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;