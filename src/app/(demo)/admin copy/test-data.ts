import { AdminUser } from "./columns";

export async function fetchData1(): Promise<AdminUser[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      name: "김관리자",
      email: "admin1@example.com",
      role: "슈퍼 관리자",
      createdAt: "2023-05-15",
    },
    {
      id: 2,
      name: "이관리자",
      email: "admin2@example.com",
      role: "콘텐츠 관리자",
      createdAt: "2023-06-20",
    },
    {
      id: 3,
      name: "박관리자",
      email: "admin3@example.com",
      role: "시스템 관리자",
      createdAt: "2023-07-05",
    }, // ...
  ];
}
