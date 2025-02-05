import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ShipmentList from "@/components/ShipmentList";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGetStarted = () => {
    if (user) {
      navigate("/marketplace");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero onGetStarted={handleGetStarted} />
        <ShipmentList />
      </main>
    </div>
  );
};

export default Index;