import { Router, Request, Response } from "express";
import skillRoutes from "./skillRoutes"

const router = Router()

router.use("/skills", skillRoutes);

export default router
