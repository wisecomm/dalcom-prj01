import { useState } from "react";

// Pagination 타입 정의
export type PaginationType = {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
};

// usePagination 훅 정의 (하나만 유지)
export function usePagination() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  return {
    // 상태 값
    pageIndex,
    pageSize,
    totalCount,

    // 상태 변경 함수
    setPageIndex,
    setPageSize,
    setTotalCount,

    // 계산된 값
    pageCount: Math.ceil(totalCount / pageSize),
  };
}
