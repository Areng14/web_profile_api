import { Router, Request, Response } from "express";
import skillRoutes from "./skillRoutes";

const router = Router();

router.use("/", skillRoutes);

export default router;
