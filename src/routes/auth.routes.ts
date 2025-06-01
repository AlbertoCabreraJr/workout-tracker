import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

const authController = new AuthController();

router.post("/signup", async (req, res) => {
  await authController.signup(req, res);
});
router.post("/login", async (req, res) => {
  await authController.login(req, res);
});
router.post("/refresh", async (req, res) => {
  await authController.refreshToken(req, res);
});
router.post("/logout", async (req, res) => {
  await authController.logout(req, res);
});

export default router;
