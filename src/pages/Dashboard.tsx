import { useQuery } from "@tanstack/react-query";
import { shipmentService } from "@/services/api";
import { bookingService } from "@/services/bookingService";
import DashboardStats from "@/components/dashboard/DashboardStats";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { data: shipments, isLoading: shipmentsLoading } = useQuery({
    queryKey: ['shipments'],
    queryFn: shipmentService.listShipments
  });

  const { data: bookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: bookingService.listUserBookings
  });

  if (shipmentsLoading || bookingsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>

        <DashboardStats bookings={bookings} shipments={shipments} />
        <QuickActions />
        <RecentActivity bookings={bookings} shipments={shipments} />
      </motion.div>
    </div>
  );
};

export default Dashboard;