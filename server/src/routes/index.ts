import { Router } from "express";
import rideRouter from "./ride.route";
import driverRouter from "./driver.route";

const router = Router();

router.use('/ride', rideRouter);
router.use('/driver', driverRouter);

export default router;