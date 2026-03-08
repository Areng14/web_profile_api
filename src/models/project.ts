import { IProject } from "../types/projectType";
import mongoose, { Schema, Document } from "mongoose";

export interface IProjectDocument extends Omit<IProject, "id">, Document {}
const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    gradientColor: { type: [String], required: true },
    gradientAngle: { type: Number, required: false },
    gitRepo: { type: String, required: true },
    skillId: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

export const ProjectModel = mongoose.model<IProjectDocument>(
  "Project",
  ProjectSchema
);
