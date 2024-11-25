export default class GoogleModel {
  public async getRoute({
    origin,
    destination,
  }: { origin: string, destination: string }): Promise<{
    routes: {
      distanceMeters: number;
      duration: number;
      legs: {
        startLocation: {
          latLng: {
            latitude: number;
            longitude: number;
          }
        },
        endLocation: {
          latLng: {
            latitude: number;
            longitude: number;
          }
        }
      }[];
    }[]
  } | {routes: undefined}> {
  const response = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(process.env.GOOGLE_API_KEY && { 'X-Goog-Api-Key': process.env.GOOGLE_API_KEY }),
      'X-Goog-FieldMask': '*'
    },
    body: JSON.stringify({
      origin: {address: origin},
      destination: {address: destination},
    })
  })
  return response.json();
  }
}