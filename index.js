import express from "express";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";

import connectDb from "./db.js";
import UserRouter from "./routes/UserRouter.js";
import JobRouter from "./routes/JobRouter.js";
import QuizRouter from "./routes/QuizRouter.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

connectDb()
  .then(() => {
    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  })
  .catch((error) => {
    console.log("Error connecting to database: ", error.message);
  });

app.get("/", (req, res) => {
  res.send("hello from localhost 8000");
});

app.use("/api/users", UserRouter);
app.use("/api/jobs", JobRouter);
app.use("/api/mock", QuizRouter);
