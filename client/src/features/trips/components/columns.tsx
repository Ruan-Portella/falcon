"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowDown, ArrowUp } from "lucide-react"
import { TripResponse } from "@/pages/Trips"
import { Badge } from "@/components/ui/badge"
import { duration } from "@/lib/utils"

export const columns: ColumnDef<TripResponse>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data e Hora da Viagem
          {
            column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )
          }
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'))
      return (
        <span>
          {date.toLocaleDateString()} - {date.toLocaleTimeString()}
        </span>
      )
    }
  },
  {
    accessorKey: 'driver.name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome do Motorista
          {
            column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )
          }
        </Button>
      )
    },
  },
  {
    accessorKey: 'origin',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Origem
          {
            column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )
          }
        </Button>
      )
    },
  },
  {
    accessorKey: 'destination',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Destino
          {
            column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )
          }
        </Button>
      )
    },
  },
  {
    accessorKey: 'distance',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Distância (km)
          {
            column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )
          }
        </Button>
      )
    },
    cell: ({ row }) => {
      const distance = parseFloat(row.getValue('distance'))
      return (distance / 1000).toFixed(1)
    }
  },
  {
    accessorKey: 'duration',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tempo
          {
            column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )
          }
        </Button>
      )
    },
    cell: ({ row }) => {
      return duration(row.getValue('duration'))
    }
  },
  {
    accessorKey: 'value',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor (R$)
          {
            column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )
          }
        </Button>
      )
    },
    cell: ({ row }) => {
      const value = parseFloat(row.getValue('value'))
      return (
        <Badge variant='primary' className="text-xs font-medium px-3.5 py-2">{value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Badge>
      )
    }
  },
]
