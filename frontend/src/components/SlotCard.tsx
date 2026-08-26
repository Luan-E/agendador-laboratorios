import type { SlotGrade } from "@/types/agendador";

interface SlotCardProps {
  slot: SlotGrade;
  isSelected: boolean;
  onSelect: (slot: SlotGrade) => void;
  onCancel?: (id: number) => void;
}

export default function SlotCard({ slot, isSelected, onSelect, onCancel }: SlotCardProps) {
  return (
    <div className="relative">
      <button
        disabled={slot.reservado}
        onClick={() => onSelect(slot)}
        className={`p-3 rounded-lg text-center transition flex flex-col justify-center items-center border w-full ${
          slot.reservado
            ? "bg-rose-50 border-rose-200 text-rose-700"
            : isSelected
            ? "bg-blue-600 border-blue-600 text-white shadow-md ring-2 ring-blue-300"
            : "bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100"
        }`}
      >
        <span className="font-semibold text-sm">
          {slot.inicio} - {slot.fim}
        </span>
        <span className="text-xs mt-1 font-medium">
          {slot.reservado ? `Reservado (${slot.usuario})` : "Livre"}
        </span>
      </button>

      {slot.reservado && slot.idAgendamento && onCancel && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCancel(slot.idAgendamento!);
          }}
          className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold hover:bg-rose-700 shadow-sm"
          title="Cancelar agendamento"
        >
          ×
        </button>
      )}
    </div>
  );
}
