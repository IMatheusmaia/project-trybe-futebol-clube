import * as Joi from 'joi';
import { ObjectSchema } from 'joi';
import { LoginType } from '../types/login';

const loginSchema = Joi.object({
  email: Joi.string().email().min(6).required(),
  password: Joi.string().min(6).required(),
}) as ObjectSchema<LoginType>;

export default loginSchema;
