import AppSidebar from "@/components/AppSidebar";
import Footer from "@/components/Footer";
import Topbar from "@/components/Topbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    // Topbar

    <SidebarProvider>
      <Topbar />
      <AppSidebar />
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
