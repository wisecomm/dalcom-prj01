"use client";

import { Table } from "@tanstack/react-table";
import { DataTableViewOptions } from "@/components/custom/data-table/data-table-view-options";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { LabelDatePicker } from "@/components/custom/datepicker/LabelDatePicker";
import { useState } from "react";

interface PageDtToolbarProps<TData> {
  table: Table<TData>;
}

export function PageDtToolbarPropsToolbar<TData>({
  table,
}: PageDtToolbarProps<TData>) {

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  function handleOnSearchGo(columnId: string, searchValue: string) {
    toast({
      variant: "destructive",
      title: "검색 실행",
      description: "columnId=" + columnId + ", searchValue=" + searchValue,
    });
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <LabelDatePicker label={"시작일"} value={startDate} onChange={setStartDate} />
        <LabelDatePicker label={"종료일"} value={endDate} onChange={setEndDate} />
        <Button>검색</Button>
      </div>
      <DataTableViewOptions table={table} onSearchGo={handleOnSearchGo} />
    </div>
  );
}
