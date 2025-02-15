import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function DialogFormDemo({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
}: Props) {
  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] [&>button]:hidden pt-2">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            다이알로그 폼 대모
          </DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
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
              <Input id="hobby" className="col-span-3" />
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            취소
          </Button>
          <Button onClick={handleConfirm}>확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
