const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
import GoogleModel from "../models/google.model";

chai.use(chaiHttp);

const { expect } = chai;

describe('Driver', () => {
  beforeEach(() => {
    sinon.restore();
    global.fetch = sinon.stub().resolves({
      json: () => Promise.resolve({ routes: {} }),
    });
  });

  it('Testa driver model getDriversFilter', async () => {
    const googleModel = new GoogleModel();
    const drivers = await googleModel.getRoute({origin: '', destination: ''});

    expect(drivers).to.have.property('routes');
  });
})