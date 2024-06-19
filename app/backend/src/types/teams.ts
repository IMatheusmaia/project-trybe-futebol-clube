import { TeamSequelizeModel } from '../database/models/team.model';

export type TeamsDBReturnAll = {
  status: string,
  data: TeamSequelizeModel[] | []
};

export type TeamsDBReturnOne = {
  status: string,
  data: TeamSequelizeModel | null
};
