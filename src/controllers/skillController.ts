import { SkillService } from "../services/skill_services";
import { CreateSkillDTO } from "../types/skillsType";
import { Request, Response } from "express"

export class SkillController {
    constructor (private skillservice: SkillService) {}

    async create(req: Request, res: Response) {
        try {
            const skillData: CreateSkillDTO = req.body
            const skill = await this.skillservice.createSkill(skillData)
            res.status(201).json(skill)
        } catch (error) {
            res.status(400).json({
                error: "Fail to create skill",
                message: error instanceof Error ? error.message: "Unknown Error"
            })
        }
    }
}