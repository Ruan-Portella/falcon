import { HttpError } from "../../errors/error";
import { prisma } from "../../prisma/client";

export default class DriverService {
  public async getDrivers(): Promise<{status: number, data: object}> {
    const drivers = await prisma.driver.findMany();

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
