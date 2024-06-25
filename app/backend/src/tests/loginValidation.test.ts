import { describe } from 'mocha';
import * as sinon from 'sinon';
import { Request, Response, NextFunction } from 'express'
// @ts-ignore
const chai = require('chai');
const sinonChai = require('sinon-chai');
const {expect} = chai;

chai.use(sinonChai);

import loginValidation from '../middlewares/loginValidation';
import loginSchema from '../schemas/login.schema';

describe('Testa as funções da pasta middleware', () => {
  beforeEach(function () {
    sinon.restore();
  });
    const req = {} as Request;
    const res = {} as Response;
    const next = sinon.spy() as NextFunction;

  it('Testa se o retorn da função loginValidation tem o retorno esperado ao trazer um body vazio', async () => {
    req.body = { email: '', password: '' };

    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub().returnsThis();

    await loginValidation(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: 'All fields must be filled' });
  });

  it('Testa se o retorn da função loginValidation tem o retorno esperado ao conter um erro de validação de schema', async () => {
    req.body = { email: 'admin@admin.com', password: 'secret_admin' };

    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub().returnsThis();

    sinon.stub(loginSchema, 'validate').returns({ error: true } as any);

    await loginValidation(req, res, next);

    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith({ message: 'Invalid email or password' });
  });

  it('Testa se o retorn da função loginValidation tem o retorno esperado ao conter um erro de validação de schema', async () => {
    req.body = { email: 'admin@admin.com', password: 'secret_admin' };

    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub().returnsThis();

    sinon.stub(loginSchema, 'validate').returns({ error: false } as any);

    await loginValidation(req, res, next);

    expect(next).to.have.been.called;
  });
});
