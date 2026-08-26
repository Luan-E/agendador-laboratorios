import type { SlotGrade } from "@/types/agendador";
import SlotCard from "./SlotCard";

interface GradeHorariosProps {
  grade: SlotGrade[];
  loading: boolean;
  slotSelecionado: SlotGrade | null;
  onSlotSelect: (slot: SlotGrade) => void;
  onCancel?: (id: number) => void;
}

const TURNOS = ["matutino", "vespertino", "noturno"] as const;

const TURNOS_LABELS: Record<(typeof TURNOS)[number], string> = {
  matutino: "Matutino",
  vespertino: "Vespertino",
  noturno: "Noturno",
};

export default function GradeHorarios({
  grade,
  loading,
  slotSelecionado,
  onSlotSelect,
  onCancel,
}: GradeHorariosProps) {
  if (loading) {
    return (
      <div className="text-center py-12 text-slate-500">
        Consultando disponibilidade no banco...
      </div>
    );
  }

  const turnos = {
    matutino: grade.filter((s) => s.turno === "matutino"),
    vespertino: grade.filter((s) => s.turno === "vespertino"),
    noturno: grade.filter((s) => s.turno === "noturno"),
  };

  return (
    <div className="space-y-6">
      {TURNOS.map((turno) => (
        <div key={turno} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b">
            Turno {TURNOS_LABELS[turno]}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {turnos[turno].map((slot) => (
              <SlotCard
                key={slot.inicio}
                slot={slot}
                isSelected={slotSelecionado?.inicio === slot.inicio}
                onSelect={onSlotSelect}
                onCancel={onCancel}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
