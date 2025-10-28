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
           <main className="p-1 basis-0 grow">{children}</main>
         </div>
       </>
     );
}