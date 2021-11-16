import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface ITokenPayload {
  sub: string;
}

export default function ensureAuthenticatedMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("JWT Token is missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      "7d04b76af5a2159757770d8001788bc5"
    ) as ITokenPayload;

    request.user_id = sub;

    return next();
  } catch (err) {
    throw new Error("Cannot realize this operation, JWT invalid");
  }
}
