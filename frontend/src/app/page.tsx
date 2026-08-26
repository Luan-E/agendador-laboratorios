"use client";

import { useState } from "react";
import { useAgendador } from "@/hooks/useAgendador";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import PainelSelecao from "@/components/PainelSelecao";
import Mensagem from "@/components/Mensagem";
import GradeHorarios from "@/components/GradeHorarios";
import ModalAgendamento from "@/components/ModalAgendamento";
import type { SlotGrade } from "@/types/agendador";

export default function Home() {
  const {
    laboratorio,
    setLaboratorio,
    data,
    setData,
    grade,
    loading,
    mensagem,
    agendar,
    cancelar,
  } = useAgendador();

  const { usuario } = useAuth();
  const [slotSelecionado, setSlotSelecionado] = useState<SlotGrade | null>(null);

  const handleSlotSelect = (slot: SlotGrade) => {
    if (slot.reservado) return;
    setSlotSelecionado(slot);
  };

  const handleCancelClick = (id: number) => {
    cancelar(id);
  };

  const handleConfirm = (nomeUsuario: string, motivo: string) => {
    if (!slotSelecionado) return;
    agendar(nomeUsuario, motivo, slotSelecionado);
    setSlotSelecionado(null);
  };

  const handleCloseModal = () => {
    setSlotSelecionado(null);
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12 text-slate-800">
      <div className="max-w-5xl mx-auto space-y-8">
        <Header />

        <PainelSelecao
          laboratorio={laboratorio}
          data={data}
          onLaboratorioChange={setLaboratorio}
          onDataChange={setData}
        />

        {mensagem && <Mensagem mensagem={mensagem} />}

        <GradeHorarios
          grade={grade}
          loading={loading}
          slotSelecionado={slotSelecionado}
          onSlotSelect={handleSlotSelect}
          onCancel={handleCancelClick}
        />

        {slotSelecionado && (
          <ModalAgendamento
            slot={slotSelecionado}
            laboratorio={laboratorio}
            data={data}
            nomeInicial={usuario?.nome || ""}
            onConfirm={handleConfirm}
            onCancel={handleCloseModal}
          />
        )}
      </div>
    </main>
  );
}
