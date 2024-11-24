export const TripResponse = {
  "customer_id": "123",
  "rides": [
      {
          "id": 1,
          "date": "2024-11-24T16:37:21.495Z",
          "destination": "Ladeira do Pedro Antônio, 43 - Centro, Rio de Janeiro - RJ, 20080-090",
          "origin": "Rua Lourival Tavares De Paula, 1050",
          "distance": 42331,
          "duration": "2826s",
          "driver": {
              "id": 1,
              "name": "Homer Simpson"
          },
          "value": 105.8275
      }
  ]
}

export const TripFailedResponse = {
    "error_description": "Nenhum registro encontrado",
    "error_code": "NO_RIDES_FOUND"
  }

export const TripOptionsResponse = {
    error_description: 'Nenhum registro encontrado',
    error_code: "NO_DRIVERS_FOUND",
  }