"use client";

import { useState } from "react";
import type { SlotGrade } from "@/types/agendador";

interface ModalAgendamentoProps {
  slot: SlotGrade;
  laboratorio: number;
  data: string;
  nomeInicial?: string;
  onConfirm: (nomeUsuario: string, motivo: string) => void;
  onCancel: () => void;
}

export default function ModalAgendamento({
  slot,
  laboratorio,
  data,
  nomeInicial = "",
  onConfirm,
  onCancel,
}: ModalAgendamentoProps) {
  const [nomeUsuario, setNomeUsuario] = useState(nomeInicial);
  const [motivo, setMotivo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeUsuario.trim() || !motivo.trim()) return;
    onConfirm(nomeUsuario, motivo);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-xl max-w-md w-full space-y-4 shadow-xl">
        <h3 className="text-xl font-bold text-slate-900">
          Reservar Laboratório {laboratorio}
        </h3>
        <p className="text-sm text-slate-600">
          <strong>Data:</strong> {data} <br />
          <strong>Horário:</strong> {slot.inicio} às {slot.fim}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Nome do Responsável</label>
            <input
              type="text"
              required
              placeholder="Ex: Prof. Carlos"
              value={nomeUsuario}
              onChange={(e) => setNomeUsuario(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Motivo do Agendamento</label>
            <input
              type="text"
              required
              placeholder="Ex: Aula prática de Redes"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              Confirmar Reserva
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
