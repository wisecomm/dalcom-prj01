"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useEffect } from "react"

interface DalAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function DalAlertDialog({ 
  open,
  onOpenChange,
  title = "정말 삭제하시겠습니까?",
  description = "이 작업은 되돌릴 수 없습니다.",
  onConfirm,
  onCancel
}: DalAlertDialogProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel?.();
        onOpenChange(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [open, onCancel, onOpenChange]);

  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent style={{ 
      maxWidth: '425px',
      width: 'fit-content',
      minWidth: '300px'
    }}>
        <AlertDialogHeader>
          <AlertDialogTitle  className="text-center">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center" style={{ 
            whiteSpace: 'pre-wrap', wordBreak: 'keep-all',
            fontSize: '1rem', lineHeight: '1.5'
          }}>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
