import { Router, Request, Response } from "express";
import { SkillService } from "../services/skill_services";
import { SkillController } from "../controllers/skillController";

const router = Router()
const skillService = new SkillService();
const skillController = new SkillController(skillService)

router.post("/skills", (req: Request, res: Response) => {
    skillController.create(req,res)
})

export default router