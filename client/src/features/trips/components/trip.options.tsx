import { DataTable } from "@/components/data.table";
import { TripResponse } from "@/pages/Trips";
import { columns } from "./columns";

export default function TripOptions({ options }: { options: TripResponse[] }) {
  return (
    <DataTable columns={columns} data={options} filterKey="name" />
  );
}
