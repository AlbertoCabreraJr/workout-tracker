import { Router } from "express";

const router = Router();

router.get("/exercises", () => {});
router.get("/", () => {});
router.get("/:id", () => {});
router.post("/", () => {});
router.patch("/:id", () => {});
router.delete("/:id", () => {});
router.post("/:id/schedule", () => {});
router.post("/:id/complete", () => {});

export default router;
