
import { useState, useEffect } from "react";
import { Shipment } from "@/types/database.types";
import TransportModeFilters from "./TransportModeFilters";
import ShipmentsGrid from "./ShipmentsGrid";
import { Button } from "@/components/ui/button";
import { Plus, Search, MapPin, Calendar, Package, Filter } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface AvailableShipmentsProps {
  shipments: Shipment[] | undefined;
  onRefetch: () => void;
  isAuthenticated: boolean;
}

const AvailableShipments = ({ 
  shipments, 
  onRefetch,
  isAuthenticated 
}: AvailableShipmentsProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [transportMode, setTransportMode] = useState<'all' | 'sea' | 'air'>('all');
  const [searchData, setSearchData] = useState({
    origin: searchParams.get('origin') || '',
    destination: searchParams.get('destination') || '',
    date: searchParams.get('date') || '',
    cargoSize: searchParams.get('cargoSize') || ''
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleNewShipment = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to list a new shipment",
        variant: "default",
      });
      navigate("/auth", { state: { from: "/create-shipment" } });
      return;
    }
    navigate("/create-shipment");
  };

  const filteredShipments = shipments
    ?.filter(s => transportMode === 'all' || s.transport_mode === transportMode)
    ?.filter(s => {
      const matchesOrigin = !searchData.origin || 
        s.origin.toLowerCase().includes(searchData.origin.toLowerCase());
      const matchesDestination = !searchData.destination || 
        s.destination.toLowerCase().includes(searchData.destination.toLowerCase());
      const matchesDate = !searchData.date || 
        s.departure_date.includes(searchData.date);
      const matchesCargoSize = !searchData.cargoSize || 
        s.available_space >= parseFloat(searchData.cargoSize);
      
      return matchesOrigin && matchesDestination && matchesDate && matchesCargoSize;
    });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(searchData).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    navigate(`/marketplace?${params.toString()}`);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Find Available Cargo Space</h1>
            <div className="flex items-center gap-4">
              <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Refine your cargo space search
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <TransportModeFilters 
                      transportMode={transportMode}
                      onTransportModeChange={setTransportMode}
                    />
                  </div>
                </SheetContent>
              </Sheet>
              <Button 
                onClick={handleNewShipment}
                className="hidden sm:flex"
              >
                <Plus className="mr-2 h-4 w-4" />
                List New Shipment
              </Button>
            </div>
          </div>
          
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Origin"
                  className="pl-10 h-12"
                  value={searchData.origin}
                  onChange={(e) => setSearchData({ ...searchData, origin: e.target.value })}
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Destination"
                  className="pl-10 h-12"
                  value={searchData.destination}
                  onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="date"
                  className="pl-10 h-12"
                  value={searchData.date}
                  onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                />
              </div>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="number"
                  placeholder="Cargo Size (CBM)"
                  className="pl-10 h-12"
                  value={searchData.cargoSize}
                  onChange={(e) => setSearchData({ ...searchData, cargoSize: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                type="submit"
                className="flex-1 h-12"
              >
                <Search className="mr-2 h-5 w-5" />
                Search Available Space
              </Button>
            </div>
          </form>

          <div className="hidden lg:block">
            <TransportModeFilters 
              transportMode={transportMode}
              onTransportModeChange={setTransportMode}
            />
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <ShipmentsGrid 
          shipments={filteredShipments}
          showBookButton={true}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </div>
  );
};

export default AvailableShipments;
