import MatchModel from '../database/models/match.model';
import TeamModel from '../database/models/team.model';
import { MatchesDBReturnAll, matchInput } from '../types/matches';

const getAllMatches = async (): Promise<MatchesDBReturnAll> => {
  const matches = await MatchModel.findAll({
    attributes: ['id', 'homeTeamId', 'homeTeamGoals', 'awayTeamId', 'awayTeamGoals', 'inProgress'],
    include: [
      {
        model: TeamModel,
        as: 'homeTeam',
        attributes: ['teamName'],
      },
      {
        model: TeamModel,
        as: 'awayTeam',
        attributes: ['teamName'],
      },
    ],
  });

  if (!matches) return { status: 'CONFLICT', data: [] };

  return { status: 'SUCCESSFUL', data: matches };
};

const getAllInProgress = async (inProgress: boolean): Promise<MatchesDBReturnAll> => {
  const matches = await MatchModel.findAll({
    where: { inProgress },
    attributes: ['id', 'homeTeamId', 'homeTeamGoals', 'awayTeamId', 'awayTeamGoals', 'inProgress'],
    include: [
      {
        model: TeamModel,
        as: 'homeTeam',
        attributes: ['teamName'],
      },
      {
        model: TeamModel,
        as: 'awayTeam',
        attributes: ['teamName'],
      },
    ],
  });

  if (!matches) return { status: 'CONFLICT', data: [] };

  return { status: 'SUCCESSFUL', data: matches };
};

const updateProgress = async (id: number) => {
  const match = await MatchModel.findByPk(id);
  if (!match) return { status: 'NOT_FOUND', data: { message: 'Match not found' } };

  await match.update({ inProgress: false });

  return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
};

const updateGoals = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
  const match = await MatchModel.findByPk(id);
  if (!match) return { status: 'NOT_FOUND', data: { message: 'Match not found' } };

  await match.update({ homeTeamGoals, awayTeamGoals });

  return { status: 'SUCCESSFUL', data: { message: 'Goals updated' } };
};

const createMatch = async (match: matchInput) => {
  const newMatch = await MatchModel.create({ ...match, inProgress: true });

  return newMatch.dataValues;
};

export default {
  getAllMatches,
  getAllInProgress,
  updateProgress,
  updateGoals,
  createMatch,
};
