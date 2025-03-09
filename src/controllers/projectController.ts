import { ProjectService } from "../services/project_services";
import { CreateProjectDTO, UpdateProjectDTO } from "../types/projectType";
import { Request, Response } from "express";

export class ProjectController {
  constructor(private projectService: ProjectService) {}

  async create(req: Request, res: Response) {
    try {
      const projectData: CreateProjectDTO = req.body;
      const project = await this.projectService.createProject(projectData);
      return res.status(201).json(project);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error", message: "Something went wrong" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const projects = await this.projectService.getAll();
      res.json(projects);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error", message: "Something went wrong" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const project = await this.projectService.getById(id);

      if (!project) {
        return res.status(404).json({
          error: "Project not found",
        });
      }
      res.json(project);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error", message: "Something went wrong" });
    }
  }

  async updateById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const updateData: UpdateProjectDTO = req.body;

      if (Object.keys(updateData).length == 0) {
        return res.status(400).json({
          error: "Bad request",
          message: "No data provided",
        });
      }

      const updateProject = await this.projectService.updateProject(id, updateData);
      if (!updateProject) {
        return res.status(404).json({
          error: "Project not found",
          message: "No Project found with the given id",
        });
      }

      return res.status(200).json(updateProject);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error", message: "Something went wrong" });
    }
  }
}
