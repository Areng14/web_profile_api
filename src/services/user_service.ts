import { IUser } from "../models/user";
import { UserResponse } from "../types/userType";

export class UserService {
  /**
   * Convert user document to safe user response
   */
  toUserResponse(user: IUser): UserResponse {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
