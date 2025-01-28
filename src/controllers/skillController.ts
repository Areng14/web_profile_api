import { SkillService } from "../services/skill_services";
import { CreateSkillDTO, UpdateSkillDTO } from "../types/skillsType";
import { Request, Response } from "express";

export class SkillController {
  constructor(private skillservice: SkillService) {}

  async create(req: Request, res: Response) {
    try {
      const skillData: CreateSkillDTO = req.body;
      const skill = await this.skillservice.createSkill(skillData);
      return res.status(201).json(skill);
    } catch (error) {
      return res.status(400).json({
        error: "Fail to create skill",
        message: error instanceof Error ? error.message : "Unknown Error",
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const skills = await this.skillservice.getALl();

      if (skills.length == 0) {
        return res.status(404).json({
          error: "No skills found",
        });
      }

      res.json(skills);
    } catch (error) {
      return res.status(400).json({
        error: "Fail to get all skills",
        message: error instanceof Error ? error.message : "Unknown Error",
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const skill = await this.skillservice.getById(id);

      if (!skill) {
        return res.status(404).json({
          error: "Skill not found",
        });
      }
      res.json(skill);
    } catch (error) {
      return res.status(400).json({
        error: "Fail to get skill",
        message: error instanceof Error ? error.message : "Unknown Error",
      });
    }
  }

  async updateById(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const updateData: CreateSkillDTO = req.body;

        if (Object.keys(updateData).length == 0) {
            return res.status(400).json({
                error: "Bad request",
                message: "No data provided",
            });
        }

        const updateSkill = await this.skillservice.updateSkill(id, updateData);
        if (!updateSkill) {
            return res.status(404).json({
                error: "Skill not found",
                message: "No skill found with the given id",
            });
        }

        return res.status(200).json(updateSkill);
    } catch (error) {
      return res.status(400).json({
        error: "Fail to update skill",
        message: error instanceof Error ? error.message : "Unknown Error",
      });
    }
  }
}
