import { db } from "../config/db";
import { CreateWorkout, Workout } from "../types";

export class WorkoutModel {
  async createWorkout(args: CreateWorkout): Promise<Workout> {
    const { user_id, title, notes, scheduled_at } = args;
    const query = `
      INSERT INTO workouts (user_id, title, notes, scheduled_at)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [user_id, title, notes, scheduled_at];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  async getWorkouts(args: { user_id: number }) {
    const { user_id } = args;
    const query = `
      SELECT * FROM workouts
      WHERE user_id = $1
    `;
    const values = [user_id];
    const result = await db.query(query, values);
    return result.rows;
  }

  async getWorkoutById(args: { workout_id: number }) {
    const { workout_id } = args;
    const query = `
      SELECT * FROM workouts
      WHERE workout_id = $1
    `;
    const values = [workout_id];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  async scheduleWorkout(args: { workout_id: number; scheduled_at: string }) {
    const { workout_id, scheduled_at } = args;
    const query = `
      UPDATE workouts
      SET scheduled_at = $1
      WHERE workout_id = $2
    `;
    const values = [scheduled_at, workout_id];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  async completeWorkout(args: { workout_id: number; completed_at: string }) {
    const { workout_id, completed_at } = args;
    const query = `
      UPDATE workouts
      SET completed_at = $1
    `;
    const values = [completed_at, workout_id];
    const result = await db.query(query, values);
    return result.rows[0];
  }
}
