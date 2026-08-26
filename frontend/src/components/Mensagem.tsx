import type { MensagemState } from "@/types/agendador";

interface MensagemProps {
  mensagem: MensagemState;
}

export default function Mensagem({ mensagem }: MensagemProps) {
  return (
    <div
      className={`p-4 rounded-lg font-medium ${
        mensagem.tipo === "sucesso"
          ? "bg-emerald-100 text-emerald-800"
          : "bg-rose-100 text-rose-800"
      }`}
    >
      {mensagem.texto}
    </div>
  );
}
