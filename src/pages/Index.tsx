import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/auth");
  };

  return (
    <div className="min-h-screen">
      <Hero onGetStarted={handleGetStarted} />
    </div>
  );
};

export default Index;