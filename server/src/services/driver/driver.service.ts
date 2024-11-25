import { HttpError } from "../../errors/error";
import DriverModel from "../../models/driver.model";

export default class DriverService {
  constructor(
    private driverModel = new DriverModel(),
  ) {}

  public async getDrivers(): Promise<{status: number, data: object}> {
    const drivers = await this.driverModel.getDrivers();

    if (drivers.length === 0) {
      throw new HttpError(404, {
        error_description: 'Nenhum registro encontrado',
        error_code: "NO_DRIVERS_FOUND",
      });
    }

    const driversResponse = drivers.map(driver => ({
      id: driver.id,
      name: driver.name,
    }));

    return {
      status: 200,
      data: {
        drivers: driversResponse
      }
    }
  }
}
