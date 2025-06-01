import { Router } from "express";
import { WorkoutItemController } from "../controllers/workout-item.controller";

const router = Router();

const workoutItemController = new WorkoutItemController();

router.post("/", async (req, res) => {
  await workoutItemController.addWorkoutItem(req, res);
});
router.post("/bulk", async (req, res) => {
  await workoutItemController.addWorkoutItems(req, res);
});
router.get("/:id", async (req, res) => {
  await workoutItemController.getWorkoutItems(req, res);
});

export default router;
