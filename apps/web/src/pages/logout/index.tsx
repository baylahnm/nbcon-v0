import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@nbcon/config";

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleLogout() {
      await supabase.auth.signOut();
      navigate("/");
    }
    handleLogout();
  }, [navigate]);

  return (
    <div className="p-6">
      <p>Signing out...</p>
    </div>
  );
}

