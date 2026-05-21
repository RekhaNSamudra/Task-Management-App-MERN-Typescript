import type { TaskStatus } from "../types/task";

interface FilterButtonsProps {
  filter: "all" | TaskStatus;
  onFilterChange: (filter: "all" | TaskStatus) => void;
}

const FilterButtons = ({ filter, onFilterChange }: FilterButtonsProps) => {
  return (
    <div className="mb-4 flex flex-wrap gap-3">
      <button
        onClick={() => onFilterChange("all")}
        className={`rounded border px-4 py-2 transition active:scale-95 ${filter === "all"
            ? "bg-blue-600 text-white"
            : "bg-white text-slate-700 hover:bg-slate-50"
          }`}
      >
        All
      </button>

      <button
        onClick={() => onFilterChange("pending")}
        className={`rounded border px-4 py-2 transition active:scale-95 ${filter === "pending"
            ? "bg-blue-600 text-white"
            : "bg-white text-slate-700 hover:bg-slate-50"
          }`}
      >
        Pending
      </button>

      <button
        onClick={() => onFilterChange("completed")}
        className={`rounded border px-4 py-2 transition active:scale-95 ${filter === "completed"
            ? "bg-blue-600 text-white"
            : "bg-white text-slate-700 hover:bg-slate-50"
          }`}
      >
        Completed
      </button>
    </div>
  );
};

export default FilterButtons;
