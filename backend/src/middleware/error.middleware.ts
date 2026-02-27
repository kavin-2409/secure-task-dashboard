import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("ERROR:", err);

  let statusCode = 500;
  let message = "Internal Server Error";

  // Mongoose invalid ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource ID";
  }

  // Custom thrown error
  else if (err.message) {
    statusCode = err.statusCode || 400;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};