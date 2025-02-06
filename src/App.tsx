import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Marketplace from "@/pages/Marketplace";
import CreateShipment from "@/pages/CreateShipment";
import NotFound from "@/pages/NotFound";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Navbar from "@/components/Navbar";
import AppSidebar from "@/components/layout/AppSidebar";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  const showSidebar = location.pathname !== "/";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {showSidebar && <AppSidebar />}
      <main className={`${showSidebar ? 'ml-[280px]' : ''} pt-16`}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/marketplace/*" element={<Marketplace />} />
          <Route path="/create-shipment" element={<CreateShipment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;