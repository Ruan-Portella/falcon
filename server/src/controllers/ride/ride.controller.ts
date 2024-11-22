import { Request, Response } from "express";
import { RideEstimateDto } from "../../dtos/ride/ride.estimate.dto";
import RideService from "../../services/ride/ride.service";
import { RideConfirmDto } from "../../dtos/ride/ride.confirm.dto";

const rideService = new RideService();

export default class RideController {
  public async estimate(req: Request, res: Response): Promise<void> {
    const rideEstimateDto: RideEstimateDto = req.body;

    const response = await rideService.estimate(rideEstimateDto);

    res.status(response.status).json(response.data);
  }

  public async confirm(req: Request, res: Response): Promise<void> {
    const rideConfirmDto: RideConfirmDto = req.body;

    const response = await rideService.confirm(rideConfirmDto);

    res.status(response.status).json(response.data);
  }

  public async getRides(req: Request, res: Response): Promise<void> {
    const { customer_id } = req.params;
    const { driver_id } = req.query;
    
    const response = await rideService.getRides(customer_id, Number(driver_id));

    res.status(response.status).json(response.data);
  }
}