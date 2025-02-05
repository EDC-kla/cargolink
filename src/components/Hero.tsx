import { Button } from "@/components/ui/button";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Consolidate Your Shipments
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Find available space in consolidated shipments or offer your excess capacity
            to others. Save costs and reduce environmental impact.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button onClick={onGetStarted} size="lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;