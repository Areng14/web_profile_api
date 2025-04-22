import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifiedCallback,
} from "passport-jwt";
import bcrypt from "bcrypt";
import User from "../models/user";

interface jwtPayload {
    id: string,
    email: string,
    iat?: number,
    exp?: number,

}

const configurePassport = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      } as any,
      async (
        email: string,
        password: string,
        done: Function
      ): Promise<void> => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return done(null, false, {
              message: "Could not find a user associated with that email.",
            });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!user) {
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || "",
      },
      async (jwtPayload: jwtPayload, done: VerifiedCallback) => {
        try {
          const user = await User.findById(jwtPayload.id);
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        } catch (error) {
          return done(null, false);
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  })

  passport.deserializeUser(async(id: string, done) => {
    try {
        const user = await User.findById(id);
        done(null, user)
    } catch(error) {
        done(error, null)
    }
  })
};
