
import { useState, useEffect } from "react";
import { Shipment } from "@/types/database.types";
import TransportModeFilters from "./TransportModeFilters";
import ShipmentsGrid from "./ShipmentsGrid";
import { Button } from "@/components/ui/button";
import { Plus, Search, MapPin, Calendar, Package } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

interface AvailableShipmentsProps {
  shipments: Shipment[] | undefined;
  onRefetch: () => void;
}

const AvailableShipments = ({ shipments, onRefetch }: AvailableShipmentsProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [transportMode, setTransportMode] = useState<'all' | 'sea' | 'air'>('all');
  const [searchData, setSearchData] = useState({
    origin: searchParams.get('origin') || '',
    destination: searchParams.get('destination') || '',
    date: searchParams.get('date') || '',
    cargoSize: searchParams.get('cargoSize') || ''
  });

  const handleNewShipment = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please log in to list a new shipment",
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
      <div className="bg-primary/5 py-12 px-4 -mx-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">Find Available Cargo Space</h1>
          
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
                className="flex-1 h-12 bg-primary hover:bg-primary/90"
              >
                <Search className="mr-2 h-5 w-5" />
                Search Available Space
              </Button>
              <Button 
                onClick={handleNewShipment}
                className="h-12"
                variant="outline"
              >
                <Plus className="mr-2 h-5 w-5" />
                List New Shipment
              </Button>
            </div>
          </form>

          <TransportModeFilters 
            transportMode={transportMode}
            onTransportModeChange={setTransportMode}
          />
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <ShipmentsGrid 
          shipments={filteredShipments}
          showBookButton={true}
        />
      </div>
    </div>
  );
};

export default AvailableShipments;

