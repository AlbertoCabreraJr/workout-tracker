import { Router } from "express";
import authRoutes from "./auth.routes";
import workoutRoutes from "./workout.routes";
import reportRoutes from "./report.routes";
import workoutItemRoutes from "./workout-item.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/workouts", workoutRoutes);
router.use("/reports", reportRoutes);
router.use("/workout-items", workoutItemRoutes);

export default router;
