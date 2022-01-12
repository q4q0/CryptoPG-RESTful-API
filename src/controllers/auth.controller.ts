import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import userController from "./user.controller";
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

// model User {
//     id       Int        @id @default(autoincrement())
//     username String     @unique
//     email    String     @unique
//     password String
//     Merchant Merchant[]
//     Wallet   Wallet[]
//     Payment  Payment[]
//   }

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = await req.body;
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });
    res.status(201).json({
      success: true,
      message: "User has been registered successfully",
      statusCode: 201,
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      statusCode: 500,
      error: err,
    });
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (err) {
    next(err);
  }
};

export default { register, login };
