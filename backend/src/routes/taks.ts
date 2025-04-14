import express, { Request, Response } from "express";
import { createTask } from "../controllers/createTask.controller";

import { updateTask } from "../controllers/updateTask.controller";
import { deleteTask } from "../controllers/deleteTask.controller";
import { ITask } from "../types";
import { getAllTasks } from "../controllers/getAllTask.Controller";
import { getTaskById } from "../controllers/getTask.controller";

const taskRoute = express.Router();

// Crear tarea
taskRoute.post("/task", async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description }: ITask = req.body;
    const task: ITask = { title, description };

    const response = await createTask(task);

    if (response && response.status) {
      res.status(response.status).json(response);
      return;
    }

    res.status(500).json({
      status: 500,
      message: "Error registrando la tarea",
    });
  } catch (error) {
    console.error("Error en POST /tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Obtener todas las tareas
taskRoute.get("/task", async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await getAllTasks();
    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error en GET /tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Obtener tarea por ID
taskRoute.get("/task/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const response = await getTaskById(id);
    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error en GET /tasks/:id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Actualizar tarea por ID
taskRoute.put("/task/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates: Partial<ITask> = req.body;

    const response = await updateTask(id, updates);
    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error en PUT /tasks/:id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Eliminar tarea por ID
taskRoute.delete("/task/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const response = await deleteTask(id);
    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error en DELETE /tasks/:id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default taskRoute;
