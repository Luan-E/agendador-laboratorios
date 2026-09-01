"use client";

import { useState, useEffect, useCallback } from "react";
import type { SlotGrade, MensagemState, Agendamento } from "@/types/agendador";
import {
  fetchGrade,
  criarAgendamento,
  editarAgendamento,
  cancelarAgendamento,
  buscarMeusAgendamentos,
} from "@/services/agendador";

export function useAgendador() {
  const [laboratorio, setLaboratorio] = useState<number>(1);
  const [data, setData] = useState<string>(new Date().toISOString().split("T")[0]);
  const [grade, setGrade] = useState<SlotGrade[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [mensagem, setMensagem] = useState<MensagemState | null>(null);

  const carregarGrade = useCallback(async () => {
    setLoading(true);
    setMensagem(null);
    try {
      const result = await fetchGrade(laboratorio, data);
      setGrade(result.grade || []);
    } catch {
      setMensagem({ tipo: "erro", texto: "Não foi possível carregar a grade de horários." });
    } finally {
      setLoading(false);
    }
  }, [laboratorio, data]);

  useEffect(() => {
    carregarGrade();
  }, [carregarGrade]);

  const agendar = async (nomeUsuario: string, motivo: string, slot: SlotGrade) => {
    setMensagem(null);
    try {
      await criarAgendamento({
        nomeUsuario,
        laboratorio: Number(laboratorio),
        data,
        horarioInicial: slot.inicio,
        horarioFinal: slot.fim,
        motivo,
      });
      setMensagem({ tipo: "sucesso", texto: "Laboratório agendado com sucesso!" });
      await carregarGrade();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro ao agendar.";
      setMensagem({ tipo: "erro", texto: message });
    }
  };

  const editar = async (id: number, nomeUsuario: string, motivo: string, slot: SlotGrade) => {
    setMensagem(null);
    try {
      await editarAgendamento(id, {
        nomeUsuario,
        laboratorio: Number(laboratorio),
        data,
        horarioInicial: slot.inicio,
        horarioFinal: slot.fim,
        motivo,
      });
      setMensagem({ tipo: "sucesso", texto: "Agendamento atualizado com sucesso!" });
      await carregarGrade();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro ao editar.";
      setMensagem({ tipo: "erro", texto: message });
    }
  };

  const cancelar = async (id: number) => {
    setMensagem(null);
    try {
      await cancelarAgendamento(id);
      setMensagem({ tipo: "sucesso", texto: "Agendamento cancelado com sucesso!" });
      await carregarGrade();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro ao cancelar.";
      setMensagem({ tipo: "erro", texto: message });
    }
  };

  const meusAgendamentos = async (nomeUsuario: string): Promise<Agendamento[]> => {
    return buscarMeusAgendamentos(nomeUsuario);
  };

  return {
    laboratorio,
    setLaboratorio,
    data,
    setData,
    grade,
    loading,
    mensagem,
    setMensagem,
    agendar,
    editar,
    cancelar,
    meusAgendamentos,
    carregarGrade,
  };
}
