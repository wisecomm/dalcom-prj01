import { ApiData, ApiResponse, x_fetch } from "@/procx/XFetch";

export interface ILoginData {
  corp_code: string;
  key: string;
  login_ip: string;
  login_time_current: string;
  man_corp_code: string;
  need_change_pwd: string;
  roleid: string;
}

export const setLogin = async (user_id: string, user_pwd: string) => {
  const params = new URLSearchParams();
  params.append("userId", user_id);
  params.append("userPw", user_pwd);

  const response = await x_fetch.post<ApiResponse>(
    `/api/v1/base/auth/adminlogin?${params.toString()}`
  );

  if (!response.isSuccess) {
    console.log(
      "실패: errCode:" + response.errCode + " errMsg:" + response.errMsg
    );
    return;
  }

  const apiData = response.data as unknown as ApiData;
  if (apiData.code !== "0000") {
    console.log(
      "데이터 에러 ===" + apiData.code + " 메시지:" + apiData.message
    );
    return;
  }

  return apiData;
};
