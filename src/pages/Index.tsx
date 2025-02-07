
import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import { Ship, ShieldCheck, Banknote, Globe, Timer, Scale, Package, FileCheck, Truck } from "lucide-react";
import NavLogo from "@/components/navbar/NavLogo";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/auth");
  };

  const features = [
    {
      icon: Ship,
      title: "Pan-African Network",
      description: "Access major trade routes connecting African markets, with real-time tracking and updates."
    },
    {
      icon: ShieldCheck,
      title: "Verified Partners",
      description: "Join our vetted community of African carriers and shippers with proven track records."
    },
    {
      icon: Banknote,
      title: "Cost Savings",
      description: "Save up to 40% on shipping costs by booking directly with trusted carriers."
    },
    {
      icon: Globe,
      title: "Real-Time Updates",
      description: "Track shipments 24/7 with live location and customs status notifications."
    },
    {
      icon: Timer,
      title: "Quick Booking",
      description: "Book cargo space instantly with automated documentation and secure payments."
    },
    {
      icon: Scale,
      title: "Flexible Solutions",
      description: "From single pallets to full containers, we accommodate cargo of all sizes."
    }
  ];

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

  return (
    <div className="min-h-screen">
      <Hero onGetStarted={handleGetStarted} />
      
      <section className="py-24 bg-gradient-to-b from-white to-accent/10">
        <div className="container mx-auto px-4">
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
        </div>
      </section>

      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">
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

      <footer className="bg-white py-16 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center mb-12">
              <NavLogo />
              <p className="mt-4 text-gray-600 text-center max-w-md">
                Connecting Africa through innovative digital logistics solutions. Making cargo shipping simple, efficient, and affordable.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Solutions</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Air Freight</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Sea Freight</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Customs Clearance</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Cargo Insurance</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">About Us</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Contact</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Partners</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Blog</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Help Center</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">FAQs</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">API</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Cookie Policy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Compliance</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-8 text-center">
              <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} GogoCargo. Transforming African logistics through technology.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
