import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DashboardStats from "@/components/dashboard/DashboardStats";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { Booking, Shipment, TransportMode, BookingStatus } from "@/types/database.types";

const Dashboard = () => {
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
      
      // Transform the data to match the Booking type
      return data.map((booking): Booking => ({
        ...booking,
        status: (booking.status || 'pending') as BookingStatus,
      }));
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
      
      // Transform the data to match the Shipment type
      return data.map((shipment): Shipment => ({
        ...shipment,
        transport_mode: (shipment.transport_mode || 'sea') as TransportMode,
      }));
    },
  });

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

      <DashboardStats bookings={bookings} shipments={shipments} />
      <QuickActions />
      <RecentActivity bookings={bookings} shipments={shipments} />
    </div>
  );
};

export default Dashboard;