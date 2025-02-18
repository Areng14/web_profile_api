import express, { Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import mongoose from "mongoose";

require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(`${process.env.MONGO_URL}`)
  .then(() => console.log("Conntect to mongoDBB"))
  .catch((err) => console.error(`Mongo Connection error : ${err}`));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
