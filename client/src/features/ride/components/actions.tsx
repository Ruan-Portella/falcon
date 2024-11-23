import axiosConfig from "@/axios/axios.config";
import { Button } from "@/components/ui/button";
import { RideOption } from "@/pages/Rides";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useLoading } from "@/context/loading";

export default function Actions({
  customer_id,
  destination,
  origin,
  distance,
  duration,
  id,
  value
}: RideOption) {
  const {loading, setLoading} = useLoading();
  const navigate = useNavigate();

  const handleComplete = async () => {
    setLoading(true);
    try {
      await axiosConfig.patch("/ride/confirm", {
        customer_id,
        destination,
        origin,
        distance,
        duration,
        driver: { id },
        value
      });
      
      toast.success("Viagem confirmada com sucesso!");

      navigate("/viagens");
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
    <Button variant="default" size="sm" onClick={handleComplete} disabled={loading}>Escolher</Button>
  )
}