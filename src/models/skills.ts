import { CreateSkillDTO, ISkill, UpdateSkillDTO } from "../types/skillsType";

export class Skill implements ISkill {
  id: string;
  skillName: string;
  gradientColor: string[];
  gradientAngle: number;
  icon: string;

  constructor(data: CreateSkillDTO) {
    this.id = crypto.randomUUID();
    this.skillName = data.skillName;
    this.gradientColor = data.gradientColor;
    this.gradientAngle = data.gradientAngle;
    this.icon = data.icon;
  }
}
