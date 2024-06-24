import * as Joi from 'joi';
import { ObjectSchema } from 'joi';
import { GoalsInputMatch } from '../types/matches';

const matchGoalsSchema = Joi.object({
  homeTeamGoals: Joi.number().positive().allow(0).required(),
  awayTeamGoals: Joi.number().positive().allow(0).required(),
}) as ObjectSchema<GoalsInputMatch>;

export default matchGoalsSchema;
