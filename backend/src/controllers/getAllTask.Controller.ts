import { IFunctionResponse, ITask } from "../types";
import Task from "../database/models/tasks.models";

export const getAllTasks = async (): Promise<IFunctionResponse<ITask[]>> => {
    try {
      const tasks = await Task.findAll();
      const plainTasks = tasks.map(task => task.get({ plain: true }) as ITask);
  
      return {
        status: 200,
        message: "Lista de tareas obtenida correctamente",
        data: plainTasks,
      };
    } catch (error) {
      console.error("Error obteniendo tareas", error);
      return {
        status: 500,
        message: "Error obteniendo tareas",
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  };