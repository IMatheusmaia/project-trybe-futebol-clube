import { Request, Response, NextFunction } from 'express';
import matchGoalsSchema from '../schemas/match.schema';

const matchGoalsValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<unknown> => {
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const { error } = matchGoalsSchema.validate({ homeTeamGoals, awayTeamGoals });

  if (homeTeamGoals === '' || awayTeamGoals === '') {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (error) {
    const ERROR = new Error('Invalid values');
    return res.status(401).json({ message: ERROR.message });
  }
  next();
};

export default matchGoalsValidation;
