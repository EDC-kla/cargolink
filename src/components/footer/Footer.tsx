
import { motion } from "framer-motion";
import NavLogo from "@/components/navbar/NavLogo";

const Footer = () => {
  return (
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
  );
};

export default Footer;
