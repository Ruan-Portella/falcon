const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
import RideModel from "../models/ride.model";
import DriverModel from "../models/driver.model";
import GoogleModel from "../models/google.model";
import { app } from "../app";
import { routeMock } from "../mocks/google.mock";
import { driverMock } from "../mocks/driver.mock";
import { confirmMock } from "../mocks/ride.mock";
import { prisma } from "../prisma/client";

chai.use(chaiHttp);

const { expect } = chai;

describe('Ride', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('Estimate', () => {
    it('Testa se é possível estimar uma viagem', async () => {
      sinon.stub(GoogleModel.prototype, 'getRoute').resolves(routeMock);
      sinon.stub(DriverModel.prototype, 'getDriversFilter').resolves([driverMock]);

      const { status, body } = await chai.request(app).post('/ride/estimate').send({
        customer_id: 1,
        origin: 'São Paulo',
        destination: 'Rio de Janeiro',
      });

      expect(status).to.be.equal(200);

      expect(body).to.have.property('routeResponse');
    });

    it('Testa se não é possível estimar uma viagem caso não tenha algum campo', async () => {
      const { status, body } = await chai.request(app).post('/ride/estimate').send({
        origin: 'São Paulo',
        destination: 'Rio de Janeiro',
      });

      expect(status).to.be.equal(400);

      expect(body).to.be.deep.equal({
        error_description: 'Os dados fornecidos no corpo da requisição são inválidos',
        error_code: 'INVALID_DATA',
      });
    });

    it('Testa se não é possível estimar uma viagem caso não seja um endereço válido', async () => {
      sinon.stub(GoogleModel.prototype, 'getRoute').resolves({ error: 'error' });
      const { status, body } = await chai.request(app).post('/ride/estimate').send({
        customer_id: 1,
        origin: 'São Paulo',
        destination: 'Rio de Janeiro',
      });

      expect(status).to.be.equal(404);

      expect(body).to.be.deep.equal({
        error_description: 'Endereço não encontrado',
        error_code: 'ADDRESS_NOT_FOUND',
      });
    });
  });

  describe('Confirm', () => {
    it('Testa se é possível confirmar uma viagem', async () => {
      sinon.stub(DriverModel.prototype, 'getDriverById').resolves(driverMock);
      sinon.stub(RideModel.prototype, 'createRide').resolves(true);

      const { status, body } = await chai.request(app).patch('/ride/confirm').send(confirmMock);

      expect(status).to.be.equal(200);

      expect(body).to.be.deep.equal({
        success: true,
      });
    });

    it('Testa se não é possível confirmar uma viagem caso não tenha algum campo', async () => {
      const { status, body } = await chai.request(app).patch('/ride/confirm').send({
        origin: 'São Paulo',
        destination: 'Rio de Janeiro',
      });

      expect(status).to.be.equal(400);

      expect(body).to.be.deep.equal({
        error_description: 'Os dados fornecidos no corpo da requisição são inválidos',
        error_code: 'INVALID_DATA',
      });
    });

    it('Testa se não é possível confirmar uma viagem caso não tenha motorista', async () => {
      sinon.stub(DriverModel.prototype, 'getDriverById').resolves(null);
      const { status, body } = await chai.request(app).patch('/ride/confirm').send(confirmMock);

      expect(status).to.be.equal(404);

      expect(body).to.be.deep.equal({
        error_description: 'Motorista não encontrado',
        error_code: 'DRIVER_NOT_FOUND',
      });
    });

    it('Testa se não é possível confirmar uma viagem caso a quilometragem seja inválida', async () => {
      sinon.stub(DriverModel.prototype, 'getDriverById').resolves({
        ...driverMock,
        minKm: 3000,
      });
      const { status, body } = await chai.request(app).patch('/ride/confirm').send({
        ...confirmMock,
        distance: 5,
      });

      expect(status).to.be.equal(406);

      expect(body).to.be.deep.equal({
        error_description: 'Quilometragem inválida para o motorista',
        error_code: 'INVALID_DISTANCE',
      });
    });

  });

  describe('Get Rides', () => {
    it('Testa se é possível buscar viagens', async () => {
      sinon.stub(DriverModel.prototype, 'getDriverById').resolves(driverMock);
      sinon.stub(RideModel.prototype, 'getRides').resolves([confirmMock]);
      const { status, body } = await chai.request(app).get('/ride/1');

      expect(status).to.be.equal(200);

      expect(body).to.have.property('rides');
    });

    it('Testa se é possível buscar viagens com motorista', async () => {
      sinon.stub(DriverModel.prototype, 'getDriverById').resolves(driverMock);
      sinon.stub(RideModel.prototype, 'getRides').resolves([confirmMock]);
      const { status, body } = await chai.request(app).get('/ride/1?driver_id=1');

      expect(status).to.be.equal(200);

      expect(body).to.have.property('rides');
    });

    it('Testa se não é possível buscar viagens caso não tenha algum campo', async () => {
      const { status, body } = await chai.request(app).get('/ride/0');

      expect(status).to.be.equal(400);

      expect(body).to.deep.equal({
        error_description: 'Os dados fornecidos no corpo da requisição são inválidos',
        error_code: 'INVALID_DATA',
      });
    });

    it('Testa se não é possível buscar viagens caso não tenha corrida', async () => {
      sinon.stub(RideModel.prototype, 'getRides').resolves([]);
      const { status, body } = await chai.request(app).get('/ride/1');

      expect(status).to.be.equal(404);

      expect(body).to.deep.equal({
        error_description: 'Nenhum registro encontrado',
        error_code: "NO_RIDES_FOUND",
      });
    });

    it('Testa se não é possível buscar viagens caso não tenha motorista válido', async () => {
      sinon.stub(DriverModel.prototype, 'getDriverById').resolves(null);
      const { status, body } = await chai.request(app).get('/ride/1?driver_id=1');

      expect(status).to.be.equal(404);

      expect(body).to.deep.equal({
        error_description: 'Motorista invalido',
        error_code: "INVALID_DRIVER",
      });
    });

    it('Testa se não é possível buscar viagens caso não tenha corrida com o motorista', async () => {
      sinon.stub(DriverModel.prototype, 'getDriverById').resolves(driverMock);
      sinon.stub(RideModel.prototype, 'getRides').resolves([]);
      const { status, body } = await chai.request(app).get('/ride/1?driver_id=1');

      expect(status).to.be.equal(404);

      expect(body).to.deep.equal({
        error_description: 'Nenhum registro encontrado',
        error_code: "NO_RIDES_FOUND",
      });
    });
  });

  describe('Ride Model', () => {
    it('Testa function createRide', async () => {
      prisma.rides.create = sinon.stub().resolves(true);
  
      const rideModel = new RideModel();
      const drivers = await rideModel.createRide({
        customer_id: '1',
        destination: 'São Paulo',
        origin: 'Rio de Janeiro',
        distance: 500,
        duration: '5h',
        driver_id: 1,
        value: 100,
      });
  
      expect(drivers).to.be.deep.equal(true);
    });

    it('Testa function getRides sem driver_id', async () => {
      prisma.rides.findMany = sinon.stub().resolves([driverMock]);
  
      const rideModel = new RideModel();
      const drivers = await rideModel.getRides('1');
  
      expect(drivers).to.be.deep.equal([driverMock]);
    });

    it('Testa function getRides com driver_id', async () => {
      prisma.rides.findMany = sinon.stub().resolves([driverMock]);
  
      const rideModel = new RideModel();
      const drivers = await rideModel.getRides('1', 1);
  
      expect(drivers).to.be.deep.equal([driverMock]);
    });
  })
})