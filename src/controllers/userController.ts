import { Router, Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user";
import jwt from "jsonwebtoken";
import passport from "passport";

export class UserController {
  async registerUser(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;

      //User alr exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists!" });
      }

      //Create it
      const newUser = new User({ email, password, name });

      await newUser.save();

      const token = jwt.sign(
        {
          id: newUser.id,
          email: newUser.email,
        },
        process.env.JWT_SECRET || "",
        { expiresIn: "1d" }
      );

      res.status(200).json({
        message: "User sucesfully registered",
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        },
      });
    } catch (error) {
      console.log("Registeration error: ", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      "local",
      { session: false },
      (err: Error, user: IUser, info: { message: string }) => {
        if (err) {
          return next(err);
        }

        if (!user) {
          return res.status(401).json({ message: info.message });
        }

        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          process.env.JWT_SECRET || "",
          { expiresIn: "1d" }
        );
        return res.json({
          message: "Login OK",
          token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
        });
      }
    )(req, res, next);
  }
}
