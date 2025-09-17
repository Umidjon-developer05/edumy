"use client";

import { useRef } from "react";
import { ChildProps } from "@/types";
import Navbar from "./_components/navbar";
import RefreshModal from "@/components/modals/refresh.modal";
import AiButton from "@/components/shared/ai-button";
import { AppSidebar } from "./_components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

function Layout({ children }: ChildProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  return (
    <SidebarProvider ref={sidebarRef}>
      <AppSidebar className="border" />
      <SidebarInset>
        <Navbar />
        <main>{children}</main>
        <RefreshModal />
        <AiButton />
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Layout;
