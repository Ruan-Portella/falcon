import { prisma } from "../prisma/client";

export default class DriverModel {
  private model = prisma.driver;

  public async getDriverById({id}: {id: number}): Promise<{
    id: number;
    name: string;
    description: string;
    vehicle: string;
    rating: number;
    comment: string;
    ratePerKm: number;
    minKm: number;
  } | null> {
    const driver = await this.model.findUnique({
      where: {
        id: id
      }
    });
    return driver;
  }

  public async getDrivers(): Promise<{
    id: number;
    name: string;
    description: string;
    vehicle: string;
    rating: number;
    comment: string;
    ratePerKm: number;
    minKm: number;
  }[]> {
    const drivers = await this.model.findMany();
    return drivers;
  }

  public async getDriversFilter({
    where,
    orderBy,
  }: { where: object, orderBy: object }): Promise<{
    id: number;
    name: string;
    description: string;
    vehicle: string;
    rating: number;
    comment: string;
    ratePerKm: number;
    minKm: number;
  }[]> {
    const drivers = await this.model.findMany({
      where,
      orderBy
    })
    return drivers;
  }
}