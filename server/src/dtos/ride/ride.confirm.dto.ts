import { RideEstimateDto } from "./ride.estimate.dto";

export interface RideConfirmDto extends RideEstimateDto {
  distance: number;
  duration: string;
  driver: {
    id: number,
    name: string,
  },
  value: number;
};