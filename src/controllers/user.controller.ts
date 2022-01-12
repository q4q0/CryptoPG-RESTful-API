import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
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

const findAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany({
      include: { Merchant: true, Wallet: true, Payment: true },
    });
    return res.status(200).json({ success: true, users: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

const findUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.body.params;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    res.status(200).json({
      success: true,
      message: `User with id ${userId} has been fetched successfully`,
      statusCode: 200,
      user: user,
    });
  } catch (err) {
    next(err);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;
    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: password,
      },
    });
    res.status(201).json({ success: true, user: user });
  } catch (err) {
    next(err);
  }
};

export default { findAllUsers, createUser, findUser };
