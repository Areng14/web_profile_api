import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/userController";

const router = Router();
const userController = new UserController();

router.post("/register", (req: Request, res: Response) => {
  if (process.env.OWNER_EMAIL) {
    res.status(403).json({ message: "Registration disabled. Use owner account." });
    return;
  }
  userController.registerUser(req, res);
});

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  userController.login(req, res, next);
});

export default router;
