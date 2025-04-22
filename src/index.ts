import express, { Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import mongoose from "mongoose";
import passport from "passport"
import session from 'express-session'

require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(`${process.env.MONGO_URL}`)
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.error(`Mongo Connection error : ${err}`));

app.use(session({
  secret: process.env.SESSION_SECRET || "",
  resave: false,
  saveUninitialized: false,
  cookie: {secure: process.env.NODE_ENV === "production"}
}))

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
