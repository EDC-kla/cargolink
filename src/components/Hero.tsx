
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, Package, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  const [searchData, setSearchData] = useState({
    origin: "",
    destination: "",
    date: "",
    cargoSize: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGetStarted();
  };

  return (
    <div className="relative bg-gradient-to-b from-white to-accent/30 py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12 space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
            >
              Ship Smarter Together
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Find available cargo space or offer your excess capacity. Save costs and reduce environmental impact.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 mb-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">From</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="City or Port"
                      className="pl-12 h-12 text-base"
                      value={searchData.origin}
                      onChange={(e) => setSearchData({ ...searchData, origin: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">To</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="City or Port"
                      className="pl-12 h-12 text-base"
                      value={searchData.destination}
                      onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">When</label>
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
                  <label className="text-sm font-medium text-gray-700">Cargo Size</label>
                  <div className="relative">
                    <Package className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Size in CBM"
                      type="number"
                      className="pl-12 h-12 text-base"
                      value={searchData.cargoSize}
                      onChange={(e) => setSearchData({ ...searchData, cargoSize: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-white"
              >
                Find Available Space
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <div className="text-center">
              <Button 
                variant="outline" 
                size="lg"
                onClick={onGetStarted}
                className="w-full sm:w-auto h-12 text-base font-semibold border-2 hover:bg-accent/5"
              >
                List Your Shipment
              </Button>
              <p className="mt-2 text-sm text-gray-600">
                Offer your available cargo space
              </p>
            </div>
            <div className="text-center">
              <Button 
                variant="outline" 
                size="lg"
                onClick={onGetStarted}
                className="w-full sm:w-auto h-12 text-base font-semibold border-2 hover:bg-accent/5"
              >
                View Marketplace
              </Button>
              <p className="mt-2 text-sm text-gray-600">
                Browse all available shipments
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
