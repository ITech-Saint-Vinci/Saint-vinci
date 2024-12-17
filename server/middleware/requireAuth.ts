import { NextFunction, Request, RequestHandler, Response } from "express";
import { apiConfig } from "../config";
import { User } from "../models/user";
import jwt from "jsonwebtoken"
import { UserRole } from "../contansts";


export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(400).json("make sure you are looged in");
    return 
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, apiConfig.auth.jwtSecret) as jwt.JwtPayload;

    req.user = await User.findOne({ _id });

    next();
  } catch (e) {
    res.status(401).json("Authentication required");
  }
};

export const requireAnyRole = (allowedRoles: UserRole[]): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) {
      res.status(401).json({ error: "Authentication required" });
      return
    }

    const userRole = req.user.role as UserRole;

    if (allowedRoles.includes(userRole)) {
      next();
    } else {
      res.status(403).json({ error: "Insufficient permissions" });
    }
  };
};

export const requireAuthAdmin = requireAnyRole([UserRole.Admin]);
export const requireAuthTeacher = requireAnyRole([UserRole.Teacher]);
export const requireAuthDirector = requireAnyRole([UserRole.Director]);