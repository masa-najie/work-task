/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/src/components/ui/button";
import EditDataSheet from "@/src/modules/dashboard/EditDataSheet";
import { Payment, payments } from "@/src/modules/dashboard/payments";
import DataTable from "@/src/modules/dataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import React from "react";

export default function Page() {
  const [data, setData] = React.useState<Payment[]>([]);
  React.useEffect(() => {
    const stored = localStorage.getItem("tableData");
    if (stored && JSON.parse(stored).length > 0) {
      setData(JSON.parse(stored));
    } else {
      localStorage.setItem("tableData", JSON.stringify(payments));
      setData(payments);
    }
  }, []);
  React.useEffect(() => {
    localStorage.setItem("tableData", JSON.stringify(data));
  }, [data]);

  function handleSave(updatedItem: Payment) {
    setData((prev) => {
      const newData = prev.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      localStorage.setItem("tableData", JSON.stringify(newData));
      return newData;
    });
  }
  function handleDelete(id: string) {
    setData((prev) => {
      const newData = prev.filter((item) => item.id !== id);
      localStorage.setItem("tableData", JSON.stringify(newData));
      return newData;
    });
  }
  const columns: ColumnDef<Payment>[] = [
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
            <EditDataSheet item={row.original} onSave={handleSave} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(row.original.id)}
            >
              <Trash2 />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="w-full max-w-4xl">
        <DataTable columns={columns} data={data} setData={setData} />
      </div>
    </div>
  );
}
