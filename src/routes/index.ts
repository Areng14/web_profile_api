import { Router } from "express";
import skillRoutes from "./skillRoutes";
import projectRoutes from "./projectRoutes";
import userRoutes from "./userRoutes";
import publicRoutes from "./public";
import { requireAuth } from "../middlewares/auth";

const router = Router();

router.use("/public/",publicRoutes); 
router.use("/", projectRoutes);
router.use("/", userRoutes);
router.use("/", requireAuth ,skillRoutes);

export default router;
