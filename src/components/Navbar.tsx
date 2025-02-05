import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ship, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/auth");
      toast({
        title: "Logged out successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Ship className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">CargoLink</span>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button variant="ghost">How it Works</Button>
                <Button variant="ghost">Find Shipments</Button>
                <Button variant="default" className="bg-secondary hover:bg-secondary/90">
                  List Your Cargo
                </Button>
                <Button variant="ghost" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate("/auth")}>Login</Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;