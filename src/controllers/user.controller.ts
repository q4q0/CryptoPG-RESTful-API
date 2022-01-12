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
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!user) {
      res.status(404).json({
        success: false,
        message: `User with id ${id} not found`,
        statusCode: 404,
        user: {},
      });
    }
    res.status(200).json({
      success: true,
      message: `User with id ${id} has been fetched successfully`,
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
    console.log(err);
    next(err);
  }
};

export default { findAllUsers, createUser, findUser };
