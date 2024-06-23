import MatchModel from '../database/models/match.model';
import TeamModel from '../database/models/team.model';
import { MatchesDBReturnAll } from '../types/matches';

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

export default {
  getAllMatches,
  getAllInProgress,
};
