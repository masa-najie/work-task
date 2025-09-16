/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/src/components/ui/button";
import DataTable from "@/src/modules/dataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import React from "react";

export default function Page() {
  const [data, setData] = React.useState<Payment[]>();
  React.useEffect(() => {
    const stored = localStorage.getItem("tableData");
    if (stored) {
      setData(JSON.parse(stored));
    } else {
      localStorage.setItem("tableData", JSON.stringify(payments));
      setData(payments);
    }
  }, []);
  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="w-full max-w-4xl">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }: any) => {
      return (
        <div className="flex items-center justify-center space-x-2">
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
          <Button variant="ghost" size="icon">
            <Pencil />
          </Button>
        </div>
      );
    },
  },
];
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};
export const payments: Payment[] = [
  {
    id: "1",
    email: "alice@example.com",
    amount: 250,
    status: "pending",
  },
  {
    id: "2",
    email: "bob@example.com",
    amount: 540,
    status: "processing",
  },
  {
    id: "3",
    email: "charlie@example.com",
    amount: 120,
    status: "success",
  },
  {
    id: "4",
    email: "diana@example.com",
    amount: 75,
    status: "failed",
  },
  {
    id: "5",
    email: "eve@example.com",
    amount: 999,
    status: "success",
  },
];
