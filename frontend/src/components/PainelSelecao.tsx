interface PainelSelecaoProps {
  laboratorio: number;
  data: string;
  onLaboratorioChange: (value: number) => void;
  onDataChange: (value: string) => void;
}

export default function PainelSelecao({
  laboratorio,
  data,
  onLaboratorioChange,
  onDataChange,
}: PainelSelecaoProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-semibold mb-2">Laboratório (1 a 10)</label>
        <select
          value={laboratorio}
          onChange={(e) => onLaboratorioChange(Number(e.target.value))}
          className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Laboratório {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Data da Reserva</label>
        <input
          type="date"
          value={data}
          onChange={(e) => onDataChange(e.target.value)}
          className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
        />
      </div>
    </div>
  );
}
