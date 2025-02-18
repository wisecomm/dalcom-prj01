"use client"

import React, { useTransition } from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label } from '@/components/ui'
import { cn } from '@/lib/utils'
import { showToastMessage } from '@/components/utils/toastUtils'

function PageInput() {

  const accountFormSchema = z.object({
    username: z.string().min(2, {
      message: "사용자 이름을 입력하세요.",
    }),
    age: z.number().optional(),
    hobby: z.string().min(2, {
      message: "취미를 입력하세요.",
    }),
  })
  type AccountFormValues = z.infer<typeof accountFormSchema>
  const defaultValues: Partial<AccountFormValues> = {
    username: "홍길동",
    age: 20,
    hobby: '',
  }
  const formData = useForm<AccountFormValues>({
    defaultValues,
  })

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (submitData: AccountFormValues) => {
    startTransition(async () => {
      try {
        console.log(submitData)

        // 전송 전에 입력필드 검증
        const result = accountFormSchema.safeParse(submitData)
        if (!result.success) {
          console.log("입력필드 에러 : " + result.error)

          const firstError = result.error.errors[0]
          showToastMessage("Validation Error", JSON.stringify(firstError.message, null, 2))
          return
        }

        showToastMessage("You onSubmit the following values", JSON.stringify(submitData, null, 2))
      } catch (error) {
        console.log("onSubmit error: " + error)
      }
    });
  }
  
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className={cn("w-[380px]")}>
        <CardHeader>
          <CardTitle>계정을 생성합니다</CardTitle>
          <CardDescription>필수 정보를 입력헤볼게요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="mb-4">
              <Label htmlFor="username">Username</Label>
              <Input {...formData.register('username')} id="username" placeholder="Enter your username" />
            </div>
            <div className="mb-4">
              <Label htmlFor="age">Age</Label>
              <Input {...formData.register('age')} id="age" type="number" placeholder="Enter your age" />
            </div>
            <div className="mb-4">
              <Label htmlFor="hobby">취미</Label>
              <Input {...formData.register('hobby')} id="hobby" />
            </div>
            <Button disabled={isPending} onClick={formData.handleSubmit(handleSubmit)}>전송</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default PageInput