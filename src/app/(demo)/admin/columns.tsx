"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/custom/data-table/data-table-column-header";

export type GeoLocation = {
  lat: string;
  lng: string;
};

export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoLocation;
};

export type AdminUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address | null;
};

export const columns: ColumnDef<AdminUser>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      </div>
    ),
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
        <div className="w-[30px]">{row.getValue("id")}</div>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="이 름" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <span className="w-[500px]">{row.getValue("name")}</span>
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
        // <div className="text-center w-100">{row.getValue("email")}</div>
        <div className="flex items-center justify-center w-full text-center">
          <span className="min-w-[100px]">
            {row.getValue("email")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="전화번호" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <span className="w-[200px]">{row.getValue("phone")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "website",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="웹사이트" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <span className="w-[100px]">{row.getValue("website")}</span>
        </div>
      );
    },
  },
];
