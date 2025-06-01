import { db } from "../config/db";
import { CreateWorkoutItem, WorkoutItem } from "../types";

export class WorkoutItemModel {
  async addWorkoutItem(args: CreateWorkoutItem): Promise<WorkoutItem> {
    const { workout_id, exercise_id, sets, reps, weight } = args;
    const query = `
      INSERT INTO workout_items (workout_id, exercise_id, sets, reps, weight)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [workout_id, exercise_id, sets, reps, weight];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  async getWorkoutItems(args: { workout_id: number }) {
    const { workout_id } = args;
    const query = `
      SELECT * FROM workout_items
      WHERE workout_id = $1
    `;
    const values = [workout_id];
    const result = await db.query(query, values);
    return result.rows;
  }
}
