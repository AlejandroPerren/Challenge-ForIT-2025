import { IFunctionResponse, ITask } from "../types";
import Task from "../database/models/tasks.models";


export const updateTask = async (id: string, updates: Partial<ITask>): Promise<IFunctionResponse<ITask>> => {
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        return {
          status: 404,
          message: "Tarea no encontrada",
        };
      }
  
      await task.update(updates);
  
      const updatedTask = task.get({ plain: true }) as ITask;
  
      return {
        status: 200,
        message: "Tarea actualizada correctamente",
        data: updatedTask,
      };
    } catch (error) {
      console.error("Error actualizando tarea", error);
      return {
        status: 500,
        message: "Error actualizando tarea",
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  };
  