import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import Match from '../../Interfaces/Matches';
import TeamModel from './team.model';

export type MatchModelType = Optional<Match, 'id'>;

type MatchSequelizeModelCreator = ModelDefined<Match, MatchModelType>;

export type MatchSequelizeModel = Model<Match, MatchModelType>;

const MatchModel: MatchSequelizeModelCreator = db.define('Match', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    field: 'home_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    field: 'away_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'in_progress',
  },
}, {
  tableName: 'matches',
  timestamps: false,
  underscored: true,
});

MatchModel.belongsTo(TeamModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
MatchModel.belongsTo(TeamModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default MatchModel;
