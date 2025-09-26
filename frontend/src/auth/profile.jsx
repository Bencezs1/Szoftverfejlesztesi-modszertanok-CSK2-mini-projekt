import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export default function Profile() {
  const { apiFetch } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await apiFetch("/api/profile/");
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err)
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <p><strong>Felhasználó név:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Csatlakozás dátuma:</strong> {new Date(profile.date_joined).toLocaleDateString()}</p>

      {/* Hidden: just keep id in state, don’t render */}
      {/* profile.id is still available in JS if you need it */}
    </div>
  );
}
