import { Column } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpDown, ArrowUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const handleSort = () => {
    if (!column.getCanSort()) return;

    const currentSort = column.getIsSorted();
    if (currentSort === false) {
      column.toggleSorting(false); // set to asc
    } else if (currentSort === "asc") {
      column.toggleSorting(true); // set to desc
    } else {
      column.clearSorting(); // clear sorting
    }
  };

  return (
    // justify-center 추가 : 타이틀 중앙정렬
    <div
      className={cn("flex items-center justify-center space-x-2", className)}
    >
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 data-[state=open]:bg-accent"
        onClick={handleSort}
      //  disabled={!column.getCanSort()}
      >
        <span className="font-bold text-base">{title}</span>
        {column.getCanSort() && (
          <div className="ml-2">
            {column.getIsSorted() === "asc" && (
              <ArrowUpIcon className="h-4 w-4" />
            )}
            {column.getIsSorted() === "desc" && (
              <ArrowDownIcon className="h-4 w-4" />
            )}
            {column.getIsSorted() === false && (
              <ArrowUpDown className="h-4 w-4" />
            )}
          </div>
        )}
      </Button>
    </div>
  );
}
