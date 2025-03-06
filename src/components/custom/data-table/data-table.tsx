"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  Row,
  SortingState,
  Updater,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { Table as TanstackTable } from "@tanstack/react-table";
import { PaginationType } from "./usePagination";

export interface DataTableHandle {
  getTableState: () => {
    sorting: SortingState;
    columnFilters: ColumnFiltersState;
    pagination: {
      pageIndex: number;
      pageSize: number;
    };
    selectRows: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rows: Row<any>[];
    };
  };
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: PaginationType;
  onPaginationChange?: (updaterOrValue: Updater<PaginationState>) => void;
  DataTableToolbar?: React.ComponentType<{ table: TanstackTable<TData> }>;
}

const resizingStyles = `
  .resizer {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 5px;
    background: rgba(0, 0, 0, 0.1);
    cursor: col-resize;
    user-select: none;
    touch-action: none;
    opacity: 0;
  }
  
  .resizer:hover, .resizing {
    opacity: 1;
    background: rgba(0, 0, 0, 0.2);
  }
  
  .isResizing {
    background: rgba(58, 150, 247, 0.5);
    opacity: 1;
  }
`;

export const DataTable = React.forwardRef<
  DataTableHandle,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DataTableProps<any, any>
>(
  (
    { columns, data, onPaginationChange, pagination, DataTableToolbar },
    ref
  ) => {
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] =
      React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);

    const table = useReactTable({
      data,
      columns,
      state: {
        sorting,
        columnVisibility,
        rowSelection,
        columnFilters,
        ...(pagination
          ? {
              pagination: {
                pageIndex: pagination?.pageIndex ?? 0,
                pageSize: pagination?.pageSize ?? 10,
              },
            }
          : {}),
      },
      enableRowSelection: true,
      onRowSelectionChange: setRowSelection,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onColumnVisibilityChange: setColumnVisibility,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      // danyoh : 싱글 로우 선택
      enableMultiRowSelection: false,
      // pagination이 있을 때만 적용되는 설정들 ( 서버 사이드 페이징을 위한 설정 )
      ...(pagination
        ? {
            manualPagination: true,
            rowCount: pagination.totalCount,
            pageCount: Math.ceil(pagination.totalCount / pagination.pageSize),
            onPaginationChange,
          }
        : {
            getPaginationRowModel: getPaginationRowModel(),
          }),
      getSortedRowModel: getSortedRowModel(),
      getFacetedRowModel: getFacetedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
      enableColumnResizing: true, // If you want resizable columns
      columnResizeMode: "onChange",
      debugTable: true,
      debugHeaders: true,
      debugColumns: true,
    });

    React.useImperativeHandle(ref, () => ({
      getTableState: () => ({
        sorting,
        columnFilters,
        pagination: {
          pageIndex: table.getState().pagination.pageIndex,
          pageSize: table.getState().pagination.pageSize,
        },
        selectRows: {
          rows: table.getSelectedRowModel().rows,
        },
      }),
    }));

    return (
      <div className="space-y-4">
        <style jsx global>
          {resizingStyles}
        </style>
        {DataTableToolbar && <DataTableToolbar table={table} />}
        <div className="rounded-md border">
          <Table className="w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{
                          position: "relative",
                          width: header.column.getSize(),
                        }} // Use getSize() from the API
                        className="text-center border-x"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {header.column.getCanResize() && (
                          <div
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                            className={`resizer ${
                              header.column.getIsResizing() ? "isResizing" : ""
                            }`}
                          ></div>
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{ width: cell.column.getSize() }} // Use getSize() from the API
                        className="text-center border-x"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} />
      </div>
    );
  }
);

DataTable.displayName = "DataTable";
