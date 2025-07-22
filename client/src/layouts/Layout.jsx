import AppSidebar from "@/components/AppSidebar";
import Footer from "@/components/Footer";
import Topbar from "@/components/Topbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { useState } from "react";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <SidebarProvider>
      <Topbar />
      <div className="hidden md:block">
        <AppSidebar />
      </div>
      <main className="w-full  ">
        <section className="w-full min-h-[calc(100vh-40px)] pt-26">
          <Outlet />
        </section>
        <Footer />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
