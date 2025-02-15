"use client";

import { getJobLogs } from "@/app/(admin)/actions/useGetJobLogs";
import { setLogin } from "@/app/(admin)/actions/useSetLogin";
import { getToken, setToken } from "@/app/utils/cookie";
import { LoginData } from "@/types";
import { useState } from "react";

function Page() {
  const [logindata, setLogindata] = useState<LoginData | null>(null);

  const handleLogin = async () => {
    try {
      const { data, status, error } = await setLogin();

      console.log("handleLogin data=" + data);
      console.log("handleLogin dataKKK=" + data.corp_code);
      console.log("handleLogin status=" + status);
      console.log("handleLogin error=" + error);

      setToken(data.key);

      setLogindata(data);
    } catch (error) {
      console.log("login error: " + error);
    }
  };

  const handleGetToken = async () => {
    try {
      const token = getToken();
      console.log("gettoken data=" + token);
    } catch (error) {
      console.log("logtokenn error: " + error);
    }
  };

  const handleJobLog = async () => {
    try {
      const { data, status, error } = await getJobLogs("1000");

      console.log("handleLogin data=" + data);
      console.log("handleLogin dataKKK=" + data.corp_code);
      console.log("handleLogin status=" + status);
      console.log("handleLogin error=" + error);
    } catch (error) {
      console.log("login error: " + error);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>로그인</button>
      <p>{logindata?.key}</p>
      <button onClick={handleGetToken}>토컨</button>
      <p>{logindata?.key}</p>
      <button onClick={handleJobLog}>작업이력</button>
    </div>
  );
}

export default Page;
