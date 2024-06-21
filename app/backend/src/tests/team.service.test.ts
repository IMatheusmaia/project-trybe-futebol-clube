import { describe } from 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';
// @ts-ignore

import TeamModel, { TeamModelType} from '../database/models/team.model';
import TeamService from '../service/team.service';
import {AllTeamsMock} from './mocks/teams.mock';

describe('Testa o retorno da camada service para a rota de /teams', () => {
  beforeEach(function () { sinon.restore(); });

  it('Testa se a função getAllTeams retorna o valor esperado em caso de retorno bem sucedido do banco de dados', async () => {
    const returnDB = AllTeamsMock.map((team: TeamModelType) => TeamModel.build(team));
    
    sinon.stub(TeamModel, 'findAll').resolves(returnDB);

    const returnTeamService = await TeamService.getAllTeams();

    expect(returnTeamService.status).to.be.equal('SUCCESSFUL');
    expect(returnTeamService.data).to.be.eql(returnDB);
  });

  it('Testa se a função getAllTeams retorna o valor esperado em caso de retorno mal sucedido do banco de dados', async () => {
    const returnDB = TeamModel.build();
    
    sinon.stub(TeamModel, 'findAll').resolves();

    const returnTeamService = await TeamService.getAllTeams();

    expect(returnTeamService.status).to.be.equal('CONFLICT');
    expect(returnTeamService.data).to.be.eql([]);
  });

  it('Testa se a função getTeamById retorna o valor esperado em caso de retorno bem sucedido do banco de dados', async () => {
    const returnDB = TeamModel.build(AllTeamsMock[0]);
    
    sinon.stub(TeamModel, 'findOne').resolves(returnDB);

    const returnTeamService = await TeamService.getTeamById(1);

    expect(returnTeamService.status).to.be.equal('SUCCESSFUL');
    expect(returnTeamService.data?.dataValues).to.be.eql(AllTeamsMock[0]);
  });

  it('Testa se a função getTeamById retorna o valor esperado em caso de retorno mal sucedido do banco de dados', async () => {
    const returnDB = TeamModel.build();
    
    sinon.stub(TeamModel, 'findOne').resolves();

    const returnTeamService = await TeamService.getTeamById(1);

    expect(returnTeamService.status).to.be.equal('NOT_FOUND');
    expect(returnTeamService.data).to.be.eql(null);
  });
});
