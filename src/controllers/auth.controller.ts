import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = await req.body;
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
    console.log(err);
    next(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (err) {
    next(err);
  }
};

export default { register, login };
