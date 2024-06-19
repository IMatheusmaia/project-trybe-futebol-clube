import { TeamSequelizeModel } from '../database/models/team.model';

export type TeamsDBReturn = {
  status: string,
  data: TeamSequelizeModel[] | []
};
