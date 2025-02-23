import { Router, Request, Response } from "express";
import { SkillService } from "../services/skill_services";
import { SkillController } from "../controllers/skillController";

const router = Router();
const skillService = new SkillService();
const skillController = new SkillController(skillService);

router.post("/skills", (req: Request, res: Response) => {
  skillController.create(req, res);
});

router.get("/skills", (req: Request, res: Response) => {
  skillController.getAll(req, res);
});

router.get("/skills/:id", (req: Request, res: Response) => {
  skillController.getById(req, res);
});

router.patch("/skills/:id", (req: Request, res: Response) => {
  skillController.updateById(req, res);
});

export default router;
