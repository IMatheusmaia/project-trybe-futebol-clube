import { describe } from 'mocha';
import * as sinon from 'sinon';
import { Request, Response} from 'express';
// @ts-ignore

import TeamModel from '../database/models/team.model';
import TeamService from '../service/team.service';
import TeamController from '../controller/team.controller';
import {AllTeamsMock} from './mocks/teams.mock';

const chai = require('chai');
const sinonChai = require('sinon-chai');
const {expect} = chai;

chai.use(sinonChai);

describe('Testa o retorno da camada controller para a rota de /teams', () => {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Testa se a função getAllTeams retorna o valor esperado em caso de retorno bem sucedido do banco de dados', async () => {
    
    const returnDB = AllTeamsMock.map((team) => TeamModel.build(team));

    sinon.stub(TeamService, 'getAllTeams').resolves({ status: 'SUCCESSFUL', data: returnDB});


    const returnTeamService = await TeamController.getAllTeams(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(returnDB);
  });

  it('Testa se a função getAllTeams retorna o valor esperado em caso de retorno mal sucedido do banco de dados', async () => {
    
    const returnDB = TeamModel.build();

    sinon.stub(TeamService, 'getAllTeams').resolves({ status: 'CONFLICT', data: []});


    const returnTeamService = await TeamController.getAllTeams(req, res);

    expect(res.status).to.have.been.calledWith(409);
    expect(res.json).to.have.been.calledWith({});
  });

  it('Testa se a função getTeamById retorna o valor esperado em caso de retorno bem sucedido do banco de dados', async () => {
    
    const returnDB = TeamModel.build(AllTeamsMock[0]);

    
    sinon.stub(TeamService, 'getTeamById').resolves({ status: 'SUCCESSFUL', data: returnDB});

    req.params = { id: '1' };

    await TeamController.getTeamById(req, res);


    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(returnDB);
  });

  it('Testa se a função getTeamById retorna o valor esperado em caso de retorno mal sucedido do banco de dados', async () => {
    
    const returnDB = TeamModel.build();

    
    sinon.stub(TeamService, 'getTeamById').resolves({ status: 'NOT_FOUND', data: null});

    req.params = { id: '99' };

    await TeamController.getTeamById(req, res);


    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({});
  });
});
