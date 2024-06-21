import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import UserModel from '../../database/models/user.model';

const secret = process.env.JWT_SECRET || 'jwt_secret';

type TokenPayload = {
  expiresIn?: string,
  email: string,
  role: string,
};

const userExists = async (email: string, inputPassword: string) => {
  const password = bcrypt.hashSync(inputPassword, 10);

  const user = await UserModel.findOne(
    { where: {
      email,
      password,
    } },
  );

  return user;
};

const authentication = async (
  req: Request,
  res: Response,
) => {
  const { email, password } = req.body;
  const user = await userExists(email, password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const sign = (payload: TokenPayload): string => {
    const token = jwt.sign(payload, secret);
    return token;
  };

  const token = sign({ email: email as string, role: 'admin' });

  return res.status(200).json({ token });
};

export default authentication;
