import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ShipmentList from "@/components/ShipmentList";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <ShipmentList />
      </main>
    </div>
  );
};

export default Index;