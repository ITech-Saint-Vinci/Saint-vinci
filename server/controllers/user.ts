import jwt from "jsonwebtoken";
import { apiConfig } from "../config";
import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { User } from "../models/user";
import { Types } from "mongoose";
import { TOKEN_CONSTENT } from "../contansts";


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
    
    createAuthResponse(200, { token }, res);
  } catch (error) {
    createAuthResponse(
      401,
      {
        message: error as string,
      },
      res
    );
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

    res.status(200).json({valid: true, data:{
      admin:{
        _id: decoded._id
      }
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
