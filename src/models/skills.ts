import { CreateSkillDTO, ISkill, SkillType } from "../types/skillsType";
import mongoose, { Schema, Document, mongo } from "mongoose";

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
