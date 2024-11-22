import { Router } from "express";
import rideRouter from "./ride.route";

const router = Router();

router.use('/ride', rideRouter);

export default router;