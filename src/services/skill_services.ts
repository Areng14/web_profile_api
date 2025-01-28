import { Skill } from "../models/skills";
import { CreateSkillDTO } from "../types/skillsType";

export class SkillService {
  private skills: Map<string, Skill> = new Map();

  async createSkill(skill: CreateSkillDTO): Promise<Skill> {
    const skilldata = new Skill(skill);
    this.skills.set(skilldata.id, skilldata);
    return skilldata;
  }

  async getById(id: string): Promise<Skill | null> {
    return this.skills.get(id) || null;
  }

  async getALl(): Promise<Skill[]> {
    return Array.from(this.skills.values());
  }

  async updateSkill(id: string, data: CreateSkillDTO): Promise<Skill | null> {
    const skill = this.skills.get(id);
    if (!skill) {
      return null;
    }
    Object.assign(skill, data);
    return skill;
  }

  async deleteSkill(id: string): Promise<boolean> {
    return this.skills.delete(id);
  }
}
