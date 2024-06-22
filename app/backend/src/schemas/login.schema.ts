import * as Joi from 'joi';
import { ObjectSchema } from 'joi';
import { LoginType } from '../types/login';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const loginSchema = Joi.object({
  email: Joi.string().regex(emailRegex).min(6).required(),
  password: Joi.string().min(6).required(),
}) as ObjectSchema<LoginType>;

export default loginSchema;
