import { Request, Response } from "express";
import { WorkoutItemService } from "../services/workout-item.service";

export class WorkoutItemController {
  workoutItemService: WorkoutItemService;

  constructor() {
    this.workoutItemService = new WorkoutItemService();
  }

  async addWorkoutItem(req: Request, res: Response) {
    try {
      const { workout_id, exercise_id, sets, reps, weight } = req.body;
      const workoutItem = await this.workoutItemService.addWorkoutItem({
        workout_id,
        exercise_id,
        sets,
        reps,
        weight,
      });
      return res.status(201).json(workoutItem);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async addWorkoutItems(req: Request, res: Response) {
    try {
      const { workoutItems } = req.body;
      const addedWorkoutItems =
        await this.workoutItemService.addWorkoutItems(workoutItems);
      return res.status(201).json(addedWorkoutItems);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getWorkoutItems(req: Request, res: Response) {
    try {
      const { workout_id } = req.params;
      const workoutItems = await this.workoutItemService.getWorkoutItems({
        workout_id: Number(workout_id),
      });
      return res.status(200).json(workoutItems);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
