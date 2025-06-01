export type User = {
  user_id: number;
  email: string;
  password: string;
  created_at: string; // ISO timestamp
};

export type Exercise = {
  exercise_id: number;
  name: string;
  description: string | null;
  category: string | null;
  muscle_group: string | null;
};

export type Workout = {
  workout_id: number;
  user_id: number;
  title: string;
  notes: string | null;
  scheduled_at: string | null; // ISO timestamp
  completed_at: string | null; // ISO timestamp
  created_at: string;
};

export type WorkoutItem = {
  workout_item_id: number;
  workout_id: number;
  exercise_id: number;
  sets: number;
  reps: number;
  weight: number;
  order_index: number;
};

export type WorkoutLog = {
  workout_log_id: number;
  workout_id: number;
  performed_at: string; // ISO timestamp
  comment: string | null;
};

export type WorkoutLogItem = {
  workout_log_item_id: number;
  workout_log_id: number;
  exercise_id: number;
  set_number: number;
  reps_completed: number;
  weight: number;
};

export type CreateUser = Omit<User, "user_id" | "created_at">;
export type CreateExercise = Omit<Exercise, "exercise_id">;
export type CreateWorkout = Omit<
  Workout,
  "workout_id" | "created_at" | "completed_at"
>;
export type CreateWorkoutItem = Omit<
  WorkoutItem,
  "workout_item_id" | "order_index"
>;
export type CreateWorkoutLog = Omit<
  WorkoutLog,
  "workout_log_id" | "performed_at"
>;
export type CreateWorkoutLogItem = Omit<WorkoutLogItem, "workout_log_item_id">;
