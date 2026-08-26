"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { usuario, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-slate-900">
          Início
        </Link>

        <div className="flex items-center gap-4">
          {usuario ? (
            <>
              <Link
                href="/meus-agendamentos"
                className="text-sm text-slate-600 hover:text-slate-900 font-medium"
              >
                Meus Agendamentos
              </Link>
              <span className="text-sm text-slate-500">{usuario.nome}</span>
              <button
                onClick={logout}
                className="text-sm text-rose-600 hover:text-rose-700 font-medium"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-slate-600 hover:text-slate-900 font-medium"
              >
                Entrar
              </Link>
              <Link
                href="/cadastro"
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg font-medium"
              >
                Cadastrar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
