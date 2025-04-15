import React, { useState } from "react";
import { ITask, IFunctionResponse } from "../types";
import axios from "axios";

interface Props {
  task: ITask;
  onDelete: (id?: string) => void;
  onEdit: (id?: string) => void;
}

const TaskCard: React.FC<Props> = ({ task, onDelete, onEdit }) => {
  const [localTask, setLocalTask] = useState<ITask>(task);

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newCompleted = e.target.value === "true";

    try {
      const res = await axios.put<IFunctionResponse<ITask>>(
        `http://localhost:8080/api/task/${localTask.id}`,
        {
          ...localTask,
          completed: newCompleted,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.data.status === 200) {
        setLocalTask((prev) => ({ ...prev, completed: newCompleted }));
      } else {
        alert("Error al actualizar estado");
      }
    } catch (error) {
      console.error(error);
      alert("Error de red al actualizar estado");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md transition hover:shadow-lg w-full">
      <h3 className="text-xl font-semibold text-gray-800 mb-1">
        {localTask.title}
      </h3>
      <p className="text-gray-600 text-sm mb-3">{localTask.description}</p>

      <div className="flex justify-between items-center mb-3">
        <select
          className={`text-xs px-3 py-1 rounded-full border transition ${
            localTask.completed ?? false
              ? "bg-green-100 text-green-800 border-green-300"
              : "bg-yellow-100 text-yellow-800 border-yellow-300"
          }`}
          value={(localTask.completed ?? false).toString()}
          onChange={handleStatusChange}
        >
          <option value="false">Pendiente</option>
          <option value="true">Completada</option>
        </select>

        <span className="text-xs text-gray-400">
          {localTask.createdAt
            ? new Date(localTask.createdAt).toLocaleDateString()
            : ""}
        </span>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => onEdit(localTask.id)}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(localTask.id)}
          className="text-sm text-red-500 hover:text-red-700 font-medium"
        >
          Borrar
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
