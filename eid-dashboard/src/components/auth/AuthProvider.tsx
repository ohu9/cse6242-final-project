"use client";

import { fetchWithAuth } from "@/lib/fetcher";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: { email: string; picture?: string } | null;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  checkAuth: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ email: string; picture?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = async () => {
    try {
      await fetchWithAuth("/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      window.location.href = "/";
    }
  };

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const data = await fetchWithAuth("/me");
      console.log("checking auth");
      if (data != null && data.authenticated) {
        setUser({ email: data.email, picture: data.picture });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // can set up periodic check here
    checkAuth();
  }, []);

  return <AuthContext.Provider value={{ user, isLoading, checkAuth, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
