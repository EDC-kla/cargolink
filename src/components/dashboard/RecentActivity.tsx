import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Booking, Shipment } from "@/types/database.types";

interface RecentActivityProps {
  bookings: Booking[] | undefined;
  shipments: Shipment[] | undefined;
}

const RecentActivity = ({ bookings, shipments }: RecentActivityProps) => {
  const navigate = useNavigate();

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
  );
};

export default RecentActivity;