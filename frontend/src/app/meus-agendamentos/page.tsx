"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { buscarMeusAgendamentos, cancelarAgendamento } from "@/services/agendador";
import type { Agendamento } from "@/types/agendador";

export default function MeusAgendamentosPage() {
  const { usuario, loading: authLoading } = useAuth();
  const router = useRouter();
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!authLoading && !usuario) {
      router.push("/login");
    }
  }, [usuario, authLoading, router]);

  useEffect(() => {
    if (usuario) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setLoading(true);
      buscarMeusAgendamentos(usuario.nome)
        .then(setAgendamentos)
        .catch(() => setErro("Erro ao carregar agendamentos."))
        .finally(() => setLoading(false));
      /* eslint-enable react-hooks/set-state-in-effect */
    }
  }, [usuario]);

  const handleCancelar = async (id: number) => {
    try {
      await cancelarAgendamento(id);
      setAgendamentos((prev) => prev.filter((a) => a.id !== id));
    } catch {
      setErro("Erro ao cancelar agendamento.");
    }
  };

  if (authLoading || !usuario) {
    return (
      <main className="min-h-screen bg-slate-50 p-6 md:p-12">
        <div className="max-w-5xl mx-auto text-center py-12 text-slate-500">Carregando...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12 text-slate-800">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Meus Agendamentos</h1>
          <p className="text-slate-600">Visualize e gerencie seus agendamentos de laboratório.</p>
        </header>

        {erro && (
          <div className="p-4 rounded-lg bg-rose-100 text-rose-800 font-medium">{erro}</div>
        )}

        {loading ? (
          <div className="text-center py-12 text-slate-500">Carregando agendamentos...</div>
        ) : agendamentos.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
            <p className="text-slate-500">Você ainda não possui agendamentos.</p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              Fazer Agendamento
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {agendamentos.map((agendamento) => (
              <div
                key={agendamento.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900">
                    Laboratório {agendamento.laboratorio}
                  </h3>
                  <p className="text-sm text-slate-600">
                    <strong>Data:</strong> {agendamento.data}
                  </p>
                  <p className="text-sm text-slate-600">
                    <strong>Horário:</strong> {agendamento.horarioInicial} às {agendamento.horarioFinal}
                  </p>
                  <p className="text-sm text-slate-600">
                    <strong>Motivo:</strong> {agendamento.motivo}
                  </p>
                </div>

                <button
                  onClick={() => handleCancelar(agendamento.id)}
                  className="px-4 py-2 border border-rose-300 text-rose-700 rounded-lg hover:bg-rose-50 font-medium text-sm self-start"
                >
                  Cancelar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
