import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import UserModel from '../database/models/user.model';

const secret = process.env.JWT_SECRET || 'jwt_secret';

type TokenPayload = {
  expiresIn?: string,
  email: string,
  role: string,
};

const userExists = async (email: string | undefined) => {
  const user = await UserModel.findOne({ where: { email }, attributes: { exclude: ['password'] } });

  return user;
};

const verify = (token: string): TokenPayload | null | undefined => {
  try {
    const data = jwt.verify(token, secret) as TokenPayload;
    if (data) return data;
  } catch (error) {
    return null;
  }
};

const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = authorization.split(' ')[1];
  const decoded = verify(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  const decodedEmail = decoded.email;
  const user = await userExists(decodedEmail);
  if (!user) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  next();
};

export default tokenValidation;
