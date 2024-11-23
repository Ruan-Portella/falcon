import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "../components/header";
import { Ride, RideForm } from "@/features/ride/components/ride.form";
import { useState } from "react";
import { toast } from "sonner";
import axiosConfig from "@/axios/axios.config";
import axios, { AxiosError } from "axios";
import polyline from "@mapbox/polyline";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import RideMap from "@/features/ride/components/ride.map";
import RideOptions from "@/features/ride/components/ride.options";
import { duration } from "@/lib/utils";

export type RideOption = {
  id: number;
  name: string;
  description: string;
  review: string;
  value: number;
  vehicle: string;
} & Ride & { distance: number; duration: string };

export type RideResponse = {
  destination: {
    latitude: number;
    longitude: number;
  };
  origin: {
    latitude: number;
    longitude: number;
  };
  distance: number;
  duration: string;
  options: RideOption[];
  routeResponse: object;
};

export default function Rides() {
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([]);
  const [ride, setRide] = useState<null | RideResponse>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (ride: Ride) => {
    setLoading(true);
    try {
      const response = await axiosConfig.post("/ride/estimate", {
        customer_id: ride.customer_id,
        origin: ride.origin,
        destination: ride.destination,
      });

      response.data.options = response.data.options.map((option: RideOption & {review: {rating: number, comment: string}}) => ({
        ...option,
        review: `${option.review.rating}/5 ${option.review.comment}`,
        customer_id: ride.customer_id,
        origin: ride.origin,
        destination: ride.destination,
        distance: response.data.distance,
        duration: response.data.duration,
      }));

      setRide(response.data);

      const decodedPath = polyline.decode(
        response.data.routeResponse.routes[0].polyline.encodedPolyline
      );
      setRouteCoordinates(decodedPath.map(([lat, lng]) => [lat, lng]));
      toast.success(
        "Viagem solicitada com sucesso! Escolha um motorista para realizar a viagem."
      );
    } catch (err: unknown) {
      const error = err as Error | AxiosError;
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.error_description);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <main className="px-3 lg:px-14">
        <div className=" max-w-screen-2xl mx-auto w-full h-full -mt-12">
          <Card className="border-none drop-shadow-sm">
            <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
              <CardTitle className="text-xl line-clamp-1">
                {ride ? (
                  <div>
                    <Button
                      size="sm"
                      variant='default'
                      onClick={() => setRide(null)}
                    >
                      <Plus className="size-4 mr-2" />
                      Solicitar nova viagem
                    </Button>
                  </div>
                ) : (
                  "Solicitar viagem"
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {ride ? (
                <>
                <RideMap ride={ride} routeCoordinates={routeCoordinates} />
                <h2 className="text-xl font-semibold mt-4">
                  Escolha um motorista para realizar a viagem
                </h2>
                <p>
                  Distância: {(ride.distance / 1000).toFixed(1)} Km - Duração: {duration(ride.duration)}
                </p>
                <RideOptions options={ride.options} />
                </>
              ) : (
                <RideForm onSubmit={onSubmit} loading={loading} />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
