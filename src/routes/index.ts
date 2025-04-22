import { Router } from "express";
import skillRoutes from "./skillRoutes";
import projectRoutes from "./projectRoutes";

const router = Router();

router.use("/", skillRoutes);
router.use("/", projectRoutes);

export default router;
