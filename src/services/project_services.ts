import { IProjectDocument, ProjectModel } from "../models/project";
import { CreateProjectDTO, UpdateProjectDTO } from "../types/projectType";

export class ProjectService {
  async createProject(project: CreateProjectDTO): Promise<IProjectDocument> {
    const projectdata = new ProjectModel(project);
    return await projectdata.save();
  }

  async getById(id: string): Promise<IProjectDocument | null> {
    return await ProjectModel.findById(id);
  }

  async getAll(): Promise<IProjectDocument[]> {
    return await ProjectModel.find();
  }

  async updateProject(
    id: string,
    data: UpdateProjectDTO
  ): Promise<IProjectDocument | null> {
    return await ProjectModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
  }

  async deleteProject(id: string): Promise<boolean> {
    const isOk = ProjectModel.findByIdAndDelete(id);
    return isOk !== null;
  }
}
