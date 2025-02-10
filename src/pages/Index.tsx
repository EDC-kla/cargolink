
import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import Features from "@/components/features/Features";
import HowItWorks from "@/components/how-it-works/HowItWorks";
import Footer from "@/components/footer/Footer";
import { Waves, Flower2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/auth");
  };

  return (
    <div className="min-h-screen">
      <Hero onGetStarted={handleGetStarted} />
      
      {/* Sections Container */}
      <div className="relative">
        {/* Decorative divider */}
        <div className="absolute top-0 left-0 right-0">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
        
        {/* How It Works Section */}
        <section className="pt-8 pb-16 bg-gradient-to-b from-white to-accent/5 relative">
          <div className="absolute top-0 right-0 text-primary/5 -z-10">
            <Flower2 size={120} />
          </div>
          <div className="container mx-auto px-4">
            <HowItWorks />
          </div>
        </section>

        {/* Decorative waves divider */}
        <div className="relative h-16 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-primary/10">
            <Waves className="w-full h-16" />
          </div>
        </div>

        {/* Features Section with different background */}
        <section className="py-16 bg-gradient-to-br from-accent/5 to-primary/5 relative">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none"
               style={{
                 backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
               }}
          />
          <div className="container mx-auto px-4 relative">
            <Features />
          </div>
        </section>
      </div>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-accent/10 to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to Optimize Your Global Shipping?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join the marketplace revolutionizing international trade through Africa
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

      <Footer />
    </div>
  );
};

export default Index;

