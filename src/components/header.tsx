import { BookOpen } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="flex h-16 w-full max-w-full items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold tracking-tight">
            ITDEV-164
          </span>
        </div>
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
