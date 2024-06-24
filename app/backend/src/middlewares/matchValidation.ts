import { Request, Response, NextFunction } from 'express';
import { matchSchema } from '../schemas/match.schema';

const matchValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<unknown> => {
  const { error } = matchSchema.validate(req.body);
  const Voidvalues = Object.values(req.body).some((value) => value === '');

  if (Voidvalues === true) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (error) {
    const ERROR = new Error('Invalid values');
    return res.status(401).json({ message: ERROR.message });
  }
  next();
};

export default matchValidation;
