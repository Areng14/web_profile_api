import passport from "passport";
import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/user";
import { error } from "console";

export interface AuthRequest extends Request {
    user?: IUser;
}
export const requireAuth = (req: Request, res: Response, next:NextFunction) => {
    passport.authenticate("jwt", { session: false }, (err: Error, user: IUser, info: any) => {
        if (err) {
            return next(err)
        }

        if (!user) {
            return res.status(401).json({message: "What is ts user"})
        }
        req.user = user
        next()
    }, )(req, res, next);
} 

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next()
    }
    next()
}