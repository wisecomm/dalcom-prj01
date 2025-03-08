import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminUser } from "@/types/admin";
import { useState, useEffect } from "react";
import { Save, ArrowLeft } from "lucide-react";

interface AdminDialogProps {
  isOpen: boolean;
  onClose: () => void;
  admin: AdminUser | null;
  onComplete: (admin: AdminUser, isNew: boolean) => void;
}

const AdminDialog = ({
  isOpen,
  onClose,
  admin,
  onComplete,
}: AdminDialogProps) => {
  const [formData, setFormData] = useState<Omit<AdminUser, "id" | "createdAt">>(
    {
      name: "",
      email: "",
      role: "시스템 관리자",
    }
  );

  const isNewAdmin = !admin;

  useEffect(() => {
    if (admin) {
      setFormData({
        name: admin.name,
        email: admin.email,
        role: admin.role,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        role: "시스템 관리자",
      });
    }
  }, [admin, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email) {
      return;
    }

    // Submit form data
    if (admin) {
      // Update existing admin
      onComplete(
        {
          ...formData,
          id: admin.id,
          createdAt: admin.createdAt,
        },
        false
      );
    } else {
      // Create new admin - ID and createdAt will be added in the parent component
      onComplete(formData as AdminUser, true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isNewAdmin ? "새 관리자 등록" : "관리자 수정"}
            </DialogTitle>
            <DialogDescription>
              {isNewAdmin
                ? "새로운 관리자 정보를 입력하세요."
                : "관리자 정보를 수정하세요."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                이름
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="홍길동"
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                이메일
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@example.com"
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                역할
              </Label>
              <Select value={formData.role} onValueChange={handleRoleChange}>
                <SelectTrigger id="role" className="col-span-3">
                  <SelectValue placeholder="역할 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="슈퍼 관리자">슈퍼 관리자</SelectItem>
                  <SelectItem value="시스템 관리자">시스템 관리자</SelectItem>
                  <SelectItem value="콘텐츠 관리자">콘텐츠 관리자</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                취소
              </Button>
            </DialogClose>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {isNewAdmin ? "등록 완료" : "수정 완료"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminDialog;
