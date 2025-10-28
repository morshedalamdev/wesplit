import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from "react";

export default function Layout ({
  children,
}: {
  children: React.ReactNode;
}) {
     return (
       <>
         <Header />
         <div className="flex flex-wrap h-[calc(100vh-49px)]">
           <Sidebar />
           <main className="relative p-2 basis-0 grow overflow-y-scroll">{children}</main>
         </div>
       </>
     );
}