import { Request, Response } from "express";
import { WorkoutService } from "../services/workout.service";

export class WorkoutController {
  workoutService: WorkoutService;

  constructor() {
    this.workoutService = new WorkoutService();
  }

  async createWorkout(req: Request, res: Response) {
    try {
      const { user_id, title, notes, scheduled_at } = req.body;
      const workout = await this.workoutService.createWorkout({
        user_id,
        title,
        notes,
        scheduled_at,
      });
      return res.status(201).json(workout);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getWorkouts(req: Request, res: Response) {
    try {
      const { user_id } = req.body;
      const workouts = await this.workoutService.getWorkouts({ user_id });
      return res.status(200).json(workouts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getWorkoutById(req: Request, res: Response) {
    try {
      const { workout_id } = req.params;
      const workout = await this.workoutService.getWorkoutById({
        workout_id: Number(workout_id),
      });
      return res.status(200).json(workout);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async scheduleWorkout(req: Request, res: Response) {
    try {
      const { workout_id, scheduled_at } = req.body;

      const formattedScheduledAt = new Date(scheduled_at).toISOString();
      const workout = await this.workoutService.scheduleWorkout({
        workout_id,
        scheduled_at: formattedScheduledAt,
      });

      return res.status(200).json(workout);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async completeWorkout(req: Request, res: Response) {
    try {
      const { workout_id } = req.params;
      const { completed_at } = req.body;
      const formattedCompletedAt = new Date(completed_at).toISOString();
      const workout = await this.workoutService.completeWorkout({
        workout_id: Number(workout_id),
        completed_at: formattedCompletedAt,
      });
      return res.status(200).json(workout);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
