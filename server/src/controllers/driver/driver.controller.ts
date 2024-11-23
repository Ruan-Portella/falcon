import { Request, Response } from "express";
import DriverService from "../../services/driver/driver.service";

const driverService = new DriverService();

export default class DriverController {
  public async getDrivers(req: Request, res: Response): Promise<void> {
    const response = await driverService.getDrivers();

    res.status(response.status).json(response.data);
  }
}