import { IFunctionResponse, ITask } from "../types";
import Task from "../database/models/tasks.models";


export const getTaskById = async (id: string): Promise<IFunctionResponse<ITask>> => {
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        return {
          status: 404,
          message: "Tarea no encontrada",
        };
      }
  
      const foundTask = task.get({ plain: true }) as ITask;
  
      return {
        status: 200,
        message: "Tarea encontrada correctamente",
        data: foundTask,
      };
    } catch (error) {
      console.error("Error obteniendo tarea por ID", error);
      return {
        status: 500,
        message: "Error obteniendo la tarea",
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  };
  