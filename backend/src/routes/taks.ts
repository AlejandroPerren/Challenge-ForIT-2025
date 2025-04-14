import express, { Request, Response } from "express";
import { createTask } from "../controllers/createTask.controller";
import { ITask } from "../types";

const taskRoute = express.Router();

taskRoute.post("/tasks", async (req: Request, res: Response): Promise<void> => {
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
      message: "Error registering the user",
    });
  } catch (error) {
    console.error("Error in Router:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default taskRoute;
