"use client";

import React, { useState } from "react";
import { DalAlertDialog } from "@/components/ui-etc/dal-alert-dialog";
import { Button } from "@/components/ui/button";
import { DialogDemo } from "@/components/ui-etc/DialogDemo";
import { DialogFormDemo } from "@/components/ui-etc/DialogFormDemo";
import { DialogFormZodDemo } from "@/components/ui-etc/DialogFormZodDemo";
import { DialogFormZodAltDemo } from "@/components/ui-etc/DialogFormZodAltDemo";
import { FormZodDemo } from "@/components/ui-etc/FormZodDemo";

function DialogPage() {
  const [openDalAlertDialog, setOpenDalAlertDialog] = useState(false);
  const [openDialogDemo, setOpenDialogDemo] = useState(false);
  const [openDialogFormDemo, setOpenDialogFormDemo] = useState(false);
  const [openDialogFormZodDemo, setOpenDialogFormZodDemo] = useState(false);
  const [openDialogFormZodAltDemo, setOpenDialogFormZodAltDemo] = useState(false);
  const [openFormZodDemo, setOpenFormZodDemo] = useState(false);
  
  
  const handleConfirm = () => {
    console.log("확인 버튼 클릭됨");
    // 여기에 확인 시 실행할 로직 추가
  };

  const handleCancel = () => {
    console.log("취소 버튼 클릭됨");
    // 여기에 취소 시 실행할 로직 추가
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <Button
        variant="outline"
        size="lg"
        onClick={() => setOpenDalAlertDialog(true)}
      >
        AlertDialog 열기
      </Button>
      <Button
        variant="outline"
        size="lg"
        onClick={() => setOpenDialogDemo(true)}
      >
        DialogDemo 열기
      </Button>
      <Button
        variant="outline"
        size="lg"
        onClick={() => setOpenDialogFormDemo(true)}
      >
        DialogFormDemo 열기
      </Button>
      <Button
        variant="outline"
        size="lg"
        onClick={() => setOpenDialogFormZodDemo(true)}
      >
        DialogFormZodDemo 열기
      </Button>
      <Button
        variant="outline"
        size="lg"
        onClick={() => setOpenDialogFormZodAltDemo(true)}
      >
        DialogFormZodAltDemo 열기
      </Button>
      <Button
        variant="outline"
        size="lg"
        onClick={() => setOpenFormZodDemo(true)}
      >
        FormZodDemo 열기
      </Button>
      <DalAlertDialog
        open={openDalAlertDialog}
        onOpenChange={setOpenDalAlertDialog}
        title="정말 삭제하시겠습니까?"
        description={"동해물과 백두산이 태그는 적용되어 저장된다"}
        // description={'동해물과 백두산이 \n 마르고 닳도록'}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <DialogDemo
        open={openDialogDemo}
        onOpenChange={setOpenDialogDemo}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <DialogFormDemo
        open={openDialogFormDemo}
        onOpenChange={setOpenDialogFormDemo}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <DialogFormZodDemo
        open={openDialogFormZodDemo}
        onOpenChange={setOpenDialogFormZodDemo}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <DialogFormZodAltDemo
        open={openDialogFormZodAltDemo}
        onOpenChange={setOpenDialogFormZodAltDemo}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <FormZodDemo
        open={openFormZodDemo}
        onOpenChange={setOpenFormZodDemo}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default DialogPage;
