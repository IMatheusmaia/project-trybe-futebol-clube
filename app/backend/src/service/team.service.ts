import TeamModel from '../database/models/team.model';
import { TeamsDBReturnAll, TeamsDBReturnOne } from '../types/teams';

const getAllTeams = async (): Promise<TeamsDBReturnAll> => {
  const teams = await TeamModel.findAll({
    attributes: ['id', 'teamName'],
  });

  if (!teams) return { status: 'CONFLICT', data: [] };

  return { status: 'SUCCESSFUL', data: teams };
};

const getTeamById = async (id: number): Promise<TeamsDBReturnOne> => {
  const team = await TeamModel.findOne({
    where: { id },
    attributes: ['id', 'teamName'],
  });

  if (team) return { status: 'SUCCESSFUL', data: team };

  return { status: 'NOT_FOUND', data: null };
};

export default {
  getAllTeams,
  getTeamById,
};
