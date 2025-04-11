import { IFunctionResponse, ITask } from "../types";
import Task from "../database/models/tasks.models";

export const createTask = async (task: ITask): Promise<IFunctionResponse<ITask>> => {
  try {
    if (!task || !task.title || !task.description) {
      return {
        status: 400,
        message: "Datos inválidos: título y descripción son requeridos.",
      };
    }

    const response = await Task.create({
      title: task.title,
      description: task.description,
    });

    const newTask = response.get({ plain: true }) as ITask;
    
    return {
      status: 200,
      message: "Tarea creada correctamente",
      data: newTask,
    };
  } catch (error) {
    console.error("Error en Task Controller", error);
    return {
      status: 500,
      message: "Error creando la tarea",
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};
