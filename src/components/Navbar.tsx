import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import NavLogo from "./navbar/NavLogo";
import NavLinks from "./navbar/NavLinks";
import UserMenu from "./navbar/UserMenu";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <NavLogo />
            <NavLinks user={user} />
          </div>
          <div className="flex items-center space-x-4">
            <UserMenu user={user} loading={loading} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;