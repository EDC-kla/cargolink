import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Package, Ship, Plane } from "lucide-react";
import { Booking, Shipment } from "@/types/database.types";

interface DashboardStatsProps {
  bookings: Booking[] | undefined;
  shipments: Shipment[] | undefined;
}

const DashboardStats = ({ bookings, shipments }: DashboardStatsProps) => {
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

  return (
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
  );
};

export default DashboardStats;