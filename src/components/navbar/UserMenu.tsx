import { Link, useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { LogOut, LogIn } from "lucide-react";

interface UserMenuProps {
  user: User | null;
  loading: boolean;
}

const UserMenu = ({ user, loading }: UserMenuProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <Link
          to="/profile"
          className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium hidden sm:block"
        >
          Profile
        </Link>
        <span className="text-sm text-gray-600 hidden sm:block">
          {user.email}
        </span>
        <Button
          variant="outline"
          onClick={handleLogout}
          disabled={loading}
          className="flex items-center space-x-2"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:block">Logout</span>
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => navigate("/auth")}
      className="flex items-center space-x-2"
    >
      <LogIn className="h-4 w-4" />
      <span>Login</span>
    </Button>
  );
};

export default UserMenu;