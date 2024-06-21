import { describe } from 'mocha';
import * as sinon from 'sinon';
// @ts-ignore
const chai = require('chai');
const sinonChai = require('sinon-chai');
const {expect} = chai;

chai.use(sinonChai);
import mapStatusHTTP  from '../utils/mapStatusHTTP';

describe('Testa as funções da pasta utils', () => {
  beforeEach(function () {
    sinon.restore();
  });

  it('Testa se o retorn da função mapStatusHTTP tem o retorno esperado', async () => {
    
    let returnStatus = mapStatusHTTP('SUCCESSFUL');

    expect(returnStatus).to.be.equal(200);

    returnStatus = mapStatusHTTP('NOT_FOUND');
    expect(returnStatus).to.be.equal(404);

    returnStatus = mapStatusHTTP('BAD_REQUEST');
    expect(returnStatus).to.be.equal(400);

    returnStatus = mapStatusHTTP('CONFLICT');
    expect(returnStatus).to.be.equal(409);

    returnStatus = mapStatusHTTP('');
    expect(returnStatus).to.be.equal(500);
  });
});
