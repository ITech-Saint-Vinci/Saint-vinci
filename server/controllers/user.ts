import jwt from "jsonwebtoken";
import { apiConfig } from "../config";
import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { User } from "../models/user";
import { Types } from "mongoose";
import { TOKEN_CONSTENT } from "../contansts";
import { userValidation } from "../middleware/authValidation";
import { z } from "zod";


type AuthResponse<T> = {
  token?: string;
  message?: string;
  error?: string;
  data?: T;
};

const createToken = (_id: Types.ObjectId) => {
  return jwt.sign({ _id }, apiConfig.auth.jwtSecret, {
    expiresIn: "30 days",
  });
};

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(TOKEN_CONSTENT.SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

const validatePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

const createAuthResponse = <T>(
  status: number,
  data: AuthResponse<T>,
  res: Response
): Response<any, Record<string, any>> => res.status(status).json(data);


export const signIn = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    
    const matches = await validatePassword(password, user.password!);
    if (!matches) {
      throw new Error("Invalid credentials");
    }
    
    const token = createToken(user._id);
    
    res.json({token});
  } catch (error) {
    const err = error as Error
    res.status(401).json({ message: err.message as string})
  }
};

export const validateToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ 
        valid: false, 
        error: 'No token provided or invalid token format' 
      });
      return
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, apiConfig.auth.jwtSecret) as jwt.JwtPayload;
    const user = await User.findById(decoded._id)

    if(!user){
      res.status(404).json({message: "invalid token"})
      return
    }

    res.status(200).json({valid: true, data:{
        _id: decoded._id,
        role: user?.role
    }})
  } catch (error) {

    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ 
        valid: false, 
        error: 'Token has expired' 
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ 
        valid: false, 
        error: 'Invalid token' 
      });
    }

    console.error('Token validation error:', error);
    res.status(500).json({ 
      valid: false, 
      error: 'Internal server error' 
    });
  }
};

export const userUpdate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.user._id;
  const { password } = req.body;
  try {
    const updateData: Partial<z.infer<typeof userValidation>> = {};

    if (password) {
      updateData.password = await hashPassword(password);
    }

    const user = await User.findOneAndUpdate(
      { _id: id },
      { $set: updateData }
    );

    const token = createToken(user!._id);
    res.json({message: "sucsessfully updated"})
  } catch (error) {
    const err = error as Error
    res.status(401).json({message: err.message})
  }
};
