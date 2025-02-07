
import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import { Ship, ShieldCheck, Banknote, Globe, Timer, Scale } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/auth");
  };

  const features = [
    {
      icon: Ship,
      title: "Book Cargo Space Instantly",
      description: "Find and book available air & sea freight space across Africa's busiest trade routes."
    },
    {
      icon: ShieldCheck,
      title: "Verified Network",
      description: "Ship with confidence through our vetted network of African carriers and forwarders."
    },
    {
      icon: Banknote,
      title: "Save Up to 40%",
      description: "Compare rates instantly and skip the middlemen. Pay securely via M-Pesa or card."
    },
    {
      icon: Globe,
      title: "Pan-African Coverage",
      description: "From Mombasa to Lagos, access major trade routes connecting African markets."
    },
    {
      icon: Timer,
      title: "Real-Time Tracking",
      description: "Track your shipments 24/7 with live updates on location and customs status."
    },
    {
      icon: Scale,
      title: "Any Size Welcome",
      description: "Whether it's one pallet or multiple containers, we've got space for your cargo."
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero onGetStarted={handleGetStarted} />
      
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-16">
              Ship Smarter Across Africa
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex gap-4 group hover:bg-accent/5 p-6 rounded-lg transition-colors"
                >
                  <div className="flex-shrink-0">
                    <feature.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
