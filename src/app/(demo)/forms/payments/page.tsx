"use client"

import React, { useEffect, useState } from 'react'
import { Payment, columns } from "./columns";
import { DataTable } from "@/components/custom/datatable/data-table";
import { DataTableToolbar } from "./data-table-toolbar";
import { Button } from "@/components/ui/button";
import { fetchData } from "./testdata";
import { DialogFormZodAltDemo } from "@/components/ui-etc/DialogFormZodAltDemo";
import { DalAlertDialog } from "@/components/ui-etc/dal-alert-dialog";

export default function DemoPage() {
  const [openDialogFormZodAltDemo, setOpenDialogFormZodAltDemo] = useState(false);
  const [openDalAlertDialog, setOpenDalAlertDialog] = useState(false);


  const [tableData, setTableData] = useState<Payment[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await fetchData();
      setTableData(data);
    }
    loadData();
  }, []);

  const handleConfirm = () => {
    console.log("확인 버튼 클릭됨");
    // 여기에 확인 시 실행할 로직 추가
  };
  const handleCancel = () => {
    console.log("취소 버튼 클릭됨");
    // 여기에 취소 시 실행할 로직 추가
  };

  return (
    <div style={{ backgroundColor: 'rgb(232, 234, 244)' }}>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="bg-white p-2">
          <div className="h-full flex-1 flex-col space-y-4 p-8 md:flex">
            <DataTable
              columns={columns}
              data={tableData}
              DataTableToolbar={DataTableToolbar}
              onRowSelect={(selectedRow) => {
                console.log('XXXXXXXX Selected row:', selectedRow);
                // Handle the selected row
              }}
            />
            <div className='flex items-center justify-between'>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="lg">
                  조회
                </Button>
              </div>
              <div className="flex items-center justify-end space-x-2">
                <Button variant="outline" size="lg" onClick={() => setOpenDialogFormZodAltDemo(true)}>
                  추가
                </Button>
                <Button variant="outline" size="lg" onClick={() => setOpenDalAlertDialog(true)}>
                  삭제
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
      <DialogFormZodAltDemo
        open={openDialogFormZodAltDemo}
        onOpenChange={setOpenDialogFormZodAltDemo}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <DalAlertDialog
        open={openDalAlertDialog}
        onOpenChange={setOpenDalAlertDialog}
        title="정말 삭제하시겠습니까?"
        description={"동해물과 백두산이 태그는 적용되어 저장된다"}
        // description={'동해물과 백두산이 \n 마르고 닳도록'}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}
