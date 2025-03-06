"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { columns, Payment } from "./columns";
import {
  DataTable,
  DataTableHandle,
} from "@/components/custom/data-table/data-table";
import { PageDtToolbarPropsToolbar } from "./page-dt-toolbar";
import { Button } from "@/components/ui/button";
import { fetchData1, fetchData2 } from "./test-data";
import { usePagination } from "@/components/custom/data-table/usePagination";

export default function TaskPage() {
  const tableRef = useRef<DataTableHandle>(null);
  const [tableData, setTableData] = useState<Payment[]>([]);

  //
  const pagination = usePagination();
  // pagination 참조 유지
  const paginationRef = useRef(pagination);

  // 폼로드 시 데이터 로드 ( 테스트 데이터 )
  useEffect(() => {
    async function loadData() {
      const data = await fetchData1();
      console.log("useEffect==========11:", pagination.totalCount);
      paginationRef.current.totalCount = data.length;
      console.log("useEffect==========22:", pagination.totalCount);
      setTableData(data);
    }
    loadData();
  }, []); 

  // 툴바 검색 버튼 클릭 이벤트
  const handleSearch = async () => {
    if (!tableRef.current) return;
    // 테이블 상태 가져오기
    const tableState = tableRef.current.getTableState();
    try {
      // 선택된 로우 정보 가져오기
      const taskArray: Payment[] = tableState.selectRows.rows.map(
        (row) => row.original
      );
      console.log("Selected Rows:");
      taskArray.forEach((task, index) => {
        console.log(`Row ${index + 1}: ID=${task.id}, Title=${task.title}`);
      });

      // 서버에서 데이터 가져오기
      if (tableState.pagination.pageIndex % 2 == 0) {
        const data = await fetchData1();
        pagination.totalCount = data.length;
        setTableData(data);
      } else {
        const data = await fetchData2();
        pagination.totalCount = data.length;
        setTableData(data);
      }
    } catch (error) {
      console.error("Error fetching tasks1111:", error);
    }
  };

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">로컬 페이징</h2>
        </div>
        <Button onClick={handleSearch}>검색</Button>
        <DataTable
          ref={tableRef}
          DataTableToolbar={PageDtToolbarPropsToolbar}
          data={tableData}
          columns={columns}
        />
      </div>
    </>
  );
}
