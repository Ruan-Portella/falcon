import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "../components/header"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { Trip, TripForm } from "@/features/trips/components/trip.form"
import axios, { AxiosError } from "axios"
import { toast } from "sonner"
import axiosConfig from "@/axios/axios.config"
import TripOptions from "@/features/trips/components/trip.options"

export type TripResponse = {
  id: number
  date: string,
  destination: string,
  origin: string,
  distance: number,
  duration: string,
  driver: {
    id: number,
    name: string
  },
  value: number
}

export default function Trips() {
  const [trips, setTrips] = useState<null | TripResponse[]>(null)
  const [drivers, setDrivers] = useState<{ id: number, name: string }[]>([])
  const [loading, setLoading] = useState(false)

  const getOptions = async () => {
    setLoading(true)
    try {
      const response = await axiosConfig.get('/driver')
      setDrivers(response.data.drivers)
    } catch (err: unknown) {
      const error = err as Error | AxiosError;
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.error_description);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getOptions()
  }, [])

  const getTrips = async (trip: Trip) => {
    setLoading(true)
    try {
      const response = await axiosConfig.get(`/ride/${trip.customer_id}${trip.driver_id !== 'all' ? `?driver_id=${trip.driver_id}` : ''}`)
      setTrips(response.data.rides)
      toast.success('Viagens encontradas com sucesso')
    } catch (err: unknown) {
      const error = err as Error | AxiosError;
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.error_description);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="px-3 lg:px-14">
        <div className=" max-w-screen-2xl mx-auto w-full h-full -mt-12">
          <Card className="border-none drop-shadow-sm">
            <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
              <CardTitle className="text-xl line-clamp-1">
                <Button
                  size="sm"
                  variant='default'
                  onClick={() => setTrips(null)}
                >
                  <Plus className="size-4 mr-2" />
                  Realizar nova consulta
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {trips ? (
                <>
                  <TripOptions options={trips} />
                </>
              ) : (
                <TripForm getTrips={getTrips} loading={loading} drivers={drivers} />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
