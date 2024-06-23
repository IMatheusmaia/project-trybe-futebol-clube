import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import UserModel from '../../database/models/user.model';

const secret = process.env.JWT_SECRET || 'jwt_secret';

type TokenPayload = {
  expiresIn?: string,
  email: string,
  role: string,
};

const verify = (token: string): TokenPayload => {
  const data = jwt.verify(token, secret) as TokenPayload;
  return data;
};

const userExists = async (email: string) => {
  const user = await UserModel.findOne({ where: { email },
    attributes: { exclude: ['password'], include: ['email', 'role'] } });

  return user?.dataValues;
};

const authorizationVerify = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const { email } = req.body.user;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = authorization.split(' ')[1];
  const decoded = verify(token);

  const decodedEmail = decoded.email;
  const user = userExists(decodedEmail);

  if (email !== decodedEmail && !user) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  res.status(200).json({ role: decoded.role });
  req.body.user = user;

  next();
};

export default authorizationVerify;
