import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import type { Task, TaskStatus } from "../types/task";
import ErrorAlert from "../components/ErrorAlert";
import TaskForm from "../components/TaskForm";
import FilterButtons from "../components/FilterButtons";
import TaskCard from "../components/TaskCard";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState<"all" | TaskStatus>("all");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; taskId: string | null }>({
    isOpen: false,
    taskId: null,
  });

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
      setError(null);
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to load tasks";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmitTask = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // Validate input
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (title.trim().length < 3) {
      toast.error("Title must be at least 3 characters");
      return;
    }

    setLoading(true);
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, {
          title,
          description,
          status: editingTask.status,
        });

        toast.success("Task updated");
        setEditingTask(null);
      } else {
        await api.post("/tasks", {
          title,
          description,
          status: "pending",
        });

        toast.success("Task created");
      }

      setTitle("");
      setDescription("");
      await fetchTasks();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Task operation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (task: Task) => {
    const updatedStatus = task.status === "completed" ? "pending" : "completed";

    setLoading(true);
    try {
      await api.put(`/tasks/${task._id}`, {
        title: task.title,
        description: task.description,
        status: updatedStatus,
      });

      toast.success("Task status updated");
      await fetchTasks();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update task status");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    setDeleteConfirm({ isOpen: true, taskId: id });
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirm.taskId) return;

    setLoading(true);
    try {
      await api.delete(`/tasks/${deleteConfirm.taskId}`);

      toast.success("Task deleted");
      await fetchTasks();
      setDeleteConfirm({ isOpen: false, taskId: null });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      toast.success("Logged out");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const handleStartEdit = (task: Task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setTitle("");
    setDescription("");
  };

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Task Dashboard
            </h1>
            <p className="text-slate-600">Manage your daily tasks</p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600 active:scale-95 disabled:opacity-50"
            disabled={loading}
          >
            Logout
          </button>
        </div>

        {error && <ErrorAlert message={error} />}

        <TaskForm
          title={title}
          description={description}
          loading={loading}
          editingTask={editingTask}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          onSubmit={handleSubmitTask}
          onCancel={handleCancelEdit}
        />

        <FilterButtons filter={filter} onFilterChange={setFilter} />

        <div className="grid gap-4">
          {filteredTasks.length === 0 ? (
            <div className="rounded-xl bg-white p-6 text-center text-slate-600 shadow">
              No tasks found.
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                loading={loading}
                onEdit={handleStartEdit}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDeleteTask}
              />
            ))
          )}
        </div>
      </div>

      <ConfirmationDialog
        isOpen={deleteConfirm.isOpen}
        title="Delete Task?"
        message="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, taskId: null })}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={loading}
      />
    </div>
  );
};

export default Dashboard;