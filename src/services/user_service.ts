import { IUser } from "../models/user";
import { UserResponse } from "../types/userType";
import jwt from "jsonwebtoken";

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

  /**
   * Generate JWT Token for user
   */

  generateToken(user: IUser): string {
    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );
  }
}
