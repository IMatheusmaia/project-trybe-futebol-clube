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
    return res.status(500).json({ message: 'fatal error' });
  }
};

export default {
  getAllTeams,
};
