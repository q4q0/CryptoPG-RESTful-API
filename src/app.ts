import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler.middleware";
const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import userRouter from "./routes/user.routes";
app.use("/api/v1/user", userRouter);

import authRouter from "./routes/auth.routes";
app.use("/api/v1/auth/", authRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `server is running on http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`
  );
});
