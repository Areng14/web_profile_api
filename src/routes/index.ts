import { Router } from "express";
import skillRoutes from "./skillRoutes";
import projectRoutes from "./projectRoutes";
import userRoutes from "./userRoutes";
import { requireAuth } from "../middlewares/auth";
import publicRoutes from "./public";

const router = Router();

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

router.use("/public/", publicRoutes);
router.use("/", userRoutes);
router.use("/", requireAuth, skillRoutes);
router.use("/", projectRoutes);

export default router;
