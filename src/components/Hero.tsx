import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, Package, ArrowRight } from "lucide-react";
import { useState } from "react";

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
    <div className="bg-gradient-to-b from-white to-gray-50 py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
              Ship Smarter Together
            </h1>
            <p className="text-xl text-gray-600">
              Find available cargo space or offer your excess capacity. Save costs and reduce environmental impact.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="From: City or Port"
                    className="pl-10"
                    value={searchData.origin}
                    onChange={(e) => setSearchData({ ...searchData, origin: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="To: City or Port"
                    className="pl-10"
                    value={searchData.destination}
                    onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="date"
                    className="pl-10"
                    value={searchData.date}
                    onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <Package className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Cargo size in CBM"
                    type="number"
                    className="pl-10"
                    value={searchData.cargoSize}
                    onChange={(e) => setSearchData({ ...searchData, cargoSize: e.target.value })}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Find Available Space
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>

          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <Button variant="outline" size="lg" onClick={onGetStarted}>
                List Your Shipment
              </Button>
              <p className="mt-2 text-sm text-gray-600">
                Offer your available cargo space
              </p>
            </div>
            <div className="text-center">
              <Button variant="outline" size="lg" onClick={onGetStarted}>
                View Marketplace
              </Button>
              <p className="mt-2 text-sm text-gray-600">
                Browse all available shipments
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;