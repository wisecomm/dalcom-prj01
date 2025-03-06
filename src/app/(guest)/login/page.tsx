"use client";

import React, { useTransition } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useUserStore, userInfo } from "@/store/useUserStore";

function Login() {
  const router = useRouter();

  const accountFormSchema = z.object({
    userid: z.string().min(1, {
      message: "사용자 아이디을 입력하세요.",
    }),
    password: z.string().min(4, {
      message: "패스워드는 4자리 이상입니다.",
    }),
  });
  type AccountFormValues = z.infer<typeof accountFormSchema>;
  const defaultValues: Partial<AccountFormValues> = {
    userid: "홍길동",
    password: "",
  };
  const formData = useForm<AccountFormValues>({
    defaultValues,
  });

  const [isPending, startTransition] = useTransition();

  // Correct way to use zustand hooks
  const saveUser = useUserStore((state) => state.saveUser);

  const handleSubmit = (submitData: AccountFormValues) => {
    startTransition(async () => {
      try {
        console.log(submitData);

        // 전송 전에 입력필드 검증
        const result = accountFormSchema.safeParse(submitData);
        if (!result.success) {
          const firstError = result.error.errors[0];
          toast({
            title: "Validation Error",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  {JSON.stringify(firstError.message, null, 2)}
                </code>
              </pre>
            ),
          });
          return;
        }

        const user: userInfo = {
          id: submitData.userid,
          email: "google@email.com",
          name: "홍길동",
          role: "admin",
          token: "1234-token",
        };
        saveUser(user);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        router.push("/dashboard");
      } catch (error) {
        console.log("onSubmit error: " + error);
      }
      console.log("startTransition");
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <Image
          className="dark:invert"
          src="/image/myimage/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          style={{ width: 180, height: 38 }}
          priority
        />
        <form className="space-y-4">
          <div>
            <Label
              htmlFor="userid"
              className="block text-sm font-medium text-gray-700"
            >
              사용자 아이디
            </Label>
            <Input
              {...formData.register("userid")}
              id="userid"
              placeholder="Enter your userid"
            />
          </div>
          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              패스워드
            </Label>
            <Input
              {...formData.register("password")}
              id="password"
              placeholder="Enter your password"
              type="password"
            />
          </div>
          <Button
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
            disabled={isPending}
            onClick={formData.handleSubmit(handleSubmit)}
          >
            {isPending ? "로그인 중..." : "로그인"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
