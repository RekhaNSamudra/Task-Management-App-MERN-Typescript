import type { Task } from "../types/task";

interface TaskFormProps {
  title: string;
  description: string;
  loading: boolean;
  editingTask: Task | null;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

const TaskForm = ({
  title,
  description,
  loading,
  editingTask,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
  onCancel,
}: TaskFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="mb-6 rounded-xl bg-white p-5 shadow"
    >
      <h2 className="mb-4 text-xl font-semibold">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          className="rounded border p-3"
          placeholder="Task title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          required
          disabled={loading}
        />

        <input
          className="rounded border p-3"
          placeholder="Task description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          disabled={loading}
          className="rounded bg-linear-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white transition hover:from-blue-700 hover:to-purple-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {editingTask ? "Update Task" : "Add Task"}
        </button>

        {editingTask && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded bg-slate-500 px-5 py-3 font-semibold text-white transition hover:bg-slate-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
