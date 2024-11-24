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

const RideSchema = z.object({
  customer_id: z.string().min(1),
  origin: z.string().min(3),
  destination: z.string().min(3),
});

export type Ride = z.infer<typeof RideSchema>;

type RideFormProps = {
  loading: boolean;
  onSubmit: (ride: Ride) => void;
};

export const RideForm = ({
  loading,
  onSubmit,
}: RideFormProps) => {
  const form = useForm<Ride>({
    resolver: zodResolver(RideSchema),
    defaultValues: {
      customer_id: "",
      origin: "",
      destination: "",
    },
  });

  const handleSubmit = async (ride: Ride) => {
    onSubmit(ride);
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
                  data-testid="customer_id"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="origin"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="origin">Origem</FormLabel>
              <FormControl>
                <Input placeholder="Origem" disabled={loading} data-testid="origin" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="destination"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="destination">Destino</FormLabel>
              <FormControl>
                <Input placeholder="Destino" disabled={loading} data-testid="destination" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          Pesquisar Viagem
        </Button>
      </form>
    </Form>
  );
};
