import { ArrowRight, Package, Truck, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-accent to-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-primary mb-6">
            Affordable International Shipping for African Businesses
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 mb-8">
            Connect with other businesses to consolidate your cargo and reduce shipping costs by up to 40%
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90">
              List Your Cargo <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              Find Available Routes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: Package,
              title: "Consolidate Cargo",
              description: "Share container space with other shippers to reduce costs",
            },
            {
              icon: Truck,
              title: "Reliable Partners",
              description: "Work with verified logistics providers and carriers",
            },
            {
              icon: DollarSign,
              title: "Save Money",
              description: "Reduce your shipping costs by up to 40% through consolidation",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <feature.icon className="h-12 w-12 text-secondary mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;