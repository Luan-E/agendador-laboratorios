const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

import type { GradeResponse, Agendamento } from "@/types/agendador";

export async function fetchGrade(laboratorio: number, data: string): Promise<GradeResponse> {
  const res = await fetch(`${API_URL}/agendador/grade?laboratorio=${laboratorio}&data=${data}`, {
    credentials: "include",
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.erro || "Erro ao buscar a disponibilidade.");
  }
  return res.json();
}

export async function criarAgendamento(dados: {
  nomeUsuario: string;
  laboratorio: number;
  data: string;
  horarioInicial: string;
  horarioFinal: string;
  motivo: string;
}): Promise<Agendamento> {
  const res = await fetch(`${API_URL}/agendador`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(dados),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body?.erro || "Falha ao realizar agendamento.");
  return body;
}

export async function editarAgendamento(
  id: number,
  dados: {
    nomeUsuario: string;
    laboratorio: number;
    data: string;
    horarioInicial: string;
    horarioFinal: string;
    motivo: string;
  }
): Promise<Agendamento> {
  const res = await fetch(`${API_URL}/agendador/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(dados),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body?.erro || "Falha ao editar agendamento.");
  return body;
}

export async function cancelarAgendamento(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/agendador/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body?.erro || "Falha ao cancelar agendamento.");
}

export async function buscarMeusAgendamentos(nomeUsuario: string): Promise<Agendamento[]> {
  const res = await fetch(`${API_URL}/agendador/meus?nomeUsuario=${encodeURIComponent(nomeUsuario)}`, {
    credentials: "include",
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.erro || "Erro ao buscar agendamentos.");
  }
  return res.json();
}
