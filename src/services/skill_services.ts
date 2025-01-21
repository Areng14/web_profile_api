import { Skill } from "../models/skills";
import { CreateSkillDTO } from "../types/skillsType";

export class SkillService {
    private skills: Map<string, Skill> = new Map();

    async createSkill(skill: CreateSkillDTO): Promise<Skill> {
        const skilldata = new Skill(skill)
        this.skills.set(skilldata.id, skilldata)
        return skilldata
    }
}