
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  BarChart3,
  Calendar,
  Package,
  Ship,
  Plane,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const navigate = useNavigate();

  const { data: bookings } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id);
      if (error) throw error;
      return data;
    },
  });

  const { data: shipments } = useQuery({
    queryKey: ["shipments"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      const { data, error } = await supabase
        .from("shipments")
        .select("*")
        .eq("created_by", user.id);
      if (error) throw error;
      return data;
    },
  });

  const stats = [
    {
      title: "Active Bookings",
      value: bookings?.length || 0,
      icon: Package,
      color: "text-blue-500",
    },
    {
      title: "My Shipments",
      value: shipments?.length || 0,
      icon: Ship,
      color: "text-green-500",
    },
    {
      title: "Air Freight",
      value: shipments?.filter((s) => s.transport_mode === "air").length || 0,
      icon: Plane,
      color: "text-purple-500",
    },
    {
      title: "Sea Freight",
      value: shipments?.filter((s) => s.transport_mode === "sea").length || 0,
      icon: Ship,
      color: "text-orange-500",
    },
  ];

  const quickActions = [
    {
      title: "Book Space",
      description: "Find and book available cargo space",
      icon: Calendar,
      action: () => navigate("/marketplace"),
    },
    {
      title: "List Shipment",
      description: "Create a new shipment listing",
      icon: Package,
      action: () => navigate("/marketplace?action=create"),
    },
    {
      title: "View Analytics",
      description: "Check your shipping statistics",
      icon: BarChart3,
      action: () => navigate("/marketplace?tab=my-shipments"),
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-600">Here's an overview of your shipping activity</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className="p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {quickActions.map((action, index) => (
          <Card
            key={action.title}
            className="p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={action.action}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <action.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg">{action.title}</h3>
              </div>
              <p className="text-gray-600 flex-grow">{action.description}</p>
              <Button
                variant="ghost"
                className="mt-4 w-full justify-between"
                onClick={action.action}
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </motion.div>
    </div>
  );
};

export default Dashboard;
