import { CreateSkillDTO } from "./skillsType";

export interface IProject {
  id: string;
  name: string;
  description: string;
  gradientColor: string[];
  gradientAngle: number;
  gitRepo: string;
  skillId: string[];
}

export type CreateProjectDTO = Omit<IProject, "id">;
export type UpdateProjectDTO = Partial<CreateSkillDTO>;