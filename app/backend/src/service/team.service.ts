import TeamModel from '../database/models/team.model';
import { TeamsDBReturn } from '../types/teams';

const getAllTeams = async (): Promise<TeamsDBReturn> => {
  const teams = await TeamModel.findAll({
    attributes: ['teamName'],
  });

  if (!teams) return { status: 'INTERNAL_SERVER_ERROR', data: [] };

  return { status: 'SUCCESSFUL', data: teams };
};

export default {
  getAllTeams,
};
