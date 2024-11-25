const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
import DriverModel from "../models/driver.model";
import {app} from "../app";
import {prisma} from "../prisma/client";

chai.use(chaiHttp);

const { expect } = chai;

describe('Driver', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('Testa se é possível procurar por motoristas', async () => {
    sinon.stub(DriverModel.prototype, 'getDrivers').resolves([{
      id: 1,
      name: 'John Doe',
      description: 'Driver',
      vehicle: 'Car',
      rating: 5,
      comment: 'Good driver',
      ratePerKm: 1.5,
      minKm: 10,
    }]);

    const {status, body} = await chai.request(app).get('/driver');

    expect(status).to.be.equal(200);

    expect(body).to.be.deep.equal({
      drivers: [{
        id: 1,
        name: 'John Doe',
      }]
    });
  });

  it('Testa driver model getDrivers', async () => {
    prisma.driver.findMany = sinon.stub().resolves([{
      id: 1,
      name: 'John Doe',
      description: 'Driver',
      vehicle: 'Car',
      rating: 5,
      comment: 'Good driver',
      ratePerKm: 1.5,
      minKm: 10,
    }]);

    const driverModel = new DriverModel();
    const drivers = await driverModel.getDrivers();

    expect(drivers).to.be.deep.equal([{
      id: 1,
      name: 'John Doe',
      description: 'Driver',
      vehicle: 'Car',
      rating: 5,
      comment: 'Good driver',
      ratePerKm: 1.5,
      minKm: 10,
    }]);
  });

  it('Testa driver model getDriverById', async () => {
    prisma.driver.findUnique = sinon.stub().resolves({
      id: 1,
      name: 'John Doe',
      description: 'Driver',
      vehicle: 'Car',
      rating: 5,
      comment: 'Good driver',
      ratePerKm: 1.5,
      minKm: 10,
    });

    const driverModel = new DriverModel();
    const drivers = await driverModel.getDriverById({id: 1});

    expect(drivers).to.be.deep.equal({
      id: 1,
      name: 'John Doe',
      description: 'Driver',
      vehicle: 'Car',
      rating: 5,
      comment: 'Good driver',
      ratePerKm: 1.5,
      minKm: 10,
    });
  });

  it('Testa driver model getDriversFilter', async () => {
    prisma.driver.findMany = sinon.stub().resolves([{
      id: 1,
      name: 'John Doe',
      description: 'Driver',
      vehicle: 'Car',
      rating: 5,
      comment: 'Good driver',
      ratePerKm: 1.5,
      minKm: 10,
    }]);

    const driverModel = new DriverModel();
    const drivers = await driverModel.getDriversFilter({where: {id: 1}, orderBy: {id: 'asc'}});

    expect(drivers).to.be.deep.equal([{
      id: 1,
      name: 'John Doe',
      description: 'Driver',
      vehicle: 'Car',
      rating: 5,
      comment: 'Good driver',
      ratePerKm: 1.5,
      minKm: 10,
    }]);
  });

  it('Testa se é um erro é lançado ao não encontrar motoristas', async () => {
    sinon.stub(DriverModel.prototype, 'getDrivers').resolves([]);

    const {status, body} = await chai.request(app).get('/driver');

    expect(status).to.be.equal(404);

    expect(body).to.be.deep.equal({
      error_description: 'Nenhum registro encontrado',
      error_code: "NO_DRIVERS_FOUND",
    });
  });

  it('Testa se é um erro global é lançado', async () => {
    sinon.stub(DriverModel.prototype, 'getDrivers').resolves(null);

    const {status, body} = await chai.request(app).get('/driver');

    expect(status).to.be.equal(500);

    expect(body).to.be.deep.equal({
      error_description: 'Internal server error',
      error_code: 'INTERNAL_SERVER_ERROR',
    });
  });
})