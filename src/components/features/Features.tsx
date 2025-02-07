
import { motion } from "framer-motion";
import { Ship, ShieldCheck, Banknote, Globe, Timer, Scale } from "lucide-react";

const features = [
  {
    icon: Ship,
    title: "Global Network",
    description: "Connect with verified carriers on major trade routes linking Africa to international markets."
  },
  {
    icon: ShieldCheck,
    title: "Trusted Partners",
    description: "Access our network of verified global carriers and shippers with proven track records."
  },
  {
    icon: Banknote,
    title: "Cost Optimization",
    description: "Save up to 40% on shipping costs by sharing cargo space and booking directly."
  },
  {
    icon: Globe,
    title: "Real-Time Visibility",
    description: "Track shipments globally with live updates on location, customs, and delivery status."
  },
  {
    icon: Timer,
    title: "Instant Booking",
    description: "Book cargo space with automated documentation and secure cross-border payments."
  },
  {
    icon: Scale,
    title: "Flexible Solutions",
    description: "Find the right space for any cargo size, from parcels to full containers."
  }
];

const Features = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
        Why Choose GogoCargo
      </h2>
      <p className="text-lg text-gray-600 text-center mb-16 max-w-2xl mx-auto">
        Join thousands of businesses transforming their African shipping operations
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group hover:bg-accent/5"
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <feature.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Features;
