import React from 'react';
import { useTransition } from "react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { showToastMessageUi } from "../utils/toastUtilsUi";
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const FormZodDemo: React.FC<Props> = ({ open, onOpenChange, onConfirm, onCancel }) => {

  if (!open) return null;

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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 pt-2 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-center">타이틀 이름</h2>
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
                placeholder="이름을 입력하세요"
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
                placeholder="나이를 입력하세요"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-1">
              <Label
                htmlFor="hobby"
                className="text-center border-2 border-black-500 bg-yellow-400 rounded-md py-2"
              >
                취미
              </Label>
              <Input
                {...formData.register("hobby")}
                id="hobby"
                placeholder="취미를 입력하세요"
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" size="sm" onClick={handleCancel}  className={cn(buttonVariants({ variant: 'outline' }))}>
              취소
            </Button>
            <Button disabled={isPending} variant="outline" size="sm" onClick={formData.handleSubmit(handleSubmit)} className={cn(buttonVariants({ variant: 'outline' }), 'bg-black text-white hover:bg-gray-800')}>
              저장
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};