import { Request, Response, NextFunction } from 'express';
import TeamModel from '../database/models/team.model';

const matchTeamsValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<unknown> => {
  const { homeTeamId, awayTeamId } = req.body;

  if (homeTeamId === awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  const isValidTeams = await Promise.all([homeTeamId, awayTeamId]
    .map((teamId: number) => TeamModel.findOne({ where: { id: Number(teamId) } })));

  if (isValidTeams.some((team) => team === null)) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
};

export default matchTeamsValidation;
