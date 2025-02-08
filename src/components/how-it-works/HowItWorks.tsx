
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
    title: "List Your Space",
    description: "Share available cargo space on your routes or find capacity that matches your needs",
    animationDelay: 0.2,
    demoText: "20ft Container Space",
    highlight: "Available Space: 70%"
  },
  {
    icon: FileCheck,
    title: "Book Instantly",
    description: "Get instant quotes and secure your booking with our automated system",
    animationDelay: 0.4,
    demoText: "Quote Generated",
    highlight: "$2.5k / Container"
  },
  {
    icon: Truck,
    title: "Track & Deliver",
    description: "Monitor your shipment's journey with real-time tracking and updates",
    animationDelay: 0.6,
    demoText: "Real-time Location",
    highlight: "ETA: 2 Days"
  }
];

const HowItWorks = () => {
  return (
    <ErrorBoundary>
      <div className="py-20 bg-gradient-to-b from-white to-accent/10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
            >
              How GogoCargo Works
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Ship globally through Africa in three simple steps
            </motion.p>
          </div>
          
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 transform -translate-y-1/2 z-0" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
              {howItWorks.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: step.animationDelay }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl shadow-xl p-8 h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: step.animationDelay + 0.2 }}
                        className="bg-primary rounded-full p-4 shadow-lg"
                      >
                        <step.icon className="h-8 w-8 text-white" />
                      </motion.div>
                    </div>
                    
                    <div className="mt-8 text-center">
                      <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                      <p className="text-gray-600 mb-6">{step.description}</p>
                      
                      {/* Interactive Demo Element */}
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: step.animationDelay + 0.4 }}
                        className="bg-accent/20 rounded-lg p-6 mb-4"
                      >
                        <div className="flex items-center justify-center mb-3">
                          <Globe className="h-6 w-6 text-primary mr-2" />
                          <span className="text-sm font-medium">{step.demoText}</span>
                        </div>
                        <div className="text-lg font-semibold text-primary">
                          {step.highlight}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  
                  {index < 2 && (
                    <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-20">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: step.animationDelay + 0.6 }}
                        className="bg-white rounded-full p-2 shadow-lg"
                      >
                        <ArrowRight className="h-6 w-6 text-primary" />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </ErrorBoundary>
  );
};

export default HowItWorks;
