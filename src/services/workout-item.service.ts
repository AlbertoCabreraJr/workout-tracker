import { CreateWorkoutItem, WorkoutItem } from "../types";

import { WorkoutItemModel } from "../models/workout-item.model";

export class WorkoutItemService {
  workoutItemModel: WorkoutItemModel;

  constructor() {
    this.workoutItemModel = new WorkoutItemModel();
  }

  async addWorkoutItem(args: CreateWorkoutItem): Promise<WorkoutItem> {
    const workoutItem = await this.workoutItemModel.addWorkoutItem(args);
    return workoutItem;
  }

  async getWorkoutItems(args: { workout_id: number }): Promise<WorkoutItem[]> {
    const workoutItems = await this.workoutItemModel.getWorkoutItems(args);
    return workoutItems;
  }

  async addWorkoutItems(
    workoutItems: CreateWorkoutItem[],
  ): Promise<WorkoutItem[]> {
    const addedWorkoutItems: WorkoutItem[] = [];
    for (const item of workoutItems) {
      const workoutItem = await this.workoutItemModel.addWorkoutItem(item);
      workoutItems.push(workoutItem);
    }

    return addedWorkoutItems;
  }
}
