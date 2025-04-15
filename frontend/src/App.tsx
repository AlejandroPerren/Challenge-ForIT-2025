import React, { useEffect, useState } from "react";
import { IFunctionResponse, ITask } from "./types";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const App: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      const res = await axios.get<IFunctionResponse<ITask[]>>(`${API_URL}/task`);
      const result = res.data;
      if (result.status === 200 && result.data) setTasks(result.data);
      else setError(result.message);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) setError(err.message);
      else setError("Error inesperado");
    }
  };

  const handleCreateOrUpdate = async (data: ITask) => {
    try {
      const method = data.id ? "put" : "post";
      const url = data.id
        ? `${API_URL}/task/${data.id}`
        : `${API_URL}/task`;

      const res = await axios({
        method,
        url,
        data,
        headers: { "Content-Type": "application/json" },
      });

      const result: IFunctionResponse<ITask> = res.data;
      if (result.status === 200) {
        await fetchTasks();
        setSelectedTask(null);
        localStorage.removeItem("selectedTask");
      } else {
        alert(result.message);
      }
    } catch (error: unknown) {
      console.log(error);
      alert("Error al guardar tarea");
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    const confirmed = confirm("¿Seguro que querés eliminar esta tarea?");
    if (!confirmed) return;

    try {
      const res = await axios.delete<IFunctionResponse<null>>(
        `${API_URL}/task/${id}`
      );
      if (res.data.status === 200) fetchTasks();
      else alert(res.data.message);
    } catch (error: unknown) {
      console.log(error);
      alert("Error al eliminar tarea");
    }
  };

  const handleEdit = async (id?: string) => {
    if (!id) return;
    try {
      const res = await axios.get<IFunctionResponse<ITask>>(
        `${API_URL}/task/${id}`
      );
      const result = res.data;
      if (result.status === 200 && result.data) {
        setSelectedTask(result.data);
        localStorage.setItem("selectedTask", JSON.stringify(result.data));
      } else {
        alert(result.message);
      }
    } catch (error: unknown) {
      console.log(error);
      alert("Error al obtener tarea");
    }
  };

  useEffect(() => {
    fetchTasks();

    const savedTask = localStorage.getItem("selectedTask");
    if (savedTask) {
      const parsedTask: ITask = JSON.parse(savedTask);
      setSelectedTask(parsedTask);
      localStorage.removeItem("selectedTask");
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-2xl font-bold">Tareas</h1>

      <TaskForm
        onSubmit={handleCreateOrUpdate}
        defaultValues={selectedTask || undefined}
      />

      {error && <p className="text-red-500">{error}</p>}
      <div className="grid gap-6 mt-4 w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
