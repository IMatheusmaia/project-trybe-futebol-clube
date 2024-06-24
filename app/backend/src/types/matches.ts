import { MatchSequelizeModel } from '../database/models/match.model';

export type MatchesDBReturnAll = {
  status: string,
  data: MatchSequelizeModel[] | []
};

export type GoalsInputMatch = {
  homeTeamGoals: number,
  awayTeamGoals: number
};
