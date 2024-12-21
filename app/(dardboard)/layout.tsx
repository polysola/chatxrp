import UpdrageProModal from "@/components/dashboard/updrage-pro-modal";
import Sidebar from "@/components/sidebar";
import MobileSidebar from "@/components/sidebar/mobile-sidebar";
import Topbar from "@/components/topbar";
import { cn } from "@/lib/utils";
import React from "react";

const DardboardLayout = (props: { children: React.ReactNode }) => {
  const isProPlan = false;
  const userLimitCount = 0;
  return (
    <div>
      <header>
        <Topbar />
      </header>

      {/* //thêm padding bên trái với kích thước 20 đơn vị(mặc định là 80) trong chế độ màn hình lớn (viewport lớn hơn hoặc bằng lg) cho một phần tử CON có thuộc tính is-navbar-minimal. */}
      <main className="lg:bg-gray-950 lg:overflow-hidden lg:pl-80 [&:has([is-navbar-minimal])]:lg:pl-20 lg:pr-7 lg:py-7">
        {/* <Sidebar
          isProPlan={false}
          className={cn(
            'fixed left-20 z-20 w-80 hidden [&has([is-navbar-minimal]):w-fit]',
            'lg:block'
          )}
          userLimitCount={0} /> */}

        <Sidebar
          isProPlan={isProPlan}
          userLimitCount={userLimitCount}
          className={cn(
            "fixed left-0 z-20 w-80 [&:has([is-navbar-minimal])]:w-fit hidden",
            "lg:block"
          )}
        />

        <MobileSidebar isProPlan={isProPlan} userLimitCount={userLimitCount} />
        <UpdrageProModal isProPlan={isProPlan} />
        <div
          className={cn(
            "bg-background h-[calc(100vh-56px)]",
            "lg:rounded-3xl lg:p-7"
          )}
        >
          {props.children}
        </div>
      </main>
    </div>
  );
};

export default DardboardLayout;
