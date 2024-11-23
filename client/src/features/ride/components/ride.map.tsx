import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { RideResponse } from "@/pages/Rides";

export default function RideMap({
  ride,
  routeCoordinates,
}: {
  ride: RideResponse;
  routeCoordinates: [number, number][];
}) {

  const getCenter = (
    origin: { latitude: number; longitude: number },
    destination: { latitude: number; longitude: number }
  ): [number, number] => {
    return [
      (origin.latitude + destination.latitude) / 2,
      (origin.longitude + destination.longitude) / 2,
    ];
  };

  const FitBounds = () => {
    const map = useMap();
    if (ride) {
      map.fitBounds([
        [ride.origin.latitude, ride.origin.longitude],
        [ride.destination.latitude, ride.destination.longitude],
      ]);
    }
    return null;
  };

  return (
    <MapContainer
      center={getCenter(ride.origin, ride.destination)}
      zoom={7}
      scrollWheelZoom={false}
      markerZoomAnimation={false}
      doubleClickZoom={false}
      style={{ width: "100%", height: "400px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[ride.origin.latitude, ride.origin.longitude]} />
      <Marker
        position={[ride.destination.latitude, ride.destination.longitude]}
      />
      <FitBounds />
      {routeCoordinates.length > 0 && <Polyline positions={routeCoordinates} />}
    </MapContainer>
  );
}
