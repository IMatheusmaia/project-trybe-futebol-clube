import { describe } from 'mocha';
import * as sinon from 'sinon';
import { Request, Response} from 'express';
// @ts-ignore

import MatchModel from '../database/models/match.model';
import MatchService from '../service/match.service';
import MatchController from '../controller/match.controller';
import {AllmatchesMock} from './mocks/matches.mock';

const chai = require('chai');
const sinonChai = require('sinon-chai');
const {expect} = chai;

chai.use(sinonChai);

describe('Testa o retorno da camada controller para a rota de /matches', () => {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  it('Testa se a função createMatch retorna o valor esperado em caso de retorno bem sucedido do banco de dados', async () => {
    const newMatch = {
      homeTeamId: 5,
      awayTeamId: 3, 
      homeTeamGoals: 0,
      awayTeamGoals: 0
    };
    req.body = sinon.stub().returns(newMatch);

    const returnDB = MatchModel.build(req.body);
    returnDB.dataValues.id = 10;
    returnDB.dataValues.inProgress = true;
    returnDB.dataValues = { ...returnDB.dataValues, ...newMatch };

    sinon.stub(MatchModel, 'create').resolves(returnDB.dataValues as any);
    sinon.stub(MatchService, 'createMatch').resolves({ status: 'CREATED', data: returnDB.dataValues as any});

    await MatchController.createMatch(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(returnDB.dataValues);
  });
  it('Testa se a função createMatch retorna o valor esperado em caso de retorno mal sucedido do banco de dados', async () => {
    
    req.body = sinon.stub().returns(undefined);

    const returnDB = MatchModel.build(req.body);


    sinon.stub(MatchModel, 'create').resolves(returnDB);
    sinon.stub(MatchService, 'createMatch').resolves({ status: 'CONFLICT', data: { message: 'Unable to create match'}});

    await MatchController.createMatch(req, res);

    expect(res.status).to.have.been.calledWith(409);
    expect(res.json).to.have.been.calledWith({});
  });
  before(function () {
    req.query = sinon.stub().returns(undefined) as any;
  });

  it('Testa se a função getAllMatches retorna o valor esperado em caso de retorno bem sucedido do banco de dados', async () => {
    
    const returnDB = AllmatchesMock.map((team) => MatchModel.build(team));


    sinon.stub(MatchService, 'getAllMatches').resolves({ status: 'SUCCESSFUL', data: returnDB});

    await MatchController.getAllMatches(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(returnDB);
  });
  it('Testa se a função getAllMatches retorna o valor esperado em caso de retorno mal sucedido do banco de dados', async () => {

    sinon.stub(MatchModel, 'findAll').resolves();
    sinon.stub(MatchService, 'getAllMatches').resolves({ status: 'CONFLICT', data: []});

    await MatchController.getAllMatches(req, res);

    expect(res.status).to.have.been.calledWith(409);
    expect(res.json).to.have.been.calledWith({});
  });
  it('Testa se a função updateProgress retorna o valor esperado em caso de retorno bem sucedido do banco de dados', async () => {
    
    req.params = { id: '1' };


    sinon.stub(MatchService, 'updateProgress').resolves({ status: 'SUCCESSFUL', data: { message: 'Finished'}});

    await MatchController.updateProgress(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ message: 'Finished'});
  });
  it('Testa se a função updateProgress retorna o valor esperado em caso de retorno mal sucedido do banco de dados', async () => {
    
    req.params = { id: '99' };

    sinon.stub(MatchModel, 'findByPk').resolves(null);
    sinon.stub(MatchService, 'updateProgress').resolves({ status: 'NOT_FOUND', data: { message: 'Match not found'}});

    await MatchController.updateProgress(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({});
  });
  it('Testa se a função updateGoals retorna o valor esperado em caso de retorno bem sucedido do banco de dados', async () => {
    
    req.params = { id: '1' };
    req.body = { homeTeamGoals: 1, awayTeamGoals: 1 };


    sinon.stub(MatchService, 'updateGoals').resolves({ status: 'SUCCESSFUL', data: { message: 'Goals updated'}});

    await MatchController.updateGoals(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ message: 'Goals updated'});
  });
  it('Testa se a função updateGoals retorna o valor esperado em caso de retorno mal sucedido do banco de dados', async () => {
    
    req.params = { id: '99' };
    req.body = { homeTeamGoals: 1, awayTeamGoals: 1 };

    sinon.stub(MatchModel, 'findByPk').resolves(null);
    sinon.stub(MatchService, 'updateGoals').resolves({ status: 'NOT_FOUND', data: { message: 'Match not found'}});

    await MatchController.updateGoals(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({});
  });
});
