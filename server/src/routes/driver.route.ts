import { Router } from "express";
import DriverController from "../controllers/driver/driver.controller";

const driverRouter = Router();
const driverController = new DriverController();

driverRouter.get("/", driverController.getDrivers);

export default driverRouter;