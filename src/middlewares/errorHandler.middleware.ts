import { Request, Response, NextFunction } from "express";

const errorHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
  err: { code: string }
) => {
  try {
    if ((err.code = "P2002")) {
      res.status(409).json({
        success: false,
        message: "The user credentials already taken",
        statusCode: 409,
      });
    }
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      statusCode: 500,
    });
    next();
  }
};

export default errorHandler;
