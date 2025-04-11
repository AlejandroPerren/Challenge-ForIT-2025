import { IFunctionResponse, ITask } from "../types";
import Task from "../database/models/tasks.models";


export const deleteTask = async (id: string): Promise<IFunctionResponse<null>> => {
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        return {
          status: 404,
          message: "Tarea no encontrada",
        };
      }
  
      await task.destroy();
  
      return {
        status: 200,
        message: "Tarea eliminada correctamente",
        data: null,
      };
    } catch (error) {
      console.error("Error eliminando tarea", error);
      return {
        status: 500,
        message: "Error eliminando tarea",
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  };