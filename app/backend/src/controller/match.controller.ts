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
const updateProgress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, data } = await MatchService.updateProgress(Number(id));

    if (status === 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);

    throw new Error(status);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(mapStatusHTTP(error.message)).json({});
    }
  }
};
const updateGoals = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await MatchService
      .updateGoals(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));

    if (status === 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);

    throw new Error(status);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(mapStatusHTTP(error.message)).json({});
    }
  }
};
const createMatch = async (req: Request, res: Response) => {
  try {
    const newMatch = await MatchService.createMatch(req.body);

    if (newMatch) return res.status(201).json(newMatch);
  } catch (error: unknown) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default {
  getAllMatches,
  updateProgress,
  updateGoals,
  createMatch,
};
