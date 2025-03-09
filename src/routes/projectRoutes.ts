import { Router, Request, Response } from "express";
import { ProjectController } from "../controllers/projectController";
import { ProjectService } from "../services/project_services";

const router = Router();
const projectService = new ProjectService();
const projectController = new ProjectController(projectService);

router.post("/projects", (req: Request, res: Response) => {
  projectController.create(req, res);
});

router.get("/projects", (req: Request, res: Response) => {
  projectController.getAll(req, res);
});

router.get("/projects/:id", (req: Request, res: Response) => {
  projectController.getById(req, res);
});

router.patch("/projects/:id", (req: Request, res: Response) => {
  projectController.updateById(req, res);
});

export default router;
