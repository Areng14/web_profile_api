import express, { Request, Response} from "express";
import cors from "cors";
import skillRoutes from "./routes/skillRoutes"

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req : Request, res : Response) => {
    res.json({ message: "Hello World!" });
    });

app.use("/api/", skillRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});