import { ISkillDocument, Skill, SkillModel } from "../models/skills";
import { CreateSkillDTO } from "../types/skillsType";

export class SkillService {
  async createSkill(skill: CreateSkillDTO): Promise<ISkillDocument> {
    const skilldata = new SkillModel(skill);
    return await skilldata.save();
  }

  async getById(id: string): Promise<ISkillDocument | null> {
    return await SkillModel.findById(id);
  }

  async getAll(): Promise<ISkillDocument[]> {
    return await SkillModel.find();
  }

  async updateSkill(
    id: string,
    data: CreateSkillDTO
  ): Promise<ISkillDocument | null> {
    return await SkillModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
  }

  async deleteSkill(id: string): Promise<boolean> {
    const isOk = SkillModel.findByIdAndDelete(id);
    return isOk !== null;
  }
}
