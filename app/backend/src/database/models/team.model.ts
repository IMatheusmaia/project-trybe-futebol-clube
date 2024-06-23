import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import Team from '../../Interfaces/Teams';

export type TeamModelType = Optional<Team, 'id'>;

type TeamSequelizeModelCreator = ModelDefined<Team, TeamModelType>;

export type TeamSequelizeModel = Model<Team, TeamModelType>;

const TeamModel: TeamSequelizeModelCreator = db.define('Team', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'teams',
  timestamps: false,
  underscored: true,
});

export default TeamModel;
