import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    company_name: "",
    contact_person: "",
    phone: "",
    website: "",
    office_address: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      if (data) {
        setProfile({
          company_name: data.company_name || "",
          contact_person: data.contact_person || "",
          phone: data.phone || "",
          website: data.website || "",
          office_address: data.office_address || "",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from("profiles")
        .update(profile)
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your profile has been updated successfully.",
      });
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

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-bold mb-2">Profile</h1>
        <p className="text-gray-600">Manage your company profile and contact information</p>
      </motion.div>

      <Card className="p-6">
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div>
            <label htmlFor="company-name" className="block text-sm font-medium mb-1">
              Company Name
            </label>
            <Input
              id="company-name"
              value={profile.company_name}
              onChange={(e) => setProfile({ ...profile, company_name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="contact-person" className="block text-sm font-medium mb-1">
              Contact Person
            </label>
            <Input
              id="contact-person"
              value={profile.contact_person}
              onChange={(e) => setProfile({ ...profile, contact_person: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone
            </label>
            <Input
              id="phone"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="website" className="block text-sm font-medium mb-1">
              Website
            </label>
            <Input
              id="website"
              value={profile.website}
              onChange={(e) => setProfile({ ...profile, website: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="office-address" className="block text-sm font-medium mb-1">
              Office Address
            </label>
            <Input
              id="office-address"
              value={profile.office_address}
              onChange={(e) => setProfile({ ...profile, office_address: e.target.value })}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Profile;