
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, Package, ArrowRight, Ship, Plane, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { shipmentService } from "@/services/api";
import ShipmentsGrid from "@/components/marketplace/ShipmentsGrid";

interface HeroProps {
  onGetStarted: () => void;
}

const ITEMS_PER_PAGE = 6;

const Hero = ({ onGetStarted }: HeroProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchData, setSearchData] = useState({
    origin: "",
    destination: "",
    date: "",
    cargoSize: "",
  });

  const { data: shipments, isLoading, error } = useQuery({
    queryKey: ['shipments', 'all'],
    queryFn: async () => {
      try {
        return await shipmentService.listShipments();
      } catch (err) {
        console.error('Error fetching shipments:', err);
        return [];
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams({
      origin: searchData.origin,
      destination: searchData.destination,
      date: searchData.date,
      cargoSize: searchData.cargoSize,
    });
    navigate(`/marketplace?${searchParams.toString()}`);
  };

  // Pagination logic
  const totalPages = shipments ? Math.ceil(shipments.length / ITEMS_PER_PAGE) : 0;
  const paginatedShipments = shipments?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Smooth scroll to listings section
    document.getElementById('listings-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-gradient-to-b from-accent/5 via-accent/20 to-white pt-20 pb-32 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
        }}
      />
      
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12 space-y-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center items-center gap-6 mb-8"
            >
              <div className="relative">
                <Ship className="h-16 w-16 text-primary/80 absolute -left-2 transform hover:scale-110 transition-transform" />
                <Plane className="h-16 w-16 text-primary transform -rotate-45 hover:scale-110 transition-transform" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                Connect Global Markets Through African Trade Routes
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                List your available cargo space or find efficient shipping solutions on Africa's first digital logistics marketplace. Save up to <span className="font-semibold text-primary">40%</span> by sharing cargo space across global trade routes.
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 mb-12 border border-gray-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Origin Port/City</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-primary/60" />
                    <Input
                      placeholder="e.g., Mombasa Port, Nairobi"
                      className="pl-12 h-12 text-base"
                      value={searchData.origin}
                      onChange={(e) => setSearchData({ ...searchData, origin: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Destination Port/City</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-primary/60" />
                    <Input
                      placeholder="e.g., Lagos Port, Dar es Salaam"
                      className="pl-12 h-12 text-base"
                      value={searchData.destination}
                      onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Shipment Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-3.5 h-5 w-5 text-primary/60" />
                    <Input
                      type="date"
                      className="pl-12 h-12 text-base"
                      value={searchData.date}
                      onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Cargo Size (CBM)</label>
                  <div className="relative">
                    <Package className="absolute left-4 top-3.5 h-5 w-5 text-primary/60" />
                    <Input
                      type="number"
                      placeholder="Enter space in cubic meters"
                      className="pl-12 h-12 text-base"
                      value={searchData.cargoSize}
                      onChange={(e) => setSearchData({ ...searchData, cargoSize: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-white group"
              >
                Find Available Space
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </motion.div>

          {/* Available Listings Section */}
          <motion.div
            id="listings-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Available Shipping Routes
              </h2>
              <Button
                variant="outline"
                onClick={() => navigate('/marketplace')}
                className="text-primary hover:text-primary/90"
              >
                View All Routes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <ShipmentsGrid 
              shipments={paginatedShipments} 
              isLoading={isLoading}
              showFeaturedFirst={true}
            />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-10 h-10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => handlePageChange(page)}
                      className="w-10 h-10"
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;

