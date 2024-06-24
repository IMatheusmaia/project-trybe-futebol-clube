import { describe } from 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';
// @ts-ignore

import MatchModel, { MatchModelType} from '../database/models/match.model';
import MatchService from '../service/match.service';
import {AllmatchesMock, AllmatchesInProgressMock} from './mocks/matches.mock';

describe('Testa o retorno da camada service para a rota de /matches', () => {
  beforeEach(function () { sinon.restore(); });

  it('Testa se a função updateProgress retorna o valor esperado em caso de retorno bem sucedido do banco de dados', async () => {
    
    sinon.stub(MatchModel, 'update').resolves();

    const returnTeamService = await MatchService.updateProgress(1);

    expect(returnTeamService.status).to.be.equal('SUCCESSFUL');
    expect(returnTeamService.data).to.be.eql({ message: 'Finished'});
  });

  it('Testa se a função updateGoals retorna o valor esperado em caso de retorno bem sucedido do banco de dados', async () => {
    const matchId = AllmatchesMock.find((match) => match.id === 1);
    const returnDB = MatchModel.build(matchId);

    sinon.stub(MatchModel, 'findByPk').resolves(returnDB);
    sinon.stub(MatchModel, 'update').resolves();

    const returnTeamService = await MatchService.updateGoals(1, 3, 0);

    expect(returnTeamService.status).to.be.equal('SUCCESSFUL');
    expect(returnTeamService.data).to.be.eql({ message: 'Goals updated'});
  });

  it('Testa se a função createMatch retorna o valor esperado em caso de retorno bem sucedido do banco de dados', async () => {
    const newMatch = { homeTeamId: 6, awayTeamId: 8, homeTeamGoals: 0, awayTeamGoals: 0, inProgress: true };
    const returnDB = MatchModel.build({...newMatch, id: 6 });

    sinon.stub(MatchModel, 'create').resolves(returnDB);
    console.log(returnDB);
    const returnTeamService = await MatchService.createMatch({...newMatch});

    expect(returnTeamService.dataValues).to.be.eql({...newMatch, id: 6});
  });
});
