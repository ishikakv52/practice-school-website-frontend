"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { apiRequest } from "@/lib/api";

export type AuthUser = {
  id: string | number;
  name: string;
  email: string;
  role: "admin" | "parent" | "student";
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  setUser: (user: AuthUser | null) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const mutationCount = useRef(0);

  const setUser = useCallback((nextUser: AuthUser | null) => {
    mutationCount.current += 1;
    setUserState(nextUser);
    setLoading(false);
  }, []);

  useEffect(() => {
    const requestMutationCount = mutationCount.current;

    apiRequest("/api/auth/me")
      .then((result) => {
        if (requestMutationCount === mutationCount.current) {
          setUserState(result.data.user);
        }
      })
      .catch(() => {
        if (requestMutationCount === mutationCount.current) {
          setUserState(null);
        }
      })
      .finally(() => {
        if (requestMutationCount === mutationCount.current) {
          setLoading(false);
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}