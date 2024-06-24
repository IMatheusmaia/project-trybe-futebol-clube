import { Request, Response, NextFunction } from 'express';
import { matchSchema } from '../schemas/match.schema';

const matchGoalsValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<unknown> => {
  const { error } = matchSchema.validate(req.body);
  const values = Object.values(req.body);

  if (values.some((value) => value === '')) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (error) {
    const ERROR = new Error('Invalid values');
    return res.status(401).json({ message: ERROR.message });
  }
  next();
};

export default matchGoalsValidation;
