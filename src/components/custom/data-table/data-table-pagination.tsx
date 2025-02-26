import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const [pageInput, setPageInput] = useState<string>("");

  const currentPage = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  // Calculate the range of page numbers to display
  const getPageRange = () => {
    const start = Math.max(0, Math.floor(currentPage / 5) * 5);
    const end = Math.min(start + 4, pageCount - 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const handleGoToPage = () => {
    let pageNumber = parseInt(pageInput);
    if (isNaN(pageNumber) || pageNumber <= 0) {
      pageNumber = 1;
    }
    if (pageNumber > pageCount) {
      pageNumber = pageCount;
    }
    table.setPageIndex(pageNumber - 1);
    setPageInput(pageNumber.toString());
  };

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center justify-center text-sm font-medium">
        Page {currentPage + 1} of {pageCount}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Numbered page buttons */}
          {getPageRange().map((pageIndex) => (
            <Button
              key={pageIndex}
              variant={pageIndex === currentPage ? "default" : "outline"}
              className="h-8 w-8 p-0"
              onClick={() => table.setPageIndex(pageIndex)}
            >
              <span>{pageIndex + 1}</span>
            </Button>
          ))}

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Page input and GO button */}
          <div className="flex items-center space-x-2 ml-4">
            <Input
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              className="h-8 w-14 placeholder:text-[12px]"
              placeholder="Page"
            />
            <Button
              variant="outline"
              className="h-8"
              onClick={handleGoToPage}
              disabled={!pageInput}
            >
              Go
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
