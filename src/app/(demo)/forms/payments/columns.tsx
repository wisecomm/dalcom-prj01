"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/custom/datatable/data-table-column-header";

export type Payment = {
  id: string;
  title: string;
  amount: number;
  status: string;
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="아이디" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center space-x-2">
        <div className="w-[80px]">{row.getValue("id")}</div>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="제  목" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <span className="w-[500px]">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <span className="w-[100px]">{row.getValue("email")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="amount" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <span className="w-[10px]">{row.getValue("amount")}</span>
        </div>
      );
    },
  },
];
