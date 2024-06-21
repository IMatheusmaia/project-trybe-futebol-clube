import { describe } from 'mocha';
import * as sinon from 'sinon';
import { Request, Response, NextFunction } from 'express'
// @ts-ignore
const chai = require('chai');
const sinonChai = require('sinon-chai');
const {expect} = chai;

chai.use(sinonChai);
import errorMiddleware from '../middlewares/errorMiddleware';
import ICustomError from '../Interfaces/ICustomError';
import { NOW } from 'sequelize';

describe('Testa as funções da pasta middleware', () => {
  beforeEach(function () {
    sinon.restore();
  });
    const req = {} as Request;
    const res = {} as Response;
    const next = () => ({}) as NextFunction;

  it('Testa se o retorn da função errorMiddleware tem o retorno esperado', async () => {

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    errorMiddleware({ statusCode: 500, message: 'Internal server error'} as ICustomError, req, res, next);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: 'Internal server error' });

    errorMiddleware({} as ICustomError, req, res, next);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: 'Something went wrong' });
  });
});
