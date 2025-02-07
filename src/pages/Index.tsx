import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import { Ship, ShieldCheck, Banknote, Globe, Timer, Scale, Package, FileCheck, Truck } from "lucide-react";

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

  const howItWorks = [
    {
      icon: Package,
      title: "List Your Cargo Space",
      description: "Share details about your available air or sea freight capacity, routes, and pricing."
    },
    {
      icon: FileCheck,
      title: "Get Instant Bookings",
      description: "Shippers can book your space instantly with secure digital documentation."
    },
    {
      icon: Truck,
      title: "Track & Earn",
      description: "Monitor shipments in real-time and get paid securely through our platform."
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero onGetStarted={handleGetStarted} />
      
      <section className="py-20 bg-gradient-to-b from-white to-accent/10">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 text-center mb-16 max-w-2xl mx-auto">
              Three simple steps to start moving cargo across Africa
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {howItWorks.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center p-6"
                >
                  <div className="inline-flex p-3 rounded-full bg-accent/20 mb-4">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Ship Smarter Across Africa
            </h2>
            <p className="text-lg text-gray-600 text-center mb-16 max-w-2xl mx-auto">
              Join thousands of businesses saving time and money on their African shipping operations
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
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Shipping?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join Africa's fastest-growing logistics marketplace today
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGetStarted}
                className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Get Started Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/marketplace')}
                className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
              >
                Explore Marketplace
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-primary/5 py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">AfriLogix</h3>
              <p className="text-sm text-gray-600">
                Africa's digital logistics marketplace connecting shippers with available cargo space.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Solutions</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Air Freight</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Sea Freight</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Customs Clearance</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Cargo Insurance</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">About Us</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Contact</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Partners</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Blog</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Terms of Service</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} AfriLogix. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
