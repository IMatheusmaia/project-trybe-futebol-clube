import { Request, Response, NextFunction } from 'express';
import loginSchema from '../schemas/login.schema';

const loginValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<unknown> => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({ email, password });

  if (email === '' || password === '') {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (error) {
    const ERROR = new Error('Invalid email or password');
    return res.status(401).json({ message: ERROR.message });
  }
  next();
};

export default loginValidation;
