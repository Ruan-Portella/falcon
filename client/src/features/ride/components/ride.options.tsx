import { DataTable } from "@/components/data.table";
import { RideOption } from "@/pages/Rides";
import { columns } from "./columns";
import LoadingProvider from "@/context/loading";

export default function RideOptions({ options }: { options: RideOption[] }) {
  return (
    <LoadingProvider>
      <DataTable columns={columns} data={options} filterKey="name" />
    </LoadingProvider>
  );
}
