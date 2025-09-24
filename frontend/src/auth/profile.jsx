import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

export default function Profile() {
  const { apiFetch } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await apiFetch("/api/profile/");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadProfile();
  }, []);

  return (
    <div></div>
  )
}
