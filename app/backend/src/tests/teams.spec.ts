import { describe } from 'mocha';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/team.model';
import {AllTeamsMock} from './mocks/teams.mock'
import { Response } from 'superagent';
import { TeamModelType } from '../database/models/team.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa as respostas para a rota /teams em caso de sucesso ou falha', () => {
  beforeEach(function () { sinon.restore(); });

  it('Testa se ao fazer uma requisição para a rota /teams, retorna a response esperada em caso de sucesso', async () => {
    const mockReturn = AllTeamsMock.map((team: TeamModelType) => TeamModel.build(team));

    sinon.stub(TeamModel, 'findAll').resolves(mockReturn);

    const httpResponse: Response = await chai
      .request(app)
      .get('/teams');
    
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.eql(AllTeamsMock);
  });
});
