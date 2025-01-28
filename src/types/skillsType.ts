export interface ISkill {
  id: string;
  skillName: string;
  gradientColor: string[];
  gradientAngle: number;
  icon: string;
}

export type CreateSkillDTO = Omit<ISkill, "id">;
export type UpdateSkillDTO = Partial<CreateSkillDTO>;
