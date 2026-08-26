export interface SlotGrade {
  inicio: string;
  fim: string;
  turno: "matutino" | "vespertino" | "noturno";
  reservado: boolean;
  usuario: string | null;
  idAgendamento: number | null;
}

export interface Agendamento {
  id: number;
  nomeUsuario: string;
  laboratorio: number;
  data: string;
  horarioInicial: string;
  horarioFinal: string;
  motivo: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GradeResponse {
  laboratorio: number;
  data: string;
  grade: SlotGrade[];
}

export interface MensagemState {
  tipo: "sucesso" | "erro";
  texto: string;
}
