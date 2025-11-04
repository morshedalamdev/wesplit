import GroupTop from "@/components/GroupTop";
import Navbar from "@/components/Navbar";
import React from "react";

export default function Layout ({
  children,
}: {
  children: React.ReactNode;
}) {

     return (
       <>
         <section className="flex flex-col gap-3 p-2 mb-12">
           <GroupTop />
           {children}
         </section>
         <Navbar />
       </>
     );
}