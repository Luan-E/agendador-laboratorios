"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Usuario } from "@/services/auth";
import { verificarToken, logout as logoutApi } from "@/services/auth";

interface AuthContextType {
  usuario: Usuario | null;
  loading: boolean;
  setAuth: (usuario: Usuario) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verificarToken()
      .then((user) => {
        setUsuario(user);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const setAuth = useCallback((user: Usuario) => {
    setUsuario(user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } catch {}
    setUsuario(null);
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, loading, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
