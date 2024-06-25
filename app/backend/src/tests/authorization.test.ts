import { describe } from 'mocha';
import * as sinon from 'sinon';
import { Request, Response, NextFunction } from 'express'
// @ts-ignore
const chai = require('chai');
const sinonChai = require('sinon-chai');
const {expect} = chai;

chai.use(sinonChai);

import authorization from '../middlewares/auth/authorization';
import * as jwt from 'jsonwebtoken';
import UserModel from '../database/models/user.model';

describe('Testa as funções da pasta middleware', () => {
  beforeEach(function () {
    sinon.restore();
  });
    const req = {} as Request;
    const res = {} as Response;
    const next = sinon.spy() as NextFunction;

  it('Testa se o retorno da função tokenValidation tem o retorno esperado caso não seja fornecido uma authorization', async () => {
    req.headers = { };

    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub().returnsThis();

    await authorization(req, res, next);

    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith({ message: 'Token not found' });
    expect(next).not.to.have.been.called;
  });

  it('Testa se o retorno da função authorization tem o retorno esperado caso não seja fornecido um token válido', async () => {
    req.headers = { authorization: 'anyToken'};

    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub().returnsThis();

    sinon.stub(jwt, 'verify').returns(undefined);

    await authorization(req, res, next);

    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith({ message: 'Token must be a valid token' });
    expect(next).not.to.have.been.called;
  });

  it('Testa se o retorno da função authorization tem o retorno esperado caso não seja fornecido um token decodificado válido', async () => {
    req.headers = { authorization: 'anyToken'};

    res.status = sinon.stub().returnsThis();
    res.json = sinon.stub().returnsThis();

    sinon.stub(jwt, 'verify').resolves({ email: 'anyEmail' });
    sinon.stub(UserModel, 'findOne').resolves(undefined);

    await authorization(req, res, next);

    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith({ message: 'Token must be a valid token' });
    expect(next).not.to.have.been.called;
  });

//   it('Testa se o retorno da função authorization tem o retorno esperado caso token seja váido', async () => {
//     req.headers = { authorization: 'anyToken'};

//     res.status = sinon.stub().returnsThis();
//     res.json = sinon.stub().returnsThis();

//     sinon.stub(jwt, 'verify').resolves({ email: 'anyEmail', role: 'admin' });
//     sinon.stub(UserModel, 'findOne').resolves({ email: 'anyEmail', password: 'anyPassword'} as any);

//     await authorization(req, res, next);

//     req.body.user = { email: 'anyEmail', role: 'admin' };

//     expect(next).to.have.been.called;
//     expect(res.status).to.have.been.calledWith(200);
//     expect(res.json).to.have.been.calledWith({role: 'admin'});
//   });
});
