
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, Package, ArrowRight, Ship, Plane } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    origin: "",
    destination: "",
    date: "",
    cargoSize: "",
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

  return (
    <div className="relative bg-gradient-to-b from-white via-accent/20 to-white pt-20 pb-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
          }}
        />
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12 space-y-6">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center items-center gap-4 mb-6"
            >
              <Ship className="h-12 w-12 text-primary/80" />
              <Plane className="h-12 w-12 text-primary transform -rotate-45" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                Book Cargo Space Across Africa <br />in Minutes
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Africa's digital logistics marketplace connecting shippers with available air & sea freight space. 
                <span className="font-semibold text-primary"> Save up to 40% on shipping costs.</span>
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 mb-12 border border-gray-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Origin Port/City</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
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
                    <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
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
                    <Calendar className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
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
                    <Package className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
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

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <div className="text-center">
              <Button 
                variant="outline" 
                size="lg"
                onClick={onGetStarted}
                className="w-full sm:w-auto h-12 text-base font-semibold border-2 hover:bg-accent/5 group"
              >
                List Your Space
                <Ship className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </Button>
              <p className="mt-2 text-sm text-gray-600">
                Got empty cargo space? Earn more revenue
              </p>
            </div>
            <div className="text-center">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/marketplace')}
                className="w-full sm:w-auto h-12 text-base font-semibold border-2 hover:bg-accent/5 group"
              >
                Browse Marketplace
                <Globe className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              </Button>
              <p className="mt-2 text-sm text-gray-600">
                Compare routes and instant quotes
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
