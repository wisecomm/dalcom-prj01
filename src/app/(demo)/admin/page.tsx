"use client";

import React, { useEffect, useRef, useState } from "react";

import { columns, AdminUser } from "./columns";
import {
  DataTable,
  DataTableHandle,
} from "@/components/custom/data-table/data-table";
import { PageDtToolbarPropsToolbar } from "./page-dt-toolbar";
import { Button } from "@/components/ui/button";
import { fetchData1 } from "./test-data";
import { usePagination } from "@/components/custom/data-table/usePagination";
import { PaginationState, Updater } from "@tanstack/table-core";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { DalAlertDialog } from "@/components/ui-etc/dal-alert-dialog";
import AdminDialog from "./AdminDialog";
import { showToastMessageUi } from "@/components/utils/toastUtilsUi";

const AdminList = () => {
  const tableRef = useRef<DataTableHandle>(null);
  const [tableData, setTableData] = useState<AdminUser[]>([]);
  const pagination = usePagination();

  const [openDelAlterDialog, setOpenDelAlterDialog] = useState(false);
  const [openCreateNewAd, setOpenCreateNewAd] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);

  // 툴바 검색 버튼 클릭 이벤트
  const handleDelect = async () => {
    if (!tableRef.current) return;
    // 테이블 상태 가져오기
    const tableState = tableRef.current.getTableState();
    try {
      if (tableState.selectRows.rows.length === 0) {
        setSelectedAdmin(null);
        console.log("선택된 로우가 없습니다.");
        return;
      }

      // 선택된 로우 정보 가져오기
      const selectAdmin = tableState.selectRows.rows[0].original;
      setSelectedAdmin(selectAdmin);

      setOpenDelAlterDialog(true);
    } catch (error) {
      console.error("Error fetching tasks1111:", error);
    }
  };

  const handleDelectConfirm = async () => {
    console.log("삭제 처리함 :", selectedAdmin);
    // 서버 삭제 처리
    // 삭제 후 데이터 다시 로드

    setOpenDelAlterDialog(false);
  };

  // 관리자 등록 및 수정
  const handleCreateNew = async (bNew: boolean) => {
    try {
      if (bNew === false) {
        console.log("수정 처리함 :");
        if (!tableRef.current) return;
        // 테이블 상태 가져오기
        const tableState = tableRef.current.getTableState();
        if (tableState.selectRows.rows.length === 0) {
          setSelectedAdmin(null);
          console.log("선택된 로우가 없습니다.");
          return;
        }
        // 선택된 로우 정보 가져오기
        const selectAdmin = tableState.selectRows.rows[0].original;
        setSelectedAdmin(selectAdmin);
      } else {
        console.log("등록 처리함 :");
        setSelectedAdmin(null);
      }

      setOpenCreateNewAd(true);
    } catch (error) {
      console.error("Error handleCreateNew:", error);
    }
  };

  const handleCreateNewComplete = (admin: AdminUser, isNew: boolean) => {
    console.log("admin 처리함 :");
    if (isNew) {
      // In a real app, we would get the ID from the server
      const newAdmin = {
        ...admin,
        id: Date.now(),
        createdAt: new Date().toISOString().split("T")[0],
      };
      showToastMessageUi(
        `${admin.name} 관리자가 등록되었습니다.`,
        "관리자 등록"
      );
    } else {
      showToastMessageUi(
        `${admin.name} 관리자 정보가 업데이트되었습니다.`,
        "관리자 등록"
      );
    }
    // 서버 데이터 다시 로드
    setOpenCreateNewAd(false);
  };
  const onDialogClose = async () => {
    setOpenCreateNewAd(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
  };
  const onPaginationChange = async (
    updaterOrValue: Updater<PaginationState>
  ) => {};

  // 폼로드 시 데이터 로드 ( 테스트 데이터 )
  useEffect(() => {
    async function loadData() {
      const data = await fetchData1();
      console.log("useEffect==========11:", pagination.current.totalCount);
      pagination.current.totalCount = data.length;
      console.log("useEffect==========22:", pagination.current.totalCount);
      setTableData(data);
    }
    loadData();
  }, []);

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            관리자 계정 관리
          </h2>
        </div>
        <DataTable
          ref={tableRef}
          DataTableToolbar={PageDtToolbarPropsToolbar}
          data={tableData}
          columns={columns}
          pagination={pagination.current}
          onPaginationChange={onPaginationChange}
        />
        {/* 하단 분리자와 버튼 영역 추가 */}
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => handleCreateNew(true)}>
              <Plus className="h-4 w-4" />
              등록
            </Button>
            <Button variant="outline" onClick={() => handleCreateNew(false)}>
              <Pencil className="h-4 w-4" />
              수정
            </Button>
            <Button variant="outline" onClick={handleDelect}>
              <Trash2 className="h-4 w-4" />
              삭제
            </Button>
          </div>
        </div>
        <DalAlertDialog
          open={openDelAlterDialog}
          onOpenChange={setOpenDelAlterDialog}
          title="관리자 삭제"
          description={`${selectedAdmin?.name} 관리자를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
          onConfirm={handleDelectConfirm}
        />
        <AdminDialog
          isOpen={openCreateNewAd}
          onClose={onDialogClose}
          admin={selectedAdmin}
          onComplete={handleCreateNewComplete}
        />
      </div>
    </>
  );
};

export default AdminList;
