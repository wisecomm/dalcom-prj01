"use client";

import {
  Button,
} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Input,
} from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import React from "react";

function LoginPage() {
  const handleLogin = async () => {
    toast({
      variant: "destructive",
      title: "기입되지 않은 데이터(값)가 있습니다.",
      description: "이메일과 비밀번호는 필수 값입니다.",
    });
  };

  return (
    <div className="page">
      <Card className="w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">로그인</CardTitle>
          <CardDescription>로그인을 위한 정보를 입력해주세요.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <p>이메일</p>
            <Input
              id="email"
              type="email"
              required
              placeholder="이메일을 입력해주세요."
            ></Input>
          </div>
          <div className="relative grid gap-2">
            <div className="flex justify-between">
              <p>비밀번호</p>
              <p className="underline cursor-pointer">비밀번호를 잊으셨나요?</p>
            </div>
            <Input
              id="password"
              type="password"
              required
              placeholder="비밀번호을 입력해주세요."
            ></Input>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg"
            onClick={handleLogin}
          >
            로그인
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginPage;
