
import { motion } from "framer-motion";
import { Package, FileCheck, Truck } from "lucide-react";

const howItWorks = [
  {
    icon: Package,
    title: "List or Find Space",
    description: "List your available cargo space or search for shipping capacity that matches your needs."
  },
  {
    icon: FileCheck,
    title: "Book Securely",
    description: "Complete your booking with instant documentation and secure payment processing."
  },
  {
    icon: Truck,
    title: "Ship & Track",
    description: "Monitor your shipment in real-time and get updates at every step of the journey."
  }
];

const HowItWorks = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
        How GogoCargo Works
      </h2>
      <p className="text-lg text-gray-600 text-center mb-16 max-w-2xl mx-auto">
        Three simple steps to transform your African shipping experience
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {howItWorks.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div className="inline-flex p-4 rounded-full bg-accent mb-6 group-hover:scale-110 transition-transform">
              <step.icon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
            <p className="text-gray-600 leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HowItWorks;
