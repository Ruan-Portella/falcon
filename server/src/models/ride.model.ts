import { prisma } from "../prisma/client";

export default class RideModel {
  private model = prisma.rides;

  public async createRide({
    customer_id,
    destination,
    origin,
    distance,
    duration,
    driver_id,
    value,
  }: {
    customer_id: string;
    destination: string;
    origin: string;
    distance: number;
    duration: string;
    driver_id: number;
    value: number
  }): Promise<Boolean> {
    await this.model.create({
      data: {
        customer_id,
        destination,
        origin,
        distance,
        duration,
        driver_id,
        value,
      }
    });
    return true;
  }

  public async getRides(customer_id: string, driver_id?: number): Promise<{
    id: number;
    customer_id: string;
    destination: string;
    date: Date;
    origin: string;
    distance: number;
    duration: string;
    driver: {
      id: number;
      name: string;
    };
    value: number;
  }[]> {
    if (driver_id) {
      const rides = await this.model.findMany({
        where: {
          customer_id,
          driver_id
        },
        orderBy: {
          date: 'desc'
        },
        include: {
          driver: true,
        }
      });
      return rides
    }

    const rides = await this.model.findMany({
      where: {
        customer_id
      },
      orderBy: {
        date: 'desc'
      },
      include: {
        driver: true,
      }
    });
    return rides;
  }
}