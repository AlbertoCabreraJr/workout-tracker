import { Router } from "express";
import { WorkoutController } from "../controllers/workout.controller";

const router = Router();

const workoutController = new WorkoutController();

router.get("/", async (req, res) => {
  await workoutController.getWorkouts(req, res);
});
router.get("/:id", async (req, res) => {
  await workoutController.getWorkoutById(req, res);
});
router.post("/", async (req, res) => {
  await workoutController.createWorkout(req, res);
});
router.post("/:id/schedule", async (req, res) => {
  await workoutController.scheduleWorkout(req, res);
});
router.post("/:id/complete", async (req, res) => {
  await workoutController.completeWorkout(req, res);
});

export default router;
