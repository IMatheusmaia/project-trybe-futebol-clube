import { Request, Response } from 'express';
import TeamService from '../service/team.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const getAllTeams = async (_req: Request, res: Response) => {
  try {
    const { status, data } = await TeamService.getAllTeams();

    if (status === 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);

    throw new Error(status);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(mapStatusHTTP(error.message)).json({});
    }
  }
};

const getTeamById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { status, data } = await TeamService.getTeamById(Number(id));

    if (status === 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);

    throw new Error(status);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(mapStatusHTTP(error.message)).json({});
    }
  }
};

export default {
  getAllTeams,
  getTeamById,
};
