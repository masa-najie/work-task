/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { ChevronsUpDown } from "lucide-react";
interface DataTableProps<Tdata, Tvalue> {
  data: Tdata[];
  columns: ColumnDef<Tdata, Tvalue>[];
  setData: React.Dispatch<React.SetStateAction<Tdata[]>>;
}
interface SortableRowProps {
  id: string;
  children: React.ReactNode;
  handle?: React.ReactNode; // optional drag handle
}

export function SortableRow({ id, children, handle }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow ref={setNodeRef} style={style} className="bg-muted/50 ">
      {children}
      {handle
        ? React.cloneElement(handle as React.ReactElement, {
            ...attributes,
            ...listeners,
          })
        : null}
    </TableRow>
  );
}

export default function DataTable<Tdata, Tvalue>({
  data,
  columns,
  setData,
}: DataTableProps<Tdata, Tvalue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const oldIndex = data.findIndex(
      (item: any) => String(item.id) === active.id
    );
    const overIndex = data.findIndex(
      (item: any) => String(item.id) === over?.id
    );
    if (active.id !== over.id) {
      setData((items) => {
        return arrayMove(items, oldIndex, overIndex);
      });
    }
  };
  return (
    <div className="space-y-4 border rounded-lg shadow-md overflow-hidden ">
      <Table className="w-full text-lg">
        <TableHeader className="bg-muted/70">
          {table.getHeaderGroups().map((headergroup) => (
            <TableRow key={headergroup.id}>
              {headergroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="px-6 py-4 text-base font-semibold text-muted-foreground"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
              <TableHead className="px-6 py-4 text-base font-semibold text-muted-foreground"></TableHead>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="bg-muted-70 transition-colors h-14 shadow-2xl">
          <DndContext
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            onDragEnd={handleDragEnd}
          >
            {table.getRowModel().rows?.length ? (
              <SortableContext
                items={data.map((row: any) => String(row.id))}
                strategy={verticalListSortingStrategy}
              >
                {table.getRowModel().rows.map((row: any) => (
                  <SortableRow
                    id={String(row.original.id)}
                    key={row.original.id}
                    handle={
                      <ChevronsUpDown className="cursor-grab mr-2 mt-6 text-gray-500" />
                    }
                  >
                    {row.getVisibleCells().map((cell: any) => (
                      <TableCell key={cell.id} className="px-6 py-4 text-lg ">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </SortableRow>
                ))}
              </SortableContext>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center text-lg px-6 py-4 bg-muted/50"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </DndContext>
        </TableBody>
      </Table>
    </div>
  );
}
