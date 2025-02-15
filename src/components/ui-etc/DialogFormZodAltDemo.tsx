import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Input} from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { showToastMessageUi } from "../utils/toastUtilsUi";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function DialogFormZodAltDemo({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
}: Props) {


  const accountFormSchema = z.object({
    username: z.string().min(2, {
      message: "사용자 이름을 입력하세요.",
    }),
    age: z.number().optional(),
    hobby: z.string().min(2, {
      message: "취미를 입력하세요.",
    }),
  });
  type AccountFormValues = z.infer<typeof accountFormSchema>;
  const defaultValues: Partial<AccountFormValues> = {
    username: "홍길동",
    age: 20,
    hobby: "",
  };
  const formData = useForm<AccountFormValues>({
    defaultValues,
  });

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (submitData: AccountFormValues) => {
    startTransition(async () => {
      try {
        console.log(submitData);

        // 전송 전에 입력필드 검증
        const result = accountFormSchema.safeParse(submitData);
        if (!result.success) {
          const firstError = result.error.errors[0];
          showToastMessageUi("Validation Error", firstError.message);
          return;
        }

        // 서버 전송 로직 추가
        await new Promise((resolve) => setTimeout(resolve, 2000));

        handleConfirm();
      } catch (error) {
        console.log("onSubmit error: " + error);
      }
      console.log("startTransition");
    });
  };

  const handleConfirm = () => {
    formData.reset();
    onConfirm?.();
    onOpenChange(false);
  };

  const handleCancel = () => {
    formData.reset();
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[425px] pt-2">
        <AlertDialogHeader>
        <AlertDialogTitle className="text-center text-xl font-bold">
            타이틀 제목
          </AlertDialogTitle>
          <form>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-1">
              <Label
                htmlFor="username"
                className="text-center border-2 border-black-500 bg-yellow-400 rounded-md py-2"
              >
                이름
              </Label>
              <Input
              {...formData.register("username")}
              id="username"
                placeholder="Enter your username"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-1">
              <Label
                htmlFor="age"
                className="text-center border-2 border-black-500 bg-yellow-400 rounded-md py-2"
              >
                나이
              </Label>
              <Input
              {...formData.register("age")}
              id="age"
                type="number"
                min="0"
                step="1"
                placeholder="Enter your age"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-1">
              <Label
                htmlFor="hobby"
                className="text-center border-2 border-black-500 bg-yellow-400 rounded-md py-2"
              >
                취미(지역)
              </Label>
              <Input 
              {...formData.register("hobby")}
              id="hobby" className="col-span-3" />
            </div>
          </div>
        </form>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>취소</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={formData.handleSubmit(handleSubmit)}>저장</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};