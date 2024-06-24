import { describe } from 'mocha';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/match.model';
import authorization from '../middlewares/auth/authorization';
import {AllmatchesMock, AllmatchesInProgressMock} from './mocks/matches.mock'
import { Response } from 'superagent';
import { MatchModelType } from '../database/models/match.model';

chai.use(chaiHttp);

const { expect } = chai;
const authParams = { 
    req: { headers : { authorization: sinon.stub().resolves(true)},},
    res: sinon.stub().returnsThis(),
    next: sinon.stub()
};

describe('Testa as respostas para a rota /matches em caso de sucesso ou falha', () => {
  beforeEach(function () { sinon.restore(); });

  it('Testa se ao fazer uma requisição para a rota /matches, a camada model retorna a response esperada em caso de sucesso', async () => {
    const mockReturn = AllmatchesMock.map((match: MatchModelType) => MatchModel.build(match));

    sinon.stub(MatchModel, 'findAll').resolves(mockReturn);

    const httpResponse: Response = await chai
      .request(app)
      .get('/matches');
    
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.eql(AllmatchesMock);
  });
  it('Testa se ao fazer uma requisição para a rota /matches com queryString "inProgress=true", a camada model retorna a response esperada em caso de sucesso', async () => {
    const mockReturn = AllmatchesInProgressMock.map((match: MatchModelType) => MatchModel.build(match));

    sinon.stub(MatchModel, 'findAll').resolves(mockReturn);

    const httpResponse: Response = await chai
      .request(app)
      .get('/matches?inProgress=true');
    
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.eql(AllmatchesInProgressMock);
  });
});
