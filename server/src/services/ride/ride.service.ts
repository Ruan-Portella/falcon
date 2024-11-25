import { RideConfirmDto } from "../../dtos/ride/ride.confirm.dto";
import { RideEstimateDto } from "../../dtos/ride/ride.estimate.dto";
import { HttpError } from "../../errors/error";
import DriverModel from "../../models/driver.model";
import GoogleModel from "../../models/google.model";
import RideModel from "../../models/ride.model";
import { prisma } from "../../prisma/client";

export default class RideService {
  constructor(
    private rideModel = new RideModel(),
    private driverModel = new DriverModel(),
    private googleModel = new GoogleModel(),
  ) {}


  public async estimate({
    customer_id,
    destination,
    origin,
  }: RideEstimateDto): Promise<{status: number, data: object}> {

    if (!customer_id || !destination || !origin || destination === origin) {
      throw new HttpError(400, {
        error_description: "Os dados fornecidos no corpo da requisição são inválidos",
        error_code: "INVALID_DATA",
      });
    }

    const response = await this.googleModel.getRoute({origin, destination});

    if (!response.routes) {
      throw new HttpError(404, {
        error_description: 'Endereço não encontrado',
        error_code: 'ADDRESS_NOT_FOUND',
      });
    }

    const kmDistance = response.routes[0].distanceMeters / 1000;

    const drivers = await this.driverModel.getDriversFilter({
      where: {
        minKm: {
          lte: kmDistance,
        }
      },
      orderBy: {
        ratePerKm: 'asc'
      }
    });

    const options = drivers.map((driver) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      review: {
        rating: driver.rating,
        comment: driver.comment,
      },
      value: driver.ratePerKm * kmDistance
    }));
    
    return {
      status: 200,
      data: {
        origin: {
          latitude: response.routes[0].legs[0].startLocation.latLng.latitude,
          longitude: response.routes[0].legs[0].startLocation.latLng.longitude,
        },
        destination: {
          latitude: response.routes[0].legs[0].endLocation.latLng.latitude,
          longitude: response.routes[0].legs[0].endLocation.latLng.longitude,
        },
        distance: response.routes[0].distanceMeters,
        duration: response.routes[0].duration,
        options,
        routeResponse: response,
      },
    };
  }

  public async confirm({
    customer_id,
    destination,
    origin,
    distance,
    duration,
    driver,
    value
  }: RideConfirmDto): Promise<{status: number, data: object}> {

    if (!customer_id || !destination || !origin || destination === origin) {
      throw new HttpError(400, {
        error_description: "Os dados fornecidos no corpo da requisição são inválidos",
        error_code: "INVALID_DATA",
      });
    }

    const driverDB = await this.driverModel.getDriverById({id: driver.id});

    if (!driverDB) {
      throw new HttpError(404, {
        error_description: 'Motorista não encontrado',
        error_code: 'DRIVER_NOT_FOUND',
      });
    }

    if (driverDB.minKm > distance) {
      throw new HttpError(406, {
        error_description: 'Quilometragem inválida para o motorista',
        error_code: "INVALID_DISTANCE",
      });
    }

    await this.rideModel.createRide({
      customer_id,
      destination,
      origin,
      distance,
      duration,
      driver_id: driver.id,
      value,
    });

    return {
      status: 200,
      data: {
        success: true,
      },
    };
  }

  public async getRides(customer_id: string, driver_id?: number): Promise<{status: number, data: object}> {
    if (!customer_id || customer_id === '0') {
      throw new HttpError(400, {
        error_description: "Os dados fornecidos no corpo da requisição são inválidos",
        error_code: "INVALID_DATA",
      });
    }

    if (driver_id) {

      const driver = await this.driverModel.getDriverById({id: driver_id});

      if (!driver) {
        throw new HttpError(404, {
          error_description: 'Motorista invalido',
          error_code: "INVALID_DRIVER",
        });
      }

      const rides = await this.rideModel.getRides(customer_id, driver_id);

      if (rides.length === 0) {
        throw new HttpError(404, {
          error_description: 'Nenhum registro encontrado',
          error_code: "NO_RIDES_FOUND",
        });
      }

      const ridesWithoutCustomer = rides.map((ride) => ({
        id: ride.id,
        date: ride.date,
        destination: ride.destination,
        origin: ride.origin,
        distance: ride.distance,
        duration: ride.duration,
        driver: {
          id: driver.id,
          name: driver.name,
        },
        value: ride.value,
      }));

      return {
        status: 200,
        data: {
          customer_id,
          rides: ridesWithoutCustomer,
        }
      }
    } 

    const rides = await this.rideModel.getRides(customer_id);

    if (rides.length === 0) {
      throw new HttpError(404, {
        error_description: 'Nenhum registro encontrado',
        error_code: "NO_RIDES_FOUND",
      });
    }

    const ridesWithoutCustomer = rides.map((ride) => ({
      id: ride.id,
      date: ride.date,
      destination: ride.destination,
      origin: ride.origin,
      distance: ride.distance,
      duration: ride.duration,
      driver: {
        id: ride.driver.id,
        name: ride.driver.name,
      },
      value: ride.value,
    }));

    return {
      status: 200,
      data: {
        customer_id,
        rides: ridesWithoutCustomer
      }
    }
  }
}
