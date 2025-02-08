
import * as React from 'react';
import { motion } from "framer-motion";
import { Package, FileCheck, Truck, Globe, ArrowRight } from "lucide-react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };  
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

const howItWorks = [
  {
    icon: Package,
    title: "List Space",
    description: "Share your excess cargo space or find available capacity on global routes"
  },
  {
    icon: FileCheck,
    title: "Book Instantly",
    description: "Get quotes and book with secure payment - no paperwork hassle"
  },
  {
    icon: Truck,
    title: "Track & Deliver",
    description: "Monitor your shipment in real-time from pickup to delivery"
  }
];

const HowItWorks = () => {
  return (
    <ErrorBoundary>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
          How It Works
        </h2>
        <p className="text-lg text-gray-600 text-center mb-16 max-w-2xl mx-auto">
          Ship globally through Africa in three simple steps
        </p>
        
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {howItWorks.map((step, index) => (
            <React.Fragment key={step.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group relative z-10"
              >
                <div className="inline-flex p-6 rounded-full bg-accent mb-6 group-hover:scale-110 transition-transform">
                  <step.icon className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                
                {/* Demo illustration */}
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.2 }}
                  className="mt-6 p-4 bg-accent/20 rounded-lg"
                >
                  <Globe className="h-8 w-8 mx-auto text-primary/60 mb-2" />
                  <span className="text-sm text-gray-500">
                    {index === 0 && "Lagos → Dubai"}
                    {index === 1 && "Instant Quote: $2.5k"}
                    {index === 2 && "ETA: 2 Days"}
                  </span>
                </motion.div>
              </motion.div>
              
              {/* Connector arrows between steps */}
              {index < 2 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="hidden md:flex absolute top-1/2 left-[calc(33.33%+1rem)] transform -translate-y-1/2"
                  style={{ left: `calc(${(index + 1) * 33.33}% - 1rem)` }}
                >
                  <ArrowRight className="h-8 w-8 text-primary/40" />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Interactive Demo Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white p-6 rounded-xl shadow-lg mx-auto max-w-2xl"
        >
          <div className="bg-accent/10 rounded-lg p-4 text-center">
            <span className="text-sm font-medium text-gray-600">Live Demo</span>
            <div className="flex items-center justify-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                <span className="text-sm">20ft Container</span>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <span className="text-sm">Mombasa → Rotterdam</span>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <div className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-primary" />
                <span className="text-sm">$3.2k</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </ErrorBoundary>
  );
};

export default HowItWorks;
