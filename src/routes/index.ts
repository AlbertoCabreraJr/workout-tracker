import { Router } from "express";
import authRoutes from "./auth.routes";
import workoutRoutes from "./workout.routes";
import reportRoutes from "./report.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/workouts", workoutRoutes);
router.use("/reports", reportRoutes);

export default router;
