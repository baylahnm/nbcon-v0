"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarDocs, SidebarNode } from "./SidebarDocs";
import { useI18n } from "@/hooks/useI18n";

export function SidebarDocsMobile({ items }: { items: SidebarNode[] }) {
  const [open, setOpen] = useState(false);
  const { isRTL } = useI18n();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Toggle sidebar">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side={isRTL ? "right" : "left"} className="w-64 p-0" hideClose>
        <SidebarDocs items={items} variant="mobile" onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
