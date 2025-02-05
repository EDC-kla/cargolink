import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Marketplace from "@/pages/Marketplace";
import CreateShipment from "@/pages/CreateShipment";
import Auth from "@/pages/Auth";

const App = () => {
  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <Routes>
        <Route path="/" element={<Marketplace />} />
        <Route path="/create-shipment" element={<CreateShipment />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
};

export default App;
