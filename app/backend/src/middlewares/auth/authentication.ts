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

const userExists = async (email: string) => {
  const user = await UserModel.findOne({ where: { email } });

  return user?.dataValues;
};
const sign = (payload: TokenPayload): string => {
  const token = jwt.sign(payload, secret);
  return token;
};

const authentication = async (
  req: Request,
  res: Response,
) => {
  try {
    const { email, password } = req.body;

    const user = await userExists(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = sign({ email: email as string, role: 'admin' });
    const comparePassword = await bcrypt.compare(password, user?.password as string);

    if (comparePassword === false) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export default authentication;
