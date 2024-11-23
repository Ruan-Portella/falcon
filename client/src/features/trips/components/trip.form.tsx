import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "@/components/ui/select";

const TripSchema = z.object({
  customer_id: z.string().min(1),
  driver_id: z.string().min(1),
});

export type Trip = z.infer<typeof TripSchema>;

type TripFormProps = {
  loading: boolean;
  drivers: { id: number; name: string }[];
  getTrips: (trip: Trip) => void;
};

export const TripForm = ({
  loading,
  drivers,
  getTrips,
}: TripFormProps) => {
  const form = useForm<Trip>({
    resolver: zodResolver(TripSchema),
    defaultValues: {
      customer_id: "",
      driver_id: "",
    },
  });
  
  const handleSubmit = async (trip: Trip) => {
    getTrips(trip);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
        <FormField
          name="customer_id"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="customer_id">
                Identificador do Usúario
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Identificador"
                  disabled={loading}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="driver_id"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="driver_id">
                Identificador do Usúario
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecionar Motorista' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {
                    drivers.map((driver) => (
                      <SelectItem key={driver.id} value={`${driver.id}`}>
                        {driver.name}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={loading}>
          Encontrar viagens
        </Button>
      </form>
    </Form>
  );
};
