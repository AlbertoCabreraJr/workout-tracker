import { CreateWorkoutItem, Workout, WorkoutItem } from "../types";

import { CreateWorkout } from "../types";

import { WorkoutModel } from "../models/workout.model";

export class WorkoutService {
  workoutModel: WorkoutModel;

  constructor() {
    this.workoutModel = new WorkoutModel();
  }

  async createWorkout(args: CreateWorkout): Promise<Workout> {
    const workout = await this.workoutModel.createWorkout(args);
    return workout;
  }

  async getWorkouts(args: { user_id: number }): Promise<Workout[]> {
    const workouts = await this.workoutModel.getWorkouts(args);
    return workouts;
  }

  async getWorkoutById(args: { workout_id: number }): Promise<Workout> {
    const workout = await this.workoutModel.getWorkoutById(args);
    return workout;
  }

  async scheduleWorkout(args: {
    workout_id: number;
    scheduled_at: string;
  }): Promise<Workout> {
    const workout = await this.workoutModel.scheduleWorkout(args);
    return workout;
  }

  async completeWorkout(args: {
    workout_id: number;
    completed_at: string;
  }): Promise<Workout> {
    const workout = await this.workoutModel.completeWorkout(args);
    return workout;
  }

  async addWorkoutItem(args: CreateWorkoutItem): Promise<WorkoutItem> {
    const workoutItem = await this.workoutModel.addWorkoutItem(args);
    return workoutItem;
  }

  async getWorkoutItems(args: { workout_id: number }): Promise<WorkoutItem[]> {
    const workoutItems = await this.workoutModel.getWorkoutItems(args);
    return workoutItems;
  }
}
