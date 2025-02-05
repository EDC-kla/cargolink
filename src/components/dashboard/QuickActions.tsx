import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Package, BarChart3, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Book Shipping Space",
      description: "Find and book available cargo space quickly",
      icon: Calendar,
      color: "bg-blue-500",
      action: () => navigate("/marketplace"),
    },
    {
      title: "List Available Space",
      description: "Create a new shipment listing step by step",
      icon: Package,
      color: "bg-green-500",
      action: () => navigate("/marketplace?action=create"),
    },
    {
      title: "View Activity",
      description: "Check your shipping statistics and history",
      icon: BarChart3,
      color: "bg-purple-500",
      action: () => navigate("/marketplace?tab=my-shipments"),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
    >
      {quickActions.map((action) => (
        <Card
          key={action.title}
          className="p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          onClick={action.action}
        >
          <div className="flex flex-col h-full">
            <div className={`p-4 rounded-xl ${action.color} bg-opacity-10 w-fit mb-4`}>
              <action.icon className={`h-8 w-8 text-white ${action.color}`} />
            </div>
            <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
            <p className="text-gray-600 flex-grow">{action.description}</p>
            <Button
              variant="ghost"
              className="mt-4 w-full justify-between hover:bg-gray-50"
              onClick={action.action}
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </Card>
      ))}
    </motion.div>
  );
};

export default QuickActions;