"use client";

import type * as React from "react";
import { IconInnerShadowTop } from "@tabler/icons-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/sidebar";
import useTranslate from "@/hooks/use-translate";
import { navLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslate();
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="rounded-md"
      variant="floating"
      {...props}
    >
      <SidebarHeader
        className=" text-white   bg-gradient-to-r from-slate-950/90 to-slate-900/80
  backdrop-blur border-b border-white/10 rounded-t-md "
      >
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="transition-all duration-300 ease-out hover:scale-105 "
            >
              <Link href="/">
                <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-gradient-to-br from-sidebar-primary to-sidebar-primary/80 text-sidebar-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl">
                  <IconInnerShadowTop className="size-5 transition-transform duration-300 hover:rotate-12" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate text-base font-bold">
                    Sahifalar
                  </span>
                  <span className="truncate text-xs opacity-70">Platform</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent
        className=" text-white   bg-gradient-to-r from-slate-950/90 to-slate-900/80
  backdrop-blur border-b border-white/10 z-50"
      >
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 ">
              {navLinks.map((link, index) => {
                const cleanPathname = pathname.replace(/^\/[a-z]{2}/, "");
                const isActive = cleanPathname === link.route;
                return (
                  <SidebarMenuItem key={link.route}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={state === "collapsed" ? t(link.name) : undefined}
                      className={`
                                                relative h-12
                                                overflow-hidden rounded-xl px-4
                                                transition-all duration-300 ease-out
                                                hover:scale-105 hover:shadow-md
                                                group-data-[collapsible=icon]:justify-center
                                                ${
                                                  isActive
                                                    ? "scale-105  bg-gradient-to-r from-sidebar-accent to-sidebar-accent/80 shadow-lg"
                                                    : "hover:bg-sidebar-accent/50"
                                                }
                                                before:absolute before:inset-0 before:translate-x-[-100%] 
                                                before:bg-gradient-to-r before:from-transparent before:via-white/10
                                                before:to-transparent before:transition-transform before:duration-700
                                                hover:before:translate-x-[100%]
                                            `}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: "slideInFromLeft 0.6s ease-out forwards",
                      }}
                    >
                      <Link
                        href={`/${link.route}`}
                        className="flex w-full items-center gap-3"
                      >
                        {link?.icon && (
                          <div
                            className={`
                                                        flex items-center justify-center
                                                        transition-all duration-300 ease-out
                                                        ${
                                                          isActive
                                                            ? "scale-110 text-sidebar-accent-foreground"
                                                            : ""
                                                        }
                                                        group-hover:rotate-6 group-hover:scale-110
                                                    `}
                          >
                            <link.icon className="size-5" />
                          </div>
                        )}
                        <span
                          className={`
                                                    text-sm font-semibold
                                                    transition-all duration-300
                                                    group-data-[collapsible=icon]:sr-only
                                                    ${
                                                      isActive
                                                        ? "text-sidebar-accent-foreground"
                                                        : ""
                                                    }
                                                `}
                        >
                          {t(link.name)}
                        </span>
                        {isActive && (
                          <div className="absolute right-2 size-2 animate-pulse rounded-full bg-sidebar-primary" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter
        className="mt-auto text-white   bg-gradient-to-r from-slate-950/90 to-slate-900/80
  backdrop-blur border-b border-white/10  rounded-b-md"
      >
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="sm"
              className="justify-center text-xs text-sidebar-foreground/50 transition-colors duration-300 hover:text-sidebar-foreground/70 group-data-[collapsible=icon]:justify-center"
            >
              <span className="group-data-[collapsible=icon]:sr-only">
                © 2024 Sahifalar
              </span>
              <span className="text-xs group-data-[collapsible=expanded]:sr-only">
                ©
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <style jsx global>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </Sidebar>
  );
}
