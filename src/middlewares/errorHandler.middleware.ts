import { Request, Response, NextFunction } from "express";

const errorHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
  err: { code: string }
) => {
  if ((err.code = "P2002")) {
    res.status(409).json({
      success: false,
      message: "The user credentials already taken",
      statusCode: 409,
    });
  }
  next();
};

export default errorHandler;
