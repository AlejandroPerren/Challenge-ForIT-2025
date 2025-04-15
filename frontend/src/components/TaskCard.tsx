import React from 'react'
import { ITask } from '../types'

interface Props {
    task: ITask
    onDelete: (id?: string) => void
    onEdit: (id?: string) => void
  }
  
  const TaskCard: React.FC<Props> = ({ task, onDelete, onEdit }) => {
    return (
      <div className="bg-white border rounded-xl p-4 shadow-sm w-full max-w-md">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <p className="text-gray-600">{task.description}</p>
        <div className="flex justify-between mt-2">
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              task.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {task.completed ? 'Completada' : 'Pendiente'}
          </span>
          <span className="text-xs text-gray-400">
            {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : ''}
          </span>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => onEdit(task.id)}
            className="text-blue-600 hover:underline text-sm"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:underline text-sm"
          >
            Borrar
          </button>
        </div>
      </div>
    )
  }
  
  export default TaskCard
