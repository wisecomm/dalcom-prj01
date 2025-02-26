import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Menu } from "@/components/admin-panel/menu";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import Image from "next/image";

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetTitle className="sr-only">Popup Menu</SheetTitle>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <SheetDescription className="sr-only">
            사이즈가 적을때 나타나는 팝업 메뉴
          </SheetDescription>
          <div
            className="flex items-center justify-center gap-2 "
            style={{ height: "var(--navbar-height)" }}
          >
            <Image
              src="/image/myimage/dalcomlab-log.avif"
              alt=""
              width={42}
              height={42}
              style={{ width: "42px", height: "42px" }}
            />
            <div className="flex flex-col">
              <span className="text-xs leading-3 font-medium">
                Dalcomlab Ai
              </span>
              <span className="text-[10px] text-gray-500">Email analyze</span>
            </div>
          </div>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
