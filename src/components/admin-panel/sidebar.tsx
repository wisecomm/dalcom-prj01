"use client";
import { Menu } from "@/components/admin-panel/menu";
import { SidebarToggle } from "@/components/admin-panel/sidebar-toggle";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        !getOpenState() ? "w-[90px]" : "w-72",
        settings.disabled && "hidden"
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative h-full flex flex-col overflow-y-auto shadow-md dark:shadow-zinc-800"
      >
          <div className="flex items-center justify-center border gap-2 px-4 border-gray-200 dark:border-gray-700 rounded-md" style={{ height: 'var(--navbar-height)' }}>
            <Image
              src="/image/myimage/dalcomlab-log.avif"
              alt=""
              width={42}
              height={42}
            />
            <div className="flex flex-col">
              <span className="text-xs leading-3 font-medium">Dalcomlab Ai</span>
              <span className="text-[10px] text-gray-500">Email analyze</span>
            </div>
          </div>
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            !getOpenState() ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
        </Button>
        <Menu isOpen={getOpenState()} />
      </div>
    </aside>
  );
}
