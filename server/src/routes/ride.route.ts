import { Router } from "express";
import RideController from "../controllers/ride/ride.controller";

const rideRouter = Router();
const rideController = new RideController();

rideRouter.get("/:customer_id", rideController.getRides);
rideRouter.post("/estimate", rideController.estimate);
rideRouter.patch("/confirm", rideController.confirm);

export default rideRouter;