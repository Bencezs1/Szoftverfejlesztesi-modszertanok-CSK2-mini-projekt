import { createContext, useState, useEffect, useRef } from "react";


const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [access, setAccess] = useState(localStorage.getItem("access"));
  const [refresh, setRefresh] = useState(localStorage.getItem("refresh"));
  const refreshIntervalRef = useRef(null);

  // Login function
  const login = ({ access: newAccess, refresh: newRefresh }) => {
    localStorage.setItem("access", newAccess);
    localStorage.setItem("refresh", newRefresh);
    setAccess(newAccess);
    setRefresh(newRefresh);
  };

  // Logout function
  const logout = () => {
    localStorage.clear();
    setAccess(null);
    setRefresh(null);
    if (refreshIntervalRef.current) clearInterval(refreshIntervalRef.current);
  };

  // Refresh token helper
  const refreshToken = async () => {
    if (!refresh) throw new Error("No refresh token available");

    const res = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (!res.ok) {
      logout();
      throw new Error("Session expired");
    }

    const data = await res.json();
    localStorage.setItem("access", data.access);
    setAccess(data.access);
    return data.access;
  };

  // API wrapper with automatic refresh on 401
  const apiFetch = async (endpoint, options = {}) => {
    let token = access;

    options.headers = {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    let res = await fetch(`http://127.0.0.1:8000${endpoint}`, options);

    if (res.status === 401) {
      try {
        token = await refreshToken();
        options.headers.Authorization = `Bearer ${token}`;
        res = await fetch(`http://127.0.0.1:8000${endpoint}`, options);
      } catch (err) {
        logout();
        throw err;
      }
    }

    return res;
  };

  // Automatically refresh the access token every 4 minutes
  useEffect(() => {
    if (refresh && !refreshIntervalRef.current) {
      refreshIntervalRef.current = setInterval(() => {
        refreshToken().catch(() => {
          // failed refresh will already log out
        });
      }, 4 * 60 * 1000); // 4 minutes
    }

    return () => {
      if (refreshIntervalRef.current) clearInterval(refreshIntervalRef.current);
    };
  }, [refresh]);

  const value = { access, refresh, login, logout, apiFetch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export {AuthContext}