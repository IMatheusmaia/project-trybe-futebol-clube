import { Request, Response } from 'express';
import MatchService from '../service/match.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const getAllMatches = async (req: Request, res: Response) => {
  try {
    const { inProgress } = req.query;
    const boolean = inProgress === 'true';
    const { status, data } = inProgress !== undefined
      ? await MatchService.getAllInProgress(boolean)
      : await MatchService.getAllMatches();

    if (status === 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);

    throw new Error(status);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(mapStatusHTTP(error.message)).json({});
    }
  }
};

export default {
  getAllMatches,
};
