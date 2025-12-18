import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("ttb_auth");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed.user);
      setAccessToken(parsed.accessToken);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user && accessToken) {
      localStorage.setItem(
        "ttb_auth",
        JSON.stringify({ user, accessToken })
      );
    } else {
      localStorage.removeItem("ttb_auth");
    }
  }, [user, accessToken]);

  const login = async (email, password) => {
    const res = await axios.post("/api/auth/login", { email, password }, { withCredentials: true });
    setUser(res.data.user);
    setAccessToken(res.data.accessToken);
  };

  const signup = async (name, email, password) => {
    const res = await axios.post("/api/auth/register", { name, email, password }, { withCredentials: true });
    setUser(res.data.user);
    setAccessToken(res.data.accessToken);
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
    } catch {
      // ignore
    }
    setUser(null);
    setAccessToken(null);
  };

  const value = {
    user,
    accessToken,
    loading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);


