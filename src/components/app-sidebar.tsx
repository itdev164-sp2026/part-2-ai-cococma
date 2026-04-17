"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/header";
import { FolderOpen, Home, Settings } from "lucide-react";

function NavItems() {
  const { setOpenMobile } = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild tooltip="Overview" onClick={() => setOpenMobile(false)}>
          <Link href="/">
            <Home />
            <span>Overview</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild tooltip="Projects" onClick={() => setOpenMobile(false)}>
          <Link href="#projects">
            <FolderOpen />
            <span>Projects</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild tooltip="Settings" onClick={() => setOpenMobile(false)}>
          <Link href="#settings">
            <Settings />
            <span>Settings</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function AppSidebar({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar collapsible="icon" className="shrink-0 rounded-r-2xl border-r border-border bg-card">
          <SidebarHeader className="border-b border-border px-3 py-4">
            <div className="flex items-center justify-between gap-2">
              <div className="space-y-1">
                <p className="text-sm font-semibold">Dashboard</p>
                <p className="text-xs text-muted-foreground">
                  Manage your site and profile
                </p>
              </div>
              <SidebarTrigger />
            </div>
          </SidebarHeader>

          <SidebarContent className="space-y-2 px-2 py-3">
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <NavItems />
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-border px-3 py-4">
            <p className="text-xs text-muted-foreground">
              Tip: press <kbd className="rounded border border-border px-1.5 py-0.5 font-mono">Ctrl + B</kbd> to collapse.
            </p>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="min-w-0">
          <Header />

          <div className="border-b border-border bg-card/80 px-4 py-4 sm:px-6">
            <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2 max-w-full">
                <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
                  Dashboard
                </p>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Overview</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="rounded-2xl border border-border bg-background/80 px-3 py-2 text-sm text-muted-foreground shadow-sm">
                Current page: Overview
              </div>
            </div>
          </div>

          <main className="w-full px-4 py-8 sm:px-6">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
