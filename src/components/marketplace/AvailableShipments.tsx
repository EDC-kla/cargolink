import { useState } from "react";
import { Shipment, TransportMode } from "@/types/database.types";
import TransportModeFilters from "./TransportModeFilters";
import ShipmentsGrid from "./ShipmentsGrid";
import { Button } from "@/components/ui/button";
import { Plus, Search, MapPin, Calendar, Package, Filter, ArrowRight, RefreshCw } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";

type TransportModeWithAll = TransportMode | 'all';

interface AvailableShipmentsProps {
  shipments: Shipment[] | undefined;
  onRefetch: () => void;
  isAuthenticated: boolean;
  isLoading?: boolean;
}

const AvailableShipments = ({ 
  shipments, 
  onRefetch,
  isAuthenticated,
  isLoading = false,
}: AvailableShipmentsProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [transportMode, setTransportMode] = useState<TransportModeWithAll>('all');
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

  const handleRefresh = () => {
    onRefetch();
    toast({
      title: "Refreshing Results",
      description: "Getting the latest available shipments...",
    });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white shadow-sm rounded-xl border border-gray-100">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-2xl font-semibold text-gray-900">Available Cargo Space</h1>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handleRefresh}
                className="hidden sm:flex"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Search Filters</SheetTitle>
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
                List Your Space
              </Button>
            </div>
          </div>
          
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Origin Port/City"
                  className="pl-10 h-12"
                  value={searchData.origin}
                  onChange={(e) => setSearchData({ ...searchData, origin: e.target.value })}
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Destination Port/City"
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

            <Button 
              type="submit"
              className="w-full h-12"
            >
              <Search className="mr-2 h-5 w-5" />
              Search Available Space
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>

          <div className="hidden lg:block border-t pt-6">
            <TransportModeFilters 
              transportMode={transportMode}
              onTransportModeChange={setTransportMode}
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-xl border border-gray-100 p-6">
        <ShipmentsGrid 
          shipments={filteredShipments}
          showBookButton={true}
          isAuthenticated={isAuthenticated}
          isLoading={isLoading}
        />
      </div>

      <Button 
        onClick={handleNewShipment}
        className="fixed bottom-4 right-4 shadow-lg sm:hidden"
      >
        <Plus className="mr-2 h-4 w-4" />
        List Your Space
      </Button>
    </div>
  );
};

export default AvailableShipments;
