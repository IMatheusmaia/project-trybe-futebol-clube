import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import User from '../../Interfaces/Users';

export type UserModelType = Optional<User, 'id'>;

type UserSequelizeModelCreator = ModelDefined<User, UserModelType>;

export type UserSequelizeModel = Model<User, UserModelType>;

const UserModel: UserSequelizeModelCreator = db.define('User', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: false,
  underscored: false,
});

export default UserModel;
