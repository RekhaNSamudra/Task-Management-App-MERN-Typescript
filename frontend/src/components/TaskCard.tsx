import type { Task } from "../types/task";

interface TaskCardProps {
  task: Task;
  loading: boolean;
  onEdit: (task: Task) => void;
  onToggleStatus: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard = ({
  task,
  loading,
  onEdit,
  onToggleStatus,
  onDelete,
}: TaskCardProps) => {
  return (
    <div className="rounded-xl bg-white p-5 shadow transition hover:shadow-md md:flex md:items-center md:justify-between">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>

        <p className="mt-1 text-slate-600">{task.description}</p>

        <span
          className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-medium ${task.status === "completed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
            }`}
        >
          {task.status}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 md:mt-0">
        <button
          onClick={() => onEdit(task)}
          disabled={loading}
          className="rounded bg-yellow-500 px-4 py-2 text-white transition hover:bg-yellow-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Edit
        </button>

        <button
          disabled={task.status === "completed" || loading}
          onClick={() => onToggleStatus(task)}
          className={`rounded px-4 py-2 text-white transition active:scale-95 ${task.status === "completed"
              ? "cursor-not-allowed bg-gray-400"
              : "bg-green-500 hover:bg-green-600 disabled:opacity-50"
            }`}
        >
          {task.status === "completed" ? "Completed" : "Mark Completed"}
        </button>

        <button
          onClick={() => onDelete(task._id)}
          disabled={loading}
          className="rounded bg-red-400 px-4 py-2 text-white transition hover:bg-red-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
