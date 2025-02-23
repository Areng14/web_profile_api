import { CreateSkillDTO, ISkill, SkillType } from "../types/skillsType";
import mongoose, { Schema, Document, mongo } from "mongoose";

export class Skill implements ISkill {
  id: string;
  skillName: string;
  gradientColor: string[];
  gradientAngle: number;
  icon: string;
  skillType: SkillType;

  constructor(data: CreateSkillDTO) {
    this.id = crypto.randomUUID();
    this.skillName = data.skillName;
    this.gradientColor = data.gradientColor;
    this.gradientAngle = data.gradientAngle;
    this.icon = data.icon;
    this.skillType = data.skillType;
  }
}

export interface ISkillDocument extends Omit<ISkill, "id">, Document {}
const skillSchema = new Schema(
  {
    skillName: { type: String, required: true },
    gradientColor: { type: [String], required: true },
    gradientAngle: { type: Number, required: false },
    icon: { type: String, required: true },
    skillType: { type: String, required: true, enum: Object.values(SkillType) },
  },
  {
    timestamps: true,
  }
);

export const SkillModel = mongoose.model<ISkillDocument>("Skill", skillSchema);
