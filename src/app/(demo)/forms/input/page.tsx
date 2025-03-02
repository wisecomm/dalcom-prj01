"use client";

import React, { useState } from "react";

import {
  UserFormData,
  UserFormDialog,
} from "./user-form/user-form-dialog";
import { UserFormDialog2 } from "./user-form/user-form-dialog2";


function DialogPage() {
  const [showUserForm, setShowUserForm] = useState(false);
  const [showUserForm2, setShowUserForm2] = useState(false);

  const handleFormResult = (
    values: UserFormData | null,
    action: "submit" | "cancel"
  ) => {
    if (action === "submit" && values) {
      // 저장 버튼을 클릭했을 때
      console.log("저장된 사용자 정보:", values);
      // 여기서 API 호출이나 다른 처리를 할 수 있습니다
      alert(`사용자 정보가 성공적으로 저장되었습니다!\n이름: ${values.name}`);
    } else {
      // 취소 버튼을 클릭했거나 다이얼로그를 닫았을 때
      console.log("사용자가 정보 입력을 취소했습니다");
    }

    // 폼 다이얼로그를 닫습니다
    setShowUserForm(false);
  };

  const handleFormResult2 = (
    values: UserFormData | null,
    action: "submit" | "cancel"
  ) => {
    if (action === "submit" && values) {
      // 저장 버튼을 클릭했을 때
      console.log("저장된 사용자 정보:", values);
      // 여기서 API 호출이나 다른 처리를 할 수 있습니다
      alert(`사용자 정보가 성공적으로 저장되었습니다!\n이름: ${values.name}`);
    } else {
      // 취소 버튼을 클릭했거나 다이얼로그를 닫았을 때
      console.log("사용자가 정보 입력을 취소했습니다");
    }

    // 폼 다이얼로그를 닫습니다
    setShowUserForm(false);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {/* Link 대신 버튼으로 변경하여 클릭 시 다이얼로그를 직접 표시 */}
      <button onClick={() => setShowUserForm(true)}>
        <h4>사용자정보입력</h4>
      </button>
      {/* Link 대신 버튼으로 변경하여 클릭 시 다이얼로그를 직접 표시 */}
      <button onClick={() => setShowUserForm2(true)}>
        <h4>사용자정보입력2</h4>
      </button>
      <br />

      {/* 조건부 렌더링으로 다이얼로그 표시 */}
      {showUserForm && <UserFormDialog onSubmit={handleFormResult} />}
      {/* 조건부 렌더링으로 다이얼로그 표시 */}
      {showUserForm2 && <UserFormDialog2 onSubmit={handleFormResult2} />}
    </div>
  );
}

export default DialogPage;
