
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  BarChart3,
  Calendar,
  Package,
  Ship,
  Plane,
  ArrowRight,
  Clock,
  MapPin,
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
      description: "Your current shipping orders"
    },
    {
      title: "My Listed Shipments",
      value: shipments?.length || 0,
      icon: Ship,
      color: "text-green-500",
      description: "Space you've listed for others"
    },
    {
      title: "Air Freight",
      value: shipments?.filter((s) => s.transport_mode === "air").length || 0,
      icon: Plane,
      color: "text-purple-500",
      description: "Your air shipments"
    },
    {
      title: "Sea Freight",
      value: shipments?.filter((s) => s.transport_mode === "sea").length || 0,
      icon: Ship,
      color: "text-orange-500",
      description: "Your sea shipments"
    },
  ];

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

  const recentActivity = [
    {
      title: "Latest Bookings",
      icon: Clock,
      items: bookings?.slice(0, 3).map(booking => ({
        id: booking.id,
        title: `Booking #${booking.id.slice(0, 8)}`,
        subtitle: `${booking.space_booked} CBM - ${booking.status}`,
        action: () => navigate("/marketplace?tab=my-bookings")
      })) || []
    },
    {
      title: "Recent Shipments",
      icon: MapPin,
      items: shipments?.slice(0, 3).map(shipment => ({
        id: shipment.id,
        title: `${shipment.origin} → ${shipment.destination}`,
        subtitle: `${shipment.available_space} CBM available`,
        action: () => navigate("/marketplace?tab=my-shipments")
      })) || []
    }
  ];

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-2"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome to Your Dashboard</h1>
        <p className="text-gray-600">Manage your shipping activities in one place</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      >
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-col space-y-4">
              <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10 w-fit`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
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

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {recentActivity.map((section) => (
          <Card key={section.title} className="p-6">
            <div className="flex items-center mb-4">
              <section.icon className="h-5 w-5 text-gray-500 mr-2" />
              <h3 className="text-lg font-semibold">{section.title}</h3>
            </div>
            <div className="space-y-4">
              {section.items.length > 0 ? (
                section.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                    onClick={item.action}
                  >
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.subtitle}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No recent activity</p>
              )}
            </div>
          </Card>
        ))}
      </motion.div>
    </div>
  );
};

export default Dashboard;
