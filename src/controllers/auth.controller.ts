import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
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
    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash();
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (err) {
    next(err);
  }
};

export default { register, login };
