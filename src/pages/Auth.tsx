import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, MailCheck, Ship, Plane } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedEmail, setConfirmedEmail] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setConfirmedEmail(email);
        setShowConfirmation(true);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        // Check if onboarding is completed
        const { data: profile } = await supabase
          .from('profiles')
          .select('onboarding_completed')
          .single();
        
        if (profile?.onboarding_completed) {
          navigate("/marketplace");
        } else {
          navigate("/onboarding");
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8 text-center">
          <MailCheck className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Check your email</h2>
          <Alert className="mb-4">
            <AlertTitle>Confirmation email sent!</AlertTitle>
            <AlertDescription>
              We've sent a confirmation email to <strong>{confirmedEmail}</strong>.
              Please check your inbox and follow the instructions to complete your
              registration.
            </AlertDescription>
          </Alert>
          <p className="text-gray-600 mb-6">
            Once you've confirmed your email, you can sign in to access the marketplace.
          </p>
          <Button
            onClick={() => {
              setShowConfirmation(false);
              setIsSignUp(false);
            }}
            className="w-full"
          >
            Return to Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="p-4">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex justify-center space-x-4 mb-6">
              <Ship className="h-8 w-8 text-blue-500" />
              <Plane className="h-8 w-8 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">
              {isSignUp ? "Join the Marketplace" : "Welcome Back"}
            </h2>
            <p className="text-center text-gray-600 mb-6">
              {isSignUp
                ? "Create an account to start booking and offering cargo space"
                : "Sign in to access your shipments and bookings"}
            </p>
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Business Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <Button className="w-full" type="submit" disabled={loading}>
                {loading
                  ? "Please wait..."
                  : isSignUp
                  ? "Create Account"
                  : "Sign In"}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-blue-600 hover:underline"
              >
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "New to the platform? Create an account"}
              </button>
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                {isSignUp
                  ? "By signing up, you can both book cargo space and list your available capacity"
                  : "Access your dashboard to manage shipments and bookings"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
