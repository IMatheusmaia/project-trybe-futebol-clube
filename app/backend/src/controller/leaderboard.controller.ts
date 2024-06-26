import { Request, Response } from 'express';
import leaderboardService from '../service/leaderboard.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const listLeaderTeams = async (_req: Request, res: Response) => {
  try {
    const { status, data } = await leaderboardService.listLeaderTeams('home');

    if (status === 'SUCCESSFUL') {
      return res.status(200).json(data);
    }

    throw new Error(status);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(mapStatusHTTP(error.message)).json({});
    }
  }
};

export default {
  listLeaderTeams,
};
